import { motion, Variants } from 'framer-motion';
import { ReactElement, useMemo } from 'react';
import styled from 'styled-components';
import { MarginProps } from '../../../types/Margins.type';
import { PositionProps } from '../../../types/Position.type';
import { TimeLineProps } from '../../../types/TimeLine/TimeLine.type';
import { visibilityStates } from '../../constants/framerMotionStates';
import { useTimelineComponent } from '../../hooks/useTimelineComponent';

const StyledCircle = styled(motion.div)<PositionProps & MarginProps>`
  width: 25px;
  height: 25px;
  background-color: var(--gray-2);
  border-radius: 50%;

  top: ${({ top }) => top};
  bottom: ${({ bottom }) => bottom};
  left: ${({ left }) => left};
  right: ${({ right }) => right};

  margin-top: ${({ margintop }) => margintop};
  margin-bottom: ${({ marginbottom }) => marginbottom};
  margin-left: ${({ marginleft }) => marginleft};
  margin-right: ${({ marginright }) => marginright};

  position: absolute;
`;

export const Circle = ({
  expandVertically,
  transitionDuration,
  transitionDelay,
  order,
  ...props
}: TimeLineProps): ReactElement => {
  const { ref, control, onAnimationCompleted, onAnimationStarted } =
    useTimelineComponent(order);

  const circleVariants: Variants = useMemo(
    () => ({
      [visibilityStates.initial]: {
        [expandVertically ? 'height' : 'width']: 0,
      },
      [visibilityStates.animate]: {
        height: 25,
        width: 25,
        transition: {
          duration: transitionDuration,
          delay: transitionDelay || 0,
          type: 'spring',
        },
      },
    }),
    [expandVertically, transitionDuration, transitionDelay]
  );

  return (
    <StyledCircle
      {...props}
      ref={ref}
      variants={circleVariants}
      initial={visibilityStates.initial}
      animate={control}
      onAnimationStart={onAnimationStarted}
      onAnimationComplete={onAnimationCompleted}
      data-testid={'circle'}
    />
  );
};
