const express = require('express');
const cors = require('cors');
const mongoose = require('./config/db');
const router = require('./routes/Todos');

const app = express();
app.use(cors());
app.use(express.json());

const port = 5000;

mongoose

app.use('/api/todos', router);

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
