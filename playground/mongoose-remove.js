const{mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {ObjectID} = require('mongodb');
const {User} = require('./../server/models/user')

// Todo.remove({}).then((res) => {
//   console.log(JSON.stringify(res,undefined,2));
// });
//testing mongoose remove functionality

//findOneAndRemove
Todo.findOneAndRemove({_id: '5947c4051a47756171c775d0'}).then((res) => {
  console.log(JSON.stringify(res,undefined,2));
});

//findByIdAndRemove
Todo.findByIdAndRemove(( '5947c4051a47756171c775d0')).then((res) =>{
  console.log(res);
});
