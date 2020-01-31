import jwtDecode from 'jwt-decode';
import http from './httpServices';

const endPoint = '/api/user/login';
const tokenKey = 'token';

export function getCurrentUser() {
  try {
    const jwt = localStorage.getItem(tokenKey);
    return jwtDecode(jwt);
  } catch (ex) {
    return null;
  }
}

export async function login(email, password) {
  const { data: { token: jwt } } = await http.post(endPoint, { email, password });
  localStorage.setItem('token', jwt);
}

export function loginWithJwt(jwt) {
  localStorage.setItem(tokenKey, jwt);
}

export function logout() {
  localStorage.removeItem(tokenKey);
}

export function getJwt() {
  return localStorage.getItem(tokenKey);
}

export default {
  login,
  loginWithJwt,
  logout,
  getCurrentUser,
  getJwt
}