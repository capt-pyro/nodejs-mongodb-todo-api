const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI);


//When you want to run the database off heroku!!!!!!!!
// heroku create
// heroku addons:create mongolab:sandbox
//heroku config (optional, to see diff configs)
//git status
//git commit -am "set app for heroku"
//git push heroku master
// use url with /todos in postman to post a todos
// then GET the todo using get call in postman
// Everything else is set up

module.exports = {mongoose};
