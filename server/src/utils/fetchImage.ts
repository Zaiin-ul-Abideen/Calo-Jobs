const axios = require('axios');

const CLIENT_ID = process.env.ACCESS_KEY;
const UNSPLASH_API = process.env.UNSPLASH_API_URL;
export const fetchRandomImage = async () => {
  try {
    const response = await axios.get(`${UNSPLASH_API}`, {
      params: { query: 'food' },
      headers: { Authorization: `Client-ID ${CLIENT_ID}` }
    });
    if (response.status !== 200) {
      throw new Error(`Failed to fetch image: ${response.status} ${response.statusText}`);
    }
    
    return response.data?.urls?.regular || 'No image';
  } catch (error) {
    throw error;
  }
};