// const express = require('express');
// const router = express.Router();
// const { getCustomers, addCustomer } = require('../controllers/customerController');

// router.get('/', getCustomers);
// router.post('/', addCustomer);

// module.exports = router;

const express = require('express');
const router = express.Router();
const db = require('../models/db');
const { addCustomer, addOrder } = require('../controllers/customerController');

// Route to add a customer
router.post('/', addCustomer);

// Route to add an order
router.post('/orders', addOrder);


// Get all customers
router.get('/', (req, res) => {
    const query = 'SELECT * FROM customers';
    db.query(query, (err, results) => {
      if (err) {
        console.error('Error fetching customers:', err);
        return res.status(500).send('Failed to fetch customers');
      }
      res.status(200).json(results);
    });
  });
  
module.exports = router;
