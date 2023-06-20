import axios from 'axios';

const api = axios.create({
  baseURL: 'https://www.pre-onboarding-selection-task.shop/',
});

api.interceptors.request.use(config => {
  const access_token = localStorage.getItem('access_token');
  if (access_token) config.headers.Authorization = `Bearer ${access_token}`;
  return config;
});

export default api;
