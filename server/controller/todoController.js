const todoModel = require('../models/todos')
const jwt = require('jsonwebtoken')
let getDecode = function (token) {
  let decoded = jwt.verify(token, 'secure');
  return decoded
}
class Todo{
  static addTodo (req, res) {
    let decoded = getDecode(req.headers.token)
    let newTodo = new todoModel({
      name: req.body.name,
      isComplete: false,
      user: decoded.id
    })
    newTodo.save()
    .then((response) => {
      res.status(200).json({
        msg: 'todo berhasil ditambahkan',
        data: response
      })
    }).catch((err) => {
      console.log(err);
    })
  }

  static getTodo (req, res) {
    let decoded = getDecode(req.headers.token)
    todoModel.find({
      user: decoded.id
    }).populate('user', 'name')
    .then((todos) => {
      res.status(200).json({
        data:todos
      })
    }).catch((err) => {
      console.log(err);
    })
  }

  static deleteTodo (req, res) {
    todoModel.findByIdAndRemove(req.params.id)
    .then((todo) => {
      res.status(200).json({
        msg: 'todo berhasil dihapus',
        dataDeleted: todo
      })
    }).catch((err) => {
      console.log(err);
    })
  }

  static completeTodo (req, res) {
    console.log(req.params.id);
    todoModel.findById(req.params.id)
    .then((todo) => {
      console.log(todo);
      todo.isComplete = true
      todo.save()
      .then((response) => {
        res.status(200).json({
          msg: 'todo completed',
          data: response
        })
      }).catch((err) => {
        console.log(err);
      })
    }).catch((err) => {
      console.log(err);
    })
  }

  static uncompleteTodo (req, res) {
    todoModel.findById(req.params.id)
    .then((todo) => {
      todo.isComplete = false
      todo.save()
      .then((response) => {
        res.status(200).json({
          msg: 'todo uncomplete',
          data: response
        })
      }).catch((err) => {
        console.log(err);
      })
    }).catch((err) => {
      console.log(err);
    })
  }

  static changeTodoName (req, res) {
    todoModel.findById(req.params.id)
    .then((todo) => {
      todo.name = req.body.name
      todo.save()
      .then((response) => {
        res.status(200).json({
          msg: 'todo name changed',
          data: response
        })
      }).catch((err) => {
        console.log(err);
      })
    }).catch((err) => {
      console.log(err);
    })
  }
}

module.exports = Todo
