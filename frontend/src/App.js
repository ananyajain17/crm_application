// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;

import React, { useEffect, useState } from 'react';
import { fetchCustomers, addCustomer } from './api';
import axios from 'axios';
import AudienceForm from './components/AudienceForm';
import CampaignForm from './components/CampaignForm';
import CampaignHistory from './components/CampaignHistory';
function App() {
  const [customers, setCustomers] = useState([]);
  const [form, setForm] = useState({ name: '', email: '', total_spending: '', last_visit: '' });

  useEffect(() => {
    fetchCustomers()
      .then((res) => setCustomers(res.data))
      .catch((err) => console.error('Error fetching customers:',err));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    addCustomer(form)
      .then(() => {
        alert('Customer added!');
        fetchCustomers().then((res) => setCustomers(res.data));
      })
      .catch((err) => console.error('Error adding customer:',err));
  };

  return (
    <div  style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>CRM App</h1>

      {/* Customer Section */}
    <section style={{ marginBottom: '40px' }}>
        <h2>Customer Management</h2>
        <div>
          <h3>Customer List</h3>
          <ul>
            {customers.map((customer) => (
              <li key={customer.id}>{customer.name}</li>
            ))}
          </ul>
        </div>

      <div>
      <h3>Add Customer</h3>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <input
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <input
          placeholder="Total Spending"
          value={form.total_spending}
          onChange={(e) => setForm({ ...form, total_spending: e.target.value })}
        />
        <input
          placeholder="Last Visit"
          value={form.last_visit}
          onChange={(e) => setForm({ ...form, last_visit: e.target.value })}
        />
        <button type="submit">Add</button>
      </form>
    </div>
    </section>  

    {/* Audience Section */}
<section style={{ marginBottom: '40px' }}>
  <h2>Audience Management</h2>
  <AudienceForm />
</section>


    {/* Campaign Section */}
    <section style={{ marginBottom: '40px' }}>
        <h2>Campaign Management</h2>
        <div>
          <CampaignForm />
        </div>
        <div>
          <CampaignHistory />
        </div>
      </section>
    </div>
    // <div>
    //   <h1>Customer List</h1>
    //   <ul>
    //     {customers.map((customer) => (
    //       <li key={customer.id}>{customer.name}</li>
    //     ))}
    //   </ul>

    //   <h2>Add Customer</h2>
    //   <form onSubmit={handleSubmit}>
    //     <input placeholder="Name" onChange={(e) => setForm({ ...form, name: e.target.value })} />
    //     <input placeholder="Email" onChange={(e) => setForm({ ...form, email: e.target.value })} />
    //     <input placeholder="Total Spending" onChange={(e) => setForm({ ...form, total_spending: e.target.value })} />
    //     <input placeholder="Last Visit" onChange={(e) => setForm({ ...form, last_visit: e.target.value })} />
    //     <button type="submit">Add</button>
    //   </form>
    // </div>
 
    
  );
}

export default App;
