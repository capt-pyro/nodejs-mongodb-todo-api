//const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

 MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
     if(err) {
       return console.log(`Unable to connect to MongoDB server`);
     }
    console.log(`Connected to MongoDB server`);

    // db.collection('Todos').find({
    //   _id: new ObjectID('593c311fc30c0c1600c0f3ec')
    // }).toArray().then((docs,err) =>{
    //   if(err) {
    //     return console.log('Unable to fetch todo',err);
    //   }
    //   console.log('Todos');
    //   console.log(JSON.stringify(docs,undefined,2));
    // });

    db.collection('Users').find({Name: 'Joe'}).toArray().then((docs,err) =>{
      if(err) {
        return console.log('Unable to fetch User',err);
      }
      console.log(JSON.stringify(docs,undefined,1));
    });


      db.close();
});
