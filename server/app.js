const express = require('express');
const hotelsRouter = require('./routes/hotels');
const app = express();

// Register routes
app.use('/api', hotelsRouter);

// Define route handler for the root path
app.get('/', (req, res) => {
  res.send('Welcome to the Hotel Booking App!!');
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
