const{ObjectID} = require('mongodb');
const{Todo} = require('./../../models/todo');
const{User} = require('./../../models/user');
const jwt = require('jsonwebtoken');

var userOneId = new ObjectID();
var userTwoId = new ObjectID();
const users = [{
  _id: userOneId,
  email: 'dummy@dummy.com',
  password: '123abc',
  tokens: [{
      access: 'auth',
      token: jwt.sign({_id: userOneId, access: 'auth'}, 'abc123').toString()
  }]
}, {
  _id: userTwoId,
  email: 'dummy2@dummy.com',
  password: '123abc',
  tokens: [{
      access: 'auth',
      token: jwt.sign({_id: userTwoId, access: 'auth'}, 'abc123').toString()
  }]
}];

const todos = [{
  _id: new ObjectID(),
  text: 'First test to do',
  _creator: userOneId
}, {
  _id: new ObjectID(),
  text: 'Second test to do',
  completed: 'true',
  completedAt: 123456,
  _creator: userTwoId
}];

const populateTodos = (done) => {
  Todo.remove({}).then(() =>{
    return Todo.insertMany(todos);//only two known todos are there in database
  }).then(() => done());
};

const populateUsers = (done) => {
  User.remove({}).then(() => {
      var userOne = new User(users[0]).save();
      var userTwo = new User(users[1]).save();
      return Promise.all([userOne,userTwo])
}).then(() => done());
};


module.exports = {todos, populateTodos,users,populateUsers};
