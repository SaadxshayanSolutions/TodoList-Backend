const Todos = require("../model/todosSchema");
const { response } = require("../response");
const { generateResponse } = require("../Util/Toke");

const addNewTodo = async (req, res) => {
  try {
    const user = req.user;

    const newTodo = await Todos.create({ ...req.body, userId: user.id });

    await newTodo.save();

    return res
      .status(200)
      .json(generateResponse(true, response.todoAdded, newTodo));
  } catch (err) {
    return res.status(500).json(generateResponse(false, err.message));
  }
};

const getAllTodos = async (req, res) => {
  try {
    const id = req.user.id;

    const allTodos = await Todos.find({ userId: id }).sort();

    return res.status(200).json(generateResponse(true, "", allTodos));
  } catch (err) {
    return res.status(500).json(generateResponse(false, err.message));
  }
};

const editTodo = async (req, res) => {
  try {
    const todo = req.body;

    const data = await Todos.findOneAndUpdate(
      { _id: req.params.id },
      { $set: todo },
      { new: true }
    );

    return res
      .status(200)
      .json(generateResponse(true, response.todoEdited, data));
  } catch (err) {
    return res.status(500).json(generateResponse(false, err.message));
  }
};

const deleteTodo = async (req, res) => {
  try {
    const data = await Todos.findOneAndDelete({ _id: req.params.id });

    return res
      .status(200)
      .json(generateResponse(true, response.todoDeleted, data));
  } catch (err) {
    res.status(500).json(generateResponse(false, err.message));
  }
};

const toggleStatus = async (req, res) => {
  try {
    const todo = req.body;

    const data = await Todos.findOneAndUpdate(
      { _id: req.params.id },
      { status: !todo.status },
      { new: true }
    );

    return res.status(200).json(generateResponse(true, response.todoEdited));
  } catch (err) {
    return res.status(500).json(generateResponse(false, err.message));
  }
};

const deleteDoneTodos = async (req, res) => {
  try {
    data = await Todos.deleteMany({ status: true });

    res.status(200).json(data);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

module.exports = {
  getAllTodos,
  addNewTodo,
  editTodo,
  deleteTodo,
  toggleStatus,
  deleteDoneTodos,
};
