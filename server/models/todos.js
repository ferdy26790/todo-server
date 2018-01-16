const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/todofancy', { useMongoClient: true });
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;


const todoSchema = new Schema({
  name: String,
  timeAdd: {
    type: Date
  },
  isComplete: Boolean,
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  }
})

todoSchema.pre('save', function(next) {
  this.timeAdd = Date.now()
  next();
})

let Todo = mongoose.model('todo', todoSchema)

module.exports = Todo
