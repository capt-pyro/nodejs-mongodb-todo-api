# nodejs-mongodb-todo-api

My first RESTful api. It is simply a Node server using Expressjs to host routes that perform different tasks to aid a cloud based todo list application. It uses MongoDB as it's database for storing todo records securely storing user data. Routes include registering, logging in, authenticating and logging out users. Check out the route descriptions below. Used mocha and supertest for testing.

# How to run

* Clone project to local directory
* Fill in JSON file, replacing all variables
* Run test
* Run server locally or hosted on heroku or similar platforms

# Routes Available

* Adding users
  * Type: http POST
  * Format: http://servername(:PORT)/users
* Logging In Users
  * Type: http POST
  * Format: http://servername(:PORT)/users/login
* Logging Out Users
  * Type: http DELETE
  * Format: http://servername(:PORT)/users/me/token   
* Getting User From Auth Token
  * Type: http GET
  * Format: http://servername(:PORT)/users/me
* Posting User Todo
  * Type: http POST
  * Format: http://servername(:PORT)/todos
* Retrieve All User Todos
  * Type: http GET
  * Format: http://servername(:PORT)/todos
* Retrieve User Todo By Id
  * Type: http GET
  * Format: http://servername(:PORT)/todos/:id
* Remove User Todo By Id
  * Type: http DELETE
  * Format: http://servername(:PORT)/todos/:id
* Patch User Todo By Id
  * Type: http PATCH
  * Format: http://servername(:PORT)/todos/:id
  
  
