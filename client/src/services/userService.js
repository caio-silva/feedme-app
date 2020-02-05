import http from './httpServices';

export function register(user) {
  const endPoint = '/api/user';

  return http.post(
    endPoint,
    {
      name: user.name,
      email: user.email,
      password: user.password
    });
}

export function update(user) {
  const endPoint = '/api/user';

  return http.put(
    endPoint,
    {
      name: user.name,
      email: user.email,
      password: user.password
    });
}

export function getSettings() {
  const endPoint = '/api/settings';
  return http.get(endPoint);
}

export function setSettings(settings) {
  const endPoint = '/api/settings';
  const { dairyFree, glutenFree, vegan, vegetarian } = settings;
  return http.post(
    endPoint,
    { dairyFree, glutenFree, vegan, vegetarian });
}

export function getStock() {
  const endPoint = '/api/stock';
  return http.get(endPoint);
}

export function setStock({ barcode, quantity }) {
  const endPoint = '/api/stock';
  return http.post(endPoint, { barcode, quantity });
}

export default {
  register,
  update,
  getSettings,
  setSettings,
  getStock,
  setStock
}