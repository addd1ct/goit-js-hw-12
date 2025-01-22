import axios from 'axios';

const API_KEY = '48228691-89796883a04c0782a049fa841';
const BASE_URL = 'https://pixabay.com/api/';

export async function fetchImages(query, page = 1, perPage = 15) {
  const url = `${BASE_URL}?key=${API_KEY}&q=${encodeURIComponent(query)}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${perPage}`;
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (err) {
    console.err('Error fetching data:', err);
    throw err;
  }
}