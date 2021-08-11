//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");

const mongoose = require ("mongoose");
const _ = require ("lodash");
const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect('mongodb+srv://username:password@mongodbserver/toDoListDB', {useNewUrlParser: true, useUnifiedTopology: true});

// the useUnifiedTopology option in the client constructor will make this
// warning go away \/

// (node:2911) [MONGODB DRIVER] Warning: Current Server Discovery and Monitoring
// engine is deprecated, and will be removed in a future version. To use the new
// Server Discover and Monitoring engine, pass option
// { useUnifiedTopology: true } to the MongoClient constructor.

// The course instructor advises to use useNewUrlParser



const itemSchema = new mongoose.Schema({
  name: String,
  list: String
});

const Item = mongoose.model("Item",itemSchema);

app.get( '/lists/:listTitle' ,  function(req,res){
  const listTitle = _.capitalize(req.params.listTitle);
  const welcome = new Item({

    name: "Welcome to your to do list.",
    list: listTitle
  });

  const plus = new Item({
    name: "Hit the + button to add a new item.",
    list: listTitle
  });

  const deleteMsg = new Item({
    name: "Hit the checkbox to delete an item.",
    list: listTitle
  });

  Item.find( {list: listTitle}, function(err, foundItems)
  {
    if (foundItems.length===0)
    {
      Item.insertMany( [welcome , plus , deleteMsg ] , function(err)
      {
        if (err)
        {
          console.log("Error received: "+err);
        }
        else
        {
          console.log("Succesfully added items");
        }
        res.redirect("/lists/"+listTitle);
      });
    }
    else //need this because we can't redirect and render on the same level.
    {
      Item.find( {list: listTitle}, function(err, listItems){

        res.render("list", {listTitle: listTitle, newListItems: listItems });
      });
    }
  });
});

app.post("/lists/:listTitle", function(req, res){

  const listTitle=req.params.listTitle

  const newItem = new Item({
    name: req.body.newItem,
    list: listTitle
  });

  newItem.save();

  res.redirect("/lists/"+listTitle);

});

app.post("/delete/:listTitle", function(req, res){
  const listTitle=req.params.listTitle;
  const checkedItemID = req.body.deleteCheckbox;

  Item.deleteOne({_id: checkedItemID} , function(err){
    if(err){
      console.log(err);
    }
    else{
      console.log("Successfully deleted item.");
    }
  });

  res.redirect("/lists/"+listTitle);

});



app.get("/about", function(req, res){
  res.render("about");
});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
