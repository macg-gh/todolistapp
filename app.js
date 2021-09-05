//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");

const mongoose = require ("mongoose");
const _ = require ("lodash");
const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect('mongodb+srv://admin-mg:PAJHdirDd777Ovz6jl8FVP5CSqKMSfKw4gIo5mvR@cluster0.xoob9.mongodb.net/toDoListDB', {useNewUrlParser: true, useUnifiedTopology: true});

// the useUnifiedTopology option in the client constructor will make this
// warning go away \/

// (node:2911) [MONGODB DRIVER] Warning: Current Server Discovery and Monitoring
// engine is deprecated, ...

// the useNewUrlParser option is used based on course instructor's recommendation.


const itemSchema = new mongoose.Schema({
  name: String,
});

const listSchema = new mongoose.Schema({
  name: String,
  items: [itemSchema]
});

const Item = mongoose.model("Item",itemSchema);

const List = mongoose.model( "List" , listSchema );

const welcome = new Item({
  name: "Welcome to your to do list.",
});

const plus = new Item({
  name: "Hit the + button to add a new item.",
});

const deleteMsg = new Item({
  name: "Hit the checkbox to delete an item.",
});


app.get( '/lists/:listTitle' ,  function(req,res){
  console.log(req.params.listTitle);
  const listTitle = _.capitalize(req.params.listTitle);
  console.log("list Title is: "+ listTitle)
  let thing = _.capitalize("sAdCfC");
  console.log(thing);

  List.findOne( {name: listTitle}, function(err, foundList)
  {
    if (!err)
    {
      if (!foundList)
      {
        console.log("No list found");

        const list = new List
        ({
          name: listTitle,
          items: [welcome , plus, deleteMsg]
        });

        console.log(list);

        list.save();
        res.redirect("/lists/"+listTitle);
      }
      else
      {
        res.render("list", {listTitle: listTitle, newListItems: foundList.items });
      }
    }
    else
    {
      console.log(err);
    }
  });
});

app.post("/lists/:listTitle", function(req, res){

  const listTitle=req.params.listTitle;

  const newItem = new Item({
    name: req.body.newItem,
  });

  List.findOneAndUpdate( {name: listTitle} , { $push  : { items : newItem  }  } , function(err , foundList){
    if(!err)
    {
      res.redirect("/lists/"+listTitle);
    }
    else
    {
      console.log(err);
    }
  });


});

app.post("/delete/:listTitle", function(req, res){
  const listTitle=req.params.listTitle;
  const checkedItemID = req.body.deleteCheckbox;

  List.findOneAndUpdate( {name: listTitle} , { $pull  : { items : { _id : checkedItemID } }  } , function(err , foundList){
    if(!err)
    {
      res.redirect("/lists/"+listTitle);
    }
    else
    {
      console.log(err);
    }
  });


});



app.get("/about", function(req, res){
  res.render("about");
});


let port = process.env.PORT;
if(port == null || port == ""){
  port=3000;
}
app.listen(port, function() {
  console.log("Server started on port " + port);
});
