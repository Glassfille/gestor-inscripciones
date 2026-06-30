const TOKEN_KEY = 'gestionCursosToken';
const USER_KEY = 'gestionCursosUser';

export const sessionStorageService = {
  getToken() {
    return localStorage.getItem(TOKEN_KEY);
  },
  setSession({ token, user }) {
    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  },
  getUser() {
    const value = localStorage.getItem(USER_KEY);
    return value ? JSON.parse(value) : null;
  },
  clear() {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  }
};
