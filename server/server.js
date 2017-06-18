//npm modules
const express = require('express');
const bodyParser = require('body-parser')

var{mongoose} = require('./db/mongoose');
var{Todo} = require('./models/todo');
var{User} = require('./models/user');
var {ObjectID} = require('mongodb');
var app = express(); //start express

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
//connect to port 3000
app.listen(3000, () =>{
  console.log(`Started on port 3000`);
});


module.exports = {app};
