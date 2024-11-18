const db = require('../models/db');

// // Fetch audience based on conditions
// const getAudience = (req, res) => {
//   const { conditions } = req.body;

//   let query = 'SELECT * FROM customers WHERE ';
//   const queryConditions = conditions
//     .map((condition) => `${condition.field} ${condition.operator} ?`)
//     .join(' AND ');

//   const values = conditions.map((condition) => condition.value);

//   query += queryConditions;

//   db.query(query, values, (err, results) => {
//     if (err) {
//       console.error('Error fetching audience:', err);
//       return res.status(500).send('Failed to fetch audience');
//     }
//     res.status(200).json(results);
//   });
// };

// module.exports = { getAudience };


const getAudience = (req, res) => {
    const { conditions } = req.body;
    if (!conditions || conditions.length === 0) {
      return res.status(400).send('No conditions provided');
    }
  
    let query = 'SELECT * FROM customers WHERE ';
    const queryConditions = conditions
      .map((condition) => `${condition.field} ${condition.operator} ?`)
      .join(' AND ');
  
    const values = conditions.map((condition) => condition.value);
  
    query += queryConditions;
  
    console.log('Generated Query:', query); // Debug log
    console.log('Values:', values); // Debug log
  
    db.query(query, values, (err, results) => {
      if (err) {
        console.error('Error fetching audience:', err);
        return res.status(500).send('Failed to fetch audience');
      }
      res.status(200).json(results);
    });
  };

// Create a new campaign
const createCampaign = (req, res) => {
    const { name, message, audience } = req.body;
  
    const audienceSize = audience.length;
    const query = `INSERT INTO campaigns (name, message, audience_size) VALUES (?, ?, ?)`;
  
    db.query(query, [name, message, audienceSize], (err, result) => {
      if (err) {
        console.error('Error creating campaign:', err);
        return res.status(500).send('Failed to create campaign');
      }
  
      const campaignId = result.insertId;
  
      // Insert communication logs for each audience member
      const logsQuery = `INSERT INTO communications_log (campaign_id, customer_id, status) VALUES ?`;
      const logsValues = audience.map((customerId) => [campaignId, customerId, 'PENDING']);
  
      db.query(logsQuery, [logsValues], (err) => {
        if (err) {
          console.error('Error creating communication logs:', err);
          return res.status(500).send('Failed to log campaign communications');
        }
        res.status(201).send('Campaign created successfully');
      });
    });
  };

  const getCampaignHistory = (req, res) => {
    const query = `SELECT id, name, message, audience_size, 
                          (SELECT COUNT(*) FROM communications_log WHERE campaign_id = campaigns.id AND status = 'SENT') AS sent_count, 
                          (SELECT COUNT(*) FROM communications_log WHERE campaign_id = campaigns.id AND status = 'FAILED') AS failed_count, 
                          created_at 
                   FROM campaigns 
                   ORDER BY created_at DESC`;

    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching campaign history:', err);
            return res.status(500).send('Failed to fetch campaign history');
        }
        res.status(200).json(results);
    });
};



const sendMessages = (req, res) => {
    const { campaign_id } = req.body;

    const query = `SELECT customer_id FROM communications_log WHERE campaign_id = ? AND status = 'PENDING'`;
    db.query(query, [campaign_id], (err, customers) => {
        if (err) {
            console.error('Error fetching pending messages:', err);
            return res.status(500).send('Failed to fetch pending messages');
        }

        const updateLogs = customers.map((customer) => {
            const status = Math.random() < 0.9 ? 'SENT' : 'FAILED'; // 90% SENT, 10% FAILED
            return [status, campaign_id, customer.customer_id];
        });

        const updateQuery = `UPDATE communications_log SET status = ? WHERE campaign_id = ? AND customer_id = ?`;
        const updatePromises = updateLogs.map((log) => {
            return new Promise((resolve, reject) => {
                db.query(updateQuery, log, (err) => {
                    if (err) reject(err);
                    else resolve();
                });
            });
        });

        Promise.all(updatePromises)
            .then(() => res.status(200).send('Messages sent successfully'))
            .catch((err) => {
                console.error('Error sending messages:', err);
                res.status(500).send('Failed to send messages');
            });
    });
};

module.exports = { getAudience, createCampaign, getCampaignHistory, sendMessages };


  
//   module.exports = { getAudience, createCampaign };
  

  