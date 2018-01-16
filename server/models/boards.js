const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/todofancy', { useMongoClient: true });
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;


const boardSchema = new Schema({
  name: String,
  point: Number,
  isComplete: Boolean,
  userPost: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  },
  userGet: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  }
})


let Board = mongoose.model('board', boardSchema)

module.exports = Board
