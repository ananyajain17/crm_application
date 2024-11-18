import React, { useState } from 'react';
import axios from 'axios';

const AudienceForm = () => {
  const [conditions, setConditions] = useState([{ field: '', operator: '', value: '' }]);
  const [audience, setAudience] = useState([]);

  const handleAddCondition = () => {
    setConditions([...conditions, { field: '', operator: '', value: '' }]);
  };

  const handleInputChange = (index, key, value) => {
    const updatedConditions = [...conditions];
    updatedConditions[index][key] = value;
    setConditions(updatedConditions);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/audience', { conditions });
      setAudience(response.data);
    } catch (err) {
      console.error('Error fetching audience:', err);
    }
  };

  return (
    <div>
      <h2>Create Audience</h2>
      <form onSubmit={handleSubmit}>
        {conditions.map((condition, index) => (
          <div key={index}>
            <input
              type="text"
              placeholder="Field"
              value={condition.field}
              onChange={(e) => handleInputChange(index, 'field', e.target.value)}
            />
            <select
              value={condition.operator}
              onChange={(e) => handleInputChange(index, 'operator', e.target.value)}
            >
              <option value=">"></option>
              <option value="<">
            
              </option>
              <option value="=">=</option>
            </select>
            <input
              type="text"
              placeholder="Value"
              value={condition.value}
              onChange={(e) => handleInputChange(index, 'value', e.target.value)}
            />
          </div>
        ))}
        <button type="button" onClick={handleAddCondition}>Add Condition</button>
        <button type="submit">Fetch Audience</button>
      </form>
      <h3>Audience</h3>
      <ul>
        {audience.map((customer) => (
          <li key={customer.id}>{customer.name} - {customer.email}</li>
        ))}
      </ul>
    </div>
  );
};

export default AudienceForm;
