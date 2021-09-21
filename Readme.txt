This branch is for a test deployment with npm, heroku and mongoDB. The objective is to make the deployment repeatable.
The instructions for heroku and mongoDB are provided by their own websites and are subject to change. Refer to 
the documentation available from their websites.

How to deploy.

1 - Setup Mongodb atlas:
Setup so you have a database ready and a user with SCRAM (password) credentials. Their access level needed is 'read and write to any db.'

https://www.mongodb.com/cloud/atlas

2 - Heroku account
Set up heroku with git according to the instructions below. In the instructions below they have a sample repo you can clone to your local git repo.
Skip that part because this app is what will be pushed to heroku. 

https://devcenter.heroku.com/articles/getting-started-with-nodejs

3 - Github local side
Clone the github repo and switch to branch 'heroku_deployment'. Edit the mongodb connection line in app.js to use the creds for the user made in mongodb atlas.
Get the server name from mongodb web management interface, Deployment -> Databases -> Connect -> application. Commit the changes to this local 
heroku_deploy_remote branch with 'git commit' command.

Pull the changes from the local heroku_deploy_remote branch into the local main branch.   
git checkout main
git pull heroku_deploy_remote

Commit the list of files pulled into the local main branch with git commit command:
git commit (list of files pulled into local main branch)

Push the local main branch to the heroku remote:
git push heroku main

This shoudl be all that is necessary for the app to build and then you can test it with the app's URL provided by heroku.


