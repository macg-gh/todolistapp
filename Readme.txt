This branch is for a test deployment with npm, heroku and mongoDB. The objective is to make the deployment repeatable.
The instructions for heroku and mongoDB are provided by their own websites and are subject to change. Refer to 
the documentation available from their respective websites.

The following has to be set up to deploy this with heroku.

Mongodb atlas has to be setup so you have a database ready with a user with admin priveleges and use SCRAM (password) credentials. Their access level needed is 'read and write to any db.'

https://www.mongodb.com/cloud/atlas


Github local side - Clone the github repo and switch to branch 'heroku_deployment'. Edit the mongodb connection line in app.js to use the creds for the user made in mongodb atlas. Get the server url from mongodb web management interface, Deployment -> Databases -> Connect -> application

Step 3 - Setup a heroku account, then check in the change made to app.js code using the github plugin to heroku as the remote, main branch on the remote. 
e.g. git push remotename remote_branch_name
     git push heroku heroku_remote_deploy

This shoudl be all that is necessary for the app to build and then you can test it with the app URL provided by heroku.
See deployment instructions on how to use heroku and git to deploy:
https://devcenter.heroku.com/articles/getting-started-with-nodejs
