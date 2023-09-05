import { atom } from 'recoil';
import { hardcodedRates } from './hardcodedRates';

export const currencyRatesState = atom({
  key: 'currencyRatesState',
  default: hardcodedRates
});