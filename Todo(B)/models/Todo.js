const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
    text: String
});

const Todo = mongoose.model("todo", todoSchema);

module.exports = Todo;