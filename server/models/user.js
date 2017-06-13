var mongoose = require('mongoose');
var User = mongoose.model('UserData', {
  email: {
  type: String,
  required: true,
  trim: true,
  minlength: 1
}
});


module.exports = {User};
