// const express = require('express');
// const bodyParser = require('body-parser');
// const cors = require('cors');

// const app = express();
// app.use(bodyParser.json());
// app.use(cors());

// // Routes
// const customerRoutes = require('./routes/customerRoutes');
//  app.use('/api/customers', customerRoutes);
// const campaignRoutes = require('./routes/campaignRoutes');
// app.use('/api', campaignRoutes);
// // Register campaign routes
// app.use('/api/campaigns', campaignRoutes);

// const PORT = 5000;
// app.listen(PORT, () => console.log(`Backend server running on http://localhost:${PORT}`));

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Import Routes
const customerRoutes = require('./routes/customerRoutes');
const campaignRoutes = require('./routes/campaignRoutes');

// Register Routes
app.use('/api/customers', customerRoutes); // Routes for customer-related APIs
app.use('/api/campaigns', campaignRoutes); // Routes for campaign-related APIs
// app.use('/api', campaignRoutes);
// Start the server
const PORT = 5000;
app.listen(PORT, () => console.log(`Backend server running on http://localhost:${PORT}`));

