import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000/api' });

export const fetchCustomers = () => API.get('/customers');
export const addCustomer = (data) => API.post('/customers', data);
