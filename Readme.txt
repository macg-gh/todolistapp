This branch is for a test deployment with npm, heroku and mongoDB. The objective is to make the deployment repeatable.
The instructions for heroku and mongoDB are provided by their own websites and are subject to change. Refer to 
the documentation available from their respective websites.

Step 1 - Clone the github repo and switch to branch 'heroku_deployment'

Step 2 - Edit the mongodb connection string to use mongo db atlas. This requires account and setup:
https://www.mongodb.com/cloud/atlas

Step 3 - Setup a heroku account, then check in the code using the github plugin to heroku as the remote. 
See deployment instructions on how to use heroku and git to deploy:
https://devcenter.heroku.com/articles/getting-started-with-nodejs
