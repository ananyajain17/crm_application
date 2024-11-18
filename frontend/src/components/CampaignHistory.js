import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CampaignHistory = () => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/compaigns/history');
        console.log('API Response:', response.data); // Debugging log
        setHistory(response.data);
      } catch (err) {
        console.error('Error fetching campaign history:', err);
      }
    };
    fetchHistory();
  }, []);

  return (
    <div>
      <h2>Campaign History</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Message</th>
            <th>Audience Size</th>
            <th>Sent</th>
            <th>Failed</th>
          </tr>
        </thead>
        <tbody>

          {history.length>0 ? (
    history.map((campaign) => (
      <tr key={campaign.id}>
        <td>{campaign.name}</td>
        <td>{campaign.message}</td>
        <td>{campaign.audience_size}</td>
        <td>{campaign.sent_count}</td>
        <td>{campaign.failed_count}</td>
      </tr>
    ))
  ) : (
    <tr>
      <td colSpan="5">No campaigns found.</td>
    </tr>
  )
          /* {history.map((campaign) => (
            <tr key={campaign.id}>
              <td>{campaign.name}</td>
              <td>{campaign.message}</td>
              <td>{campaign.audience_size}</td>
              <td>{campaign.sent_count}</td>
              <td>{campaign.failed_count}</td>
            </tr>
          ))} */}

        </tbody>
      </table>
    </div>
  );
};

export default CampaignHistory;
