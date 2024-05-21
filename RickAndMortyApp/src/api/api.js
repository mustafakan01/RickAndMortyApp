import axios from 'axios';

const API_URL = 'https://rickandmortyapi.com/api';

export const getEpisodes = async (page = 1) => {
  try {
    const response = await axios.get(`${API_URL}/episode?page=${page}`);
    console.log(response.data);  // Yanıtı kontrol etmek için ekledik
    return response.data;
  } catch (error) {
    console.error('Error fetching episodes:', error);
    throw error;
  }
};

// Diğer fonksiyonlar aynı kalacak
export const getEpisodeDetail = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/episode/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching episode detail:', error);
    throw error;
  }
};

export const getCharacterDetail = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/character/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching character detail:', error);
    throw error;
  }
};
