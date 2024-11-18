import React, { useState } from 'react';
import axios from 'axios';

const CampaignForm = () => {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [audience, setAudience] = useState('');
  const [status, setStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/campaigns', {
        name,
        message,
        audience: audience.split(',').map(Number),
      });
      setStatus(response.data);
    } catch (err) {
      console.error('Error creating campaign:', err);
    }
  };

  return (
    <div>
      <h2>Create Campaign</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Campaign Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <textarea
          placeholder="Campaign Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <input
          type="text"
          placeholder="Audience (comma-separated IDs)"
          value={audience}
          onChange={(e) => setAudience(e.target.value)}
        />
        <button type="submit">Create Campaign</button>
      </form>
      <h3>Status: {status}</h3>
    </div>
  );
};

export default CampaignForm;
