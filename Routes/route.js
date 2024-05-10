const express = require('express');
const { getAllTodos, addNewTodo } = require('../Controllers/todosController');

const router = express.Router();

router.get('/' ,(req,res) => {
    res.send('Hello world')
})

router.get('/todos',getAllTodos)

router.post('/todos',addNewTodo)

module.exports = router