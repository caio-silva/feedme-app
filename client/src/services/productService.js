import http from './httpServices';

export function getProducts() {
  const endPoint = '/api/products';
  return http.get(endPoint);
}

export default {
  getProducts
}