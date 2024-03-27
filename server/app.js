const sqlite3 = require('sqlite3').verbose();
const express = require('express');
const apiRoutes = require('./routes/api');
const bodyParser = require('body-parser');
const cors = require('cors');
const { connectToDatabase, getChains } = require('./utils/db');
const { createDatabase, populateDatabase, closeDatabase } = require('./db/initDB');

const app = express();


app.use(bodyParser.json());
app.use(cors());

// Use API routes
app.use('', apiRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});