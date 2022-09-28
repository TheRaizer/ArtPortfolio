import { atom } from 'recoil';
import {
  AppConfigState,
  ViewportStates,
} from '../../../types/recoil/atoms/appConfig.type';

const defaultState: Readonly<AppConfigState> = {
  viewportState: ViewportStates.DESKTOP,
};

export const appConfigState = atom<AppConfigState>({
  key: 'appConfigState',
  default: defaultState,
});
