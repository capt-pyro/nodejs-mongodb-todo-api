const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/TodoApp' /*|| "mongodb://JoeAdmin:XsK7wXVYZaIwrJzt@joecluster-1-shard-00-00-1auep.mongodb.net:27017,joecluster-1-shard-00-01-1auep.mongodb.net:27017,joecluster-1-shard-00-02-1auep.mongodb.net:27017/admin?ssl=true&replicaSet=JoeCluster-1-shard-0&authSource=admin", (err,suc) => {
  if(err) throw err;
  else{
    console.log('succesfull');
  }
}*/);


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
