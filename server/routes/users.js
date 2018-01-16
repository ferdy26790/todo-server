const express = require('express');
const router = express.Router();
const userController = require('../controller/userController')
const todoController = require('../controller/todoController')
const boardController = require('../controller/boardController')
/* GET users listing. */
router.get('/', userController.getUser)
router.put('/changeName', userController.changeName)
router.post('/addTodo', todoController.addTodo)
router.get('/getTodo', todoController.getTodo)
router.delete('/deleteTodo/:id', todoController.deleteTodo)
router.put('/completeTodo/:id', todoController.completeTodo)
router.put('/uncompleteTodo/:id', todoController.uncompleteTodo)
router.put('/editTodoName/:id', todoController.changeTodoName)
router.get('/boards', boardController.getBoard)
router.post('/addBoard', boardController.addBoard)
router.put('/completeBoard/:id', boardController.completeBoard)
router.put('/takeBoard/:id', boardController.takeBoard)
router.get('/myboard', boardController.getMyBoard)
module.exports = router;
