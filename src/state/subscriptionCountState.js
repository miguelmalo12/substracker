import { atom } from 'recoil';

export const subscriptionCountState = atom({
  key: 'subscriptionCountState',
  default: 0,
});