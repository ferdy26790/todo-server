const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/todofancy', { useMongoClient: true });
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;


const userSchema = new Schema({
  name: String,
  email: String,
  password: String,
  point: Number
})

let User = mongoose.model('user', userSchema)

module.exports = User
