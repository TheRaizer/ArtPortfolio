import { useCallback, useRef } from 'react';
import { useRecoilState } from 'recoil';
import { ViewportStates } from '../../../types/recoil/atoms/appConfig.type';
import { appConfigState } from '../../recoil/atoms/appConfig';
import { useWindowDimensions } from '../useWindowDimensions';

const useMobileTheme = () => {
  const [appConfig, setAppConfig] = useRecoilState(appConfigState);
  const viewportState = useRef(appConfig.viewportState);

  const changeViewportState = useCallback(
    (newViewportState: ViewportStates) => {
      if (viewportState.current !== newViewportState) {
        setAppConfig((state) => ({
          ...state,
          viewportState: newViewportState,
        }));
        viewportState.current = newViewportState;
      }
    },
    [setAppConfig]
  );

  const handleResize = useCallback(
    ({ width }: { width: number; height: number }) => {
      if (width > 900) {
        changeViewportState(ViewportStates.DESKTOP);
      } else if (width <= 900 && width >= 650) {
        changeViewportState(ViewportStates.TABLET);
      } else {
        changeViewportState(ViewportStates.MOBILE);
      }
    },
    [changeViewportState]
  );

  useWindowDimensions(handleResize);
};

export default useMobileTheme;
