const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

 var password = '123abc';
//
// bcrypt.genSalt(10, (err,salt) => {
//   bcrypt.hash(password,salt,(err, hash) => {
//     console.log(hash);
//   })
// });

var hashedpassword = '$2a$10$1U2Pz8OC2ix.t00Odjw0tuNWkMrq3N.GUo0dG3Wu.bhQpZ.8.WDR2';
bcrypt.compare(password,hashedpassword, (err,res) => {
  console.log(res);
});
// var message = "I'll be encrytped";
// var hash = SHA256(message).toString();
// console.log(hash);

//jwt.sign hashes data
//jwt.verify verfies it
// var data = {
//   id: 5
// };
// var token = jwt.sign(data,'123abc');
// console.log(token);
// var decoded = jwt.verify(token,'123abc');
// console.log('----------------------------------');
// console.log(decoded);
