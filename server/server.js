//npm modules
const express = require('express');
const bodyParser = require('body-parser');
const _ = require('lodash');

var{mongoose} = require('./db/mongoose');
var{Todo} = require('./models/todo');
var{User} = require('./models/user');
var {ObjectID} = require('mongodb');
var app = express(); //start express
const port = process.env.PORT || 3000;
//Declare express Middleware
app.use(bodyParser.json());

//POST a todo to the database
app.post('/todos', (req,res) =>{
  var todo = new Todo({
    text: req.body.text
  });
  todo.save().then((doc) => {
    res.send(doc);
  }, (err) => {
    res.status(400).send(err);
  });
});
//GET all todos
app.get('/todos', (req,res) => {
  Todo.find().then((todos) => {
    res.send({todos})
},(err) =>{
    res.status(400).send(err);
  });
});

//GET/todos/123456 (specific)
app.get('/todos/:id', (req,res) => {
    var id = req.params.id;
    if(!ObjectID.isValid(id)) return res.status(404).send();
    Todo.findById(id).then((todo) => {
      if(!todo) return res.status(404).send();
      res.send({todo});
    }).catch((err) => {
      res.status(400).send();
    });
});

//DELETE/todos/12345
app.delete('/todos/:id', (req,res) => {
  var id = req.params.id;
  if(!ObjectID.isValid(id)) return res.status(404).send();
  Todo.findByIdAndRemove(id).then((todo) => {
    if(!todo) return res.status(404).send();
    res.send({todo});
  }).catch((err) => {
    res.status(400).send();
  });
});

//PATCH (Update)
app.patch('/todos/:id', (req,res) => {
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
  Todo.findByIdAndUpdate(id,{$set: body}, {new: true}).then((todo) => {
    if(!todo) return res.status(404).send();
    res.send({todo});
  }).catch((err) => {
    res.status(400).send();
  })
});


//connect to port 3000
app.listen(port, () =>{
  console.log(`Started on port ${port}`);
});


module.exports = {app};
