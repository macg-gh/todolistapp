# todolistapp
web app for a to do list

This was developed using node v10.19.0. Deploy with npm install.

In order to deploy you need local mongoDB or a mongo atlas account, and use your creds to connect in app.js line 15.

This version uses a simple table arrangement where there is one table of items, and every document has a list value representing what list it is for.

Use the app by browsing to /lists/<listDesired> where <listDesired> is the list you want to use, such as work, home, school, etc.

Hopefully the layout at that point is self explanatory. Switch to new lists at any point. Type a previous <listDesired> to return to any list previously used.

