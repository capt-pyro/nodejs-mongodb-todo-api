require('./config/config');
//npm modules
const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const _ = require('lodash');

var{authenticate} = require('./middleware/authenticate');
var{mongoose} = require('./db/mongoose');
var{Todo} = require('./models/todo');
var{User} = require('./models/user');
var {ObjectID} = require('mongodb');


var app = express(); //start express
const port = process.env.PORT;
//Declare express Middleware
app.use(bodyParser.json());

//POST a todo to the database
app.post('/todos', authenticate, (req,res) =>{
  var todo = new Todo({
    text: req.body.text,
    _creator: req.user._id
  });
  todo.save().then((doc) => {
    res.send(doc);
  }, (err) => {
    res.status(400).send(err);
  });
});

//GET all todos
app.get('/todos', authenticate, (req,res) => {
  Todo.find({_creator: req.user._id}).then((todos) => {
    res.send({todos})
},(err) =>{
    res.status(400).send(err);
  });
});

//GET/todos/123456 (specific)
app.get('/todos/:id', authenticate, (req,res) => {
    var id = req.params.id;
    if(!ObjectID.isValid(id)) return res.status(404).send();
    Todo.findOne({
      _id: id,
      _creator: req.user._id
    }).then((todo) => {
      if(!todo) return res.status(404).send();
      res.send({todo});
    }).catch((err) => {
      res.status(400).send();
    });
});

//DELETE/todos/12345
app.delete('/todos/:id', authenticate, (req,res) => {
  var id = req.params.id;
  if(!ObjectID.isValid(id)) return res.status(404).send();
  Todo.findOneAndRemove({
    _id: id,
    _creator: req.user._id
  }).then((todo) => {
    if(!todo) return res.status(404).send();
    res.send({todo});
  }).catch((err) => {
    res.status(400).send();
  });
});

//PATCH (Update)
app.patch('/todos/:id', authenticate, (req,res) => {
   var id = req.params.id;
   var body = _.pick(req.body, ['text', 'completed']);//used lodash to ensure user can only change text completed
   if(!ObjectID.isValid(id)) return res.status(404).send();
   if(_.isBoolean(body.completed) && body.completed) { //checks if task is done to update completedAt
     body.completedAt = new Date().getTime();
   }
   else {
     body.completed = false;
     body.completedAt = null;
   }
  Todo.findOneAndUpdate({_id: id, _creator: req.user._id},{$set: body}, {new: true}).then((todo) => {
    if(!todo) return res.status(404).send();
    res.send({todo});
  }).catch((err) => {
    res.status(400).send();
  })
});

//POST/Users
app.post('/users', (req,res) => {
  var user = new User(_.pick(req.body, ['email', 'password']));
  user.save().then(() => {
    return user.generateAuthToken();
  }).then((token) => {
    res.header('x-auth', token).send(user);
  }).catch((err) => res.status(400).send(err));
});


app.get('/users/me', authenticate, (req,res) => {
  res.send(req.user);
});

app.post('/users/login', (req,res) => {
  var body = new User(_.pick(req.body, ['email', 'password']));
//specially defined search function
  User.findByCredentials(body.email,body.password).then((user) => {
    user.generateAuthToken().then((token) => {
      res.header('x-auth',token).send(user);
    });
  }).catch((err) => res.status(400).send());
});

//DELETE route to LOGOUT users
app.delete('/users/me/token', authenticate, (req,res) => {
  req.user.removeToken(req.token).then(() => {
    res.status(200).send();
  }, () => {
    res.status(400).send();
  })
});

//connect to port 3000
app.listen(port, () =>{
  console.log(`Started on port ${port}`);
});




module.exports = {app};
