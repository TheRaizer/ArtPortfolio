import { ReactElement, useMemo } from 'react';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { ViewportStates } from '../../../types/recoil/atoms/appConfig.type';
import { appConfigState } from '../../recoil/atoms/appConfig';
import { Circle } from './Circle';
import { Line } from './Line';

const Styled = {
  TimelineContainer: styled.div`
    width: var(--vw-no-scrollbar);
    top: 75%;
    position: absolute;
  `,
  TimelineInnerContainer: styled.div`
    width: 100%;
    height: 100%;
    position: relative;
  `,
  FlippedContainer: styled.div`
    transform: scaleX(-1);
  `,
};

export const TimelineOverlay = (): ReactElement | null => {
  const { viewportState } = useRecoilValue(appConfigState);
  const Component = useMemo(
    () =>
      viewportState === ViewportStates.MOBILE ? null : (
        <Styled.TimelineContainer>
          <Styled.TimelineInnerContainer>
            <Circle
              order={0}
              expandVertically={true}
              transitionDuration={1}
              right="10%"
              marginright="-10px"
            />
            <Line
              order={1}
              height="30vh"
              expandVertically={true}
              transitionDuration={1}
              right="10%"
            />
            <Styled.FlippedContainer>
              <Line
                order={2}
                width="85%"
                transitionDuration={1}
                top="30vh"
                left="10%"
              />
            </Styled.FlippedContainer>
            <Line
              order={3}
              expandVertically={true}
              height="40vh"
              transitionDuration={0.5}
              top="30.1vh"
              left="5%"
            />
            <Circle
              order={4}
              expandVertically={true}
              transitionDuration={0.3}
              top="70vh"
              left="5%"
              marginleft="-11px"
            />
            <Line
              order={5}
              expandVertically={true}
              height="80vh"
              transitionDuration={1}
              top="70vh"
              left="5%"
            />
            <Circle
              order={6}
              expandVertically={true}
              transitionDuration={0.3}
              top="149vh"
              left="5%"
              marginleft="-11px"
            />
          </Styled.TimelineInnerContainer>
        </Styled.TimelineContainer>
      ),
    [viewportState]
  );
  return Component;
};
