// const express = require('express');
// const router = express.Router();
// const { getAudience } = require('../controllers/campaignController');

// // Route to fetch audience segments
// router.post('/audience', getAudience);
// const { createCampaign } = require('../controllers/campaignController');

// // Route to create a campaign
// router.post('/campaigns', createCampaign);

// module.exports = router;

const express = require('express');
const router = express.Router();
//const { getAudience, createCampaign } = require('../controllers/campaignController'); // Import all required controllers at once
const { getAudience, createCampaign, getCampaignHistory, sendMessages } = require('../controllers/campaignController');
// Route to fetch audience segments
router.post('/audience', getAudience);

// Route to create a campaign
router.post('/campaigns', createCampaign);

//add route in campaignroute.js


router.get('/history', getCampaignHistory);


router.post('/send-messages', sendMessages);


module.exports = router;
