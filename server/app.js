const express = require('express');
const app = express();
const db = require('./db');
const port = 4000;

app.get('/', (req, res) => {
  res.send('Hello from Express!');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

