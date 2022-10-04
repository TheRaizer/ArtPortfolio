import { DefaultValue, selector } from 'recoil';
import { noScroll } from '../../constants/classNames';
import { mobileNavState } from '../atoms/mobileNavState';

export const mobileNavIsOpenSelector = selector<boolean>({
  key: 'mobileNavSelector',
  get: ({ get }) => get(mobileNavState).isOpen,
  set: ({ set }, isOpen) => {
    // default value is false so allow scroll
    if (isOpen instanceof DefaultValue) {
      document.body.classList.remove(noScroll);
      set(mobileNavState, (prevState) => ({ ...prevState, isOpen: false }));
      return;
    }

    if (isOpen) {
      document.body.classList.add(noScroll);
    } else {
      document.body.classList.remove(noScroll);
    }

    set(mobileNavState, (prevState) => ({ ...prevState, isOpen }));
  },
});
