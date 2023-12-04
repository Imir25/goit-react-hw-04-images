import axios from "axios";

axios.defaults.baseURL = 'https://pixabay.com/api/';
const per_page = 12;

export const fetchImages = async (searchQuery, page) => {
  const apiKey = '39801546-c4bb34864e6abc7825d1e4868';
  const response = await axios.get(`?q=${searchQuery}&page=${page}&key=${apiKey}&image_type=photo&orientation=horizontal&per_page=${per_page}`);
  return response.data;
};