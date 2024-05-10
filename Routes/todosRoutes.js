const express = require('express');
const { getAllTodos, addNewTodo, editTodo, deleteTodo, toggleStatus,deleteDoneTodos } = require('../Controllers/todosController');
const router = express.Router();

const { authToken } =require('../Util/Toke') 


router.route('/').get(authToken,getAllTodos).post(authToken,addNewTodo).delete(deleteDoneTodos)

router.route('/:id').put(editTodo).post(toggleStatus).delete(deleteTodo)


module.exports = router