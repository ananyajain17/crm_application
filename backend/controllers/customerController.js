// const db = require('../models/db');

// const getCustomers = (req, res) => {
//   db.query('SELECT * FROM customers', (err, results) => {
//     if (err) {
//       res.status(500).send(err);
//     } else {
//       res.json(results);
//     }
//   });
// };

// const addCustomer = (req, res) => {
//   const { name, email, total_spending, last_visit } = req.body;
//   const query = 'INSERT INTO customers (name, email, total_spending, last_visit) VALUES (?, ?, ?, ?)';
//   db.query(query, [name, email, total_spending, last_visit], (err, result) => {
//     if (err) {
//       res.status(500).send(err);
//     } else {
//       res.status(201).send('Customer added successfully');
//     }
//   });
// };

// module.exports = { getCustomers, addCustomer };

const db = require('../models/db');

// Add a customer
const addCustomer = (req, res) => {
  const { name, email, total_spending, last_visit } = req.body;

  const query = `INSERT INTO customers (name, email, total_spending, last_visit) VALUES (?, ?, ?, ?)`;
  db.query(query, [name, email, total_spending, last_visit], (err, result) => {
    if (err) {
      console.error('Error adding customer:', err);
      return res.status(500).send('Failed to add customer');
    }
    res.status(201).send('Customer added successfully');
  });
};

// Add an order
const addOrder = (req, res) => {
  const { customer_id, order_date, order_amount } = req.body;

  const query = `INSERT INTO orders (customer_id, order_date, order_amount) VALUES (?, ?, ?)`;
  db.query(query, [customer_id, order_date, order_amount], (err, result) => {
    if (err) {
      console.error('Error adding order:', err);
      return res.status(500).send('Failed to add order');
    }
    res.status(201).send('Order added successfully');
  });
};

module.exports = { addCustomer, addOrder };
