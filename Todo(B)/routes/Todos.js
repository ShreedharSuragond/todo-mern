const express = require('express');
const Todo = require('../models/Todo');

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const todos = await Todo.find();
        res.json(todos);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch todos" });
    }
});

router.post('/', async (req, res) => {
    try {
        await Todo.create({ text: req.body.text });
        const todos = await Todo.find(); // Fetch the updated list
        res.json(todos); // Send back the updated list
    } catch (error) {
        res.status(500).json({ error: "Failed to add todo" });
    }
});

router.put('/:id', async (req, res) => {
    try {
        await Todo.findByIdAndUpdate(req.params.id, { text: req.body.text });
        const todos = await Todo.find();
        res.json(todos);
    } catch (error) {
        console.error("Error updating todo:", error);
        res.status(500).json({ error: "Failed to update todo" });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        await Todo.findByIdAndDelete(req.params.id);
        const todos = await Todo.find();
        res.json(todos);
    } catch (error) {
        console.error("Error deleting todo:", error);
        res.status(500).json({ error: "Failed to delete todo" });
    }
});

module.exports = router;