import { atom } from 'recoil';
import { MobileNavState } from '../../../types/recoil/atoms/mobileNavState.type';

const defaultState: Readonly<MobileNavState> = {
  isOpen: false,
};

export const mobileNavState = atom<MobileNavState>({
  key: 'mobileNavState',
  default: defaultState,
});
