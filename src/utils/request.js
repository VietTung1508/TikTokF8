import axios from 'axios';

const tiktokRequest = axios.create({
  baseURL: 'https://tiktok.fullstack.edu.vn/api/',
});

export const get = async (path, options = {}) => {
  const response = await tiktokRequest(path, options);
  return response.data;
};

export default tiktokRequest;
