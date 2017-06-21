const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');
// var message = "I'll be encrytped";
// var hash = SHA256(message).toString();
// console.log(hash);

//jwt.sign hashes data
//jwt.verify verfies it
var data = {
  id: 5
};
var token = jwt.sign(data,'123abc');
console.log(token);
var decoded = jwt.verify(token,'123abc');
console.log('----------------------------------');
console.log(decoded);
