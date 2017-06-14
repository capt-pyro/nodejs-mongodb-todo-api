const{mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {ObjectID} = require('mongodb');


var id = '59406d8d82d42146a0b8472e11';

Todo.find({
  _id: id
}).then((todos) => {
  console.log('Todos', todos);
});

Todo.findOne({
  _id: id
}).then((todo) => {
  console.log('Todo', todo);
});

if(!ObjectID.isValid(id)) return console.log(`ID not valid`);
Todo.findById(id).then((todo) => {
  if(!todo) return console.log('Id not found');
  console.log('Todo by id', todo);
}).catch((e) => console.log(e));
