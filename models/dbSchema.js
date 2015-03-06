var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var userSchema = new Schema({
  name: { type: String, required: true, unique: true },
  pass: { type: String, required: true }
}, { collection: 'romano' });

module.exports = mongoose.model('User', userSchema);
//with module.exports It can be in a different file (just require the file where It needed)