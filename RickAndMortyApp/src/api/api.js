import axios from 'axios';

const API_URL = 'https://rickandmortyapi.com/api';

export const getEpisodes = async (page) => {
  const response = await axios.get(`${API_URL}/episode?page=${page}`);
  return response.data;
};

export const getEpisodeDetails = async (id) => {
  const response = await axios.get(`${API_URL}/episode/${id}`);
  return response.data;
};
