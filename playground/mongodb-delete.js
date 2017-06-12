//const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

 MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
     if(err) {
       return console.log(`Unable to connect to MongoDB server`);
     }
    console.log(`Connected to MongoDB server`);

//enable one at a time

//deleteMultiple
// db.collection('Todos').deleteMany({text: 'Eat Lunch'}).then((result,err) => {
//   if(err) {
//     return console.log(`Unable to delete requested files`,err);
//   }
//   console.log(result);
// });
//deleteOne
// db.collection('Todos').deleteOne({text: 'Eat Lunch'}).then((result,err) => {
//   if(err){
//     return console.log(`Unable to delete`);
//   }
//   console.log(result);
// });
//findOneAndDelete (Basically Pop)
// db.collection('Todos').findOneAndDelete({completed: false}).then((result,err) => {
//   console.log(JSON.stringify(result,undefined,2));
// });



//

      db.close();
});
