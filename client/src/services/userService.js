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

export function getSettings(user) {
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

export default {
  register,
  update,
  getSettings,
  setSettings
}