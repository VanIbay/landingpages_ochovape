const ADMIN_USER = import.meta.env.VITE_ADMIN_USER || 'ocho';
const ADMIN_PASS = import.meta.env.VITE_ADMIN_PASS || 'ochovape1234';

export function login(username, password) {
  if (username === ADMIN_USER && password === ADMIN_PASS) {
    localStorage.setItem('ocho-admin-auth', JSON.stringify({ user: username, loggedIn: true }));
    return true;
  }
  return false;
}

export function logout() {
  localStorage.removeItem('ocho-admin-auth');
}

export function isAuthenticated() {
  try {
    const auth = JSON.parse(localStorage.getItem('ocho-admin-auth'));
    return auth?.loggedIn === true;
  } catch {
    return false;
  }
}
