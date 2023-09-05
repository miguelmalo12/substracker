import { atom, selector } from 'recoil';

// Atom to store user information
export const userState = atom({
  key: 'userState',
  default: {
    user_id: null,
    user_email: null,
    preferred_currency: null,
    user_password: null,
  },
});

// Selector to pull user information from local storage
export const userStateFromLocalStorage = selector({
  key: 'userStateFromLocalStorage',
  get: () => {
    const userData = localStorage.getItem('userData');
    return userData ? JSON.parse(userData) : {};
  },
  set: ({ set }, newValue) => {
    localStorage.setItem('userData', JSON.stringify(newValue));
    set(userState, newValue);
  },
});