import axios from 'axios';
import { toast } from 'react-toastify';
// import * as Sentry from '@sentry/browser';
import auth from './authService';

axios.interceptors.request.use((config) => {
  let token = auth.getJwt();

  if (token) config.headers['x-auth-token'] = token;
  return config;
},
  (error) => {
    return Promise.reject(error);
  });

axios.interceptors.response.use(null, error => {
  const expectedError = error.response.status >= 400 && error.response.status < 500;
  if (!expectedError) {
    // Sentry.captureException(error);
    toast.error('An unexpected errror occurred');
  }

  return Promise.reject(error);
});

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete
};