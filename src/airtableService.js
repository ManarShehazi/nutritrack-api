require('dotenv').config({ path: 'F:\DEVOPS\Project\project\.env' }); // Explicitly specify the path
const axios = require('axios');

console.log("BASE_ID:", process.env.AIRTABLE_BASE_ID);
console.log("API_KEY:", process.env.AIRTABLE_API_KEY);
console.log("TABLE_NAME:", process.env.AIRTABLE_TABLE_NAME);

const BASE_ID = process.env.AIRTABLE_BASE_ID;
const API_KEY = process.env.AIRTABLE_API_KEY;
const TABLE_NAME = encodeURIComponent(process.env.AIRTABLE_TABLE_NAME); // Encode properly
const AIRTABLE_URL = `https://api.airtable.com/v0/${BASE_ID}/${TABLE_NAME}`;


const getFoodLogs = async () => {
  try {
    console.log("Fetching from:", AIRTABLE_URL); // Debugging
    const response = await axios.get(AIRTABLE_URL, {
      headers: { Authorization: `Bearer ${API_KEY}` }
    });
    console.log('Food Logs:', response.data.records);
  } catch (error) {
    console.error('Error fetching data:', error.response?.data || error.message);
  }
};

// Run the function
getFoodLogs();
