import { atom } from 'recoil';
import { TimeLineState } from '../../../types/recoil/atoms/timelineState.type';

const defaultState: Readonly<TimeLineState> = {
  componentsAnimated: [],
};

export const timelineState = atom<TimeLineState>({
  key: 'timelineState',
  default: defaultState,
});
