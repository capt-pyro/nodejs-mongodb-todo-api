var env = process.env.NODE_ENV || 'development';

if(env === 'development'){//local development using postman
  process.env.PORT = 3000;
  process.env.MONGODB_URI = 'mongodb://localhost:27017/TodoApp';
}
else if (env === 'test') {//used for testing on server.test.js
  process.env.PORT = 3000;
  process.env.MONGODB_URI = 'mongodb://localhost:27017/TodoAppTest';
}
else if (env === 'atlas') {//production using mongodb atlas service
  process.env.PORT = 3000;
  //  process.env.MONGODB_URI = 'mongodb://localhost:27017/TodoAppTest';
  process.env.MONGODB_URI = "mongodb://JoeAdmin:aaGPQY5yJQtBAZdc@joecluster-1-shard-00-00-1auep.mongodb.net:27017,joecluster-1-shard-00-01-1auep.mongodb.net:27017,joecluster-1-shard-00-02-1auep.mongodb.net:27017/testdatabase?ssl=true&replicaSet=JoeCluster-1-shard-0&authSource=admin";
}
