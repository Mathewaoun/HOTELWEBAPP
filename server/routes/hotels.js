const express = require('express');
const db = require('../db');

const router = express.Router();

// Route to render the hotel list page
router.get('/hotels', (req, res) => {
  db.all('SELECT * FROM hotels', (err, rows) => {
    if (err) {
      console.error('Database query error:', err.message);
      res.status(500).send('Error fetching hotels');
      return;
    }
    res.render('hotel-list', { hotels: rows });
  });
});

module.exports = router;
