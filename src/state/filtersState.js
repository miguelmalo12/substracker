import { atom } from 'recoil';

export const filtersState = atom({
  key: 'filtersState',
  default: {
    categoryFilter: null,
    currencyFilter: null,
    paymentMethodFilter: null,
    sharedFilter: null,
  },
});