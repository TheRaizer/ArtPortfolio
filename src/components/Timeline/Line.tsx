import { motion, Variants } from 'framer-motion';
import { ReactElement, useMemo } from 'react';
import styled from 'styled-components';
import { DimensionProps } from '../../../types/Dimension.type';
import { MarginProps } from '../../../types/Margins.type';
import { PositionProps } from '../../../types/Position.type';
import { TimeLineProps } from '../../../types/TimeLine/TimeLine.type';
import { visibilityStates } from '../../constants/framerMotionStates';
import { useTimelineComponent } from '../../hooks/useTimelineComponent';

const StyledLine = styled(motion.div)<
  PositionProps & DimensionProps & MarginProps
>`
  width: ${({ width }) => width || '3px'};
  height: ${({ height }) => height || '3px'};

  top: ${({ top }) => top};
  bottom: ${({ bottom }) => bottom};
  left: ${({ left }) => left};
  right: ${({ right }) => right};

  margin-top: ${({ margintop }) => margintop};
  margin-bottom: ${({ marginbottom }) => marginbottom};
  margin-left: ${({ marginleft }) => marginleft};
  margin-right: ${({ marginright }) => marginright};

  background-color: var(--gray-2);
  position: absolute;
`;

/**
 * A timeline line that can expand vertically or horizontally.
 */
export const Line = ({
  expandVertically,
  transitionDuration,
  transitionDelay,
  order,
  ...props
}: TimeLineProps & DimensionProps): ReactElement => {
  const { ref, control, onAnimationCompleted, onAnimationStarted } =
    useTimelineComponent(order);

  const lineVariants: Variants = useMemo(
    () => ({
      [visibilityStates.initial]: {
        [expandVertically ? 'height' : 'width']: 0,
      },
      [visibilityStates.animate]: {
        height: props.height,
        width: props.width,
        transition: {
          duration: transitionDuration,
          delay: transitionDelay || 0,
        },
      },
    }),
    [
      expandVertically,
      props.height,
      props.width,
      transitionDelay,
      transitionDuration,
    ]
  );

  return (
    <StyledLine
      {...props}
      variants={lineVariants}
      initial={visibilityStates.initial}
      animate={control}
      ref={ref}
      onAnimationStart={onAnimationStarted}
      onAnimationComplete={onAnimationCompleted}
      data-testid={'line'}
    />
  );
};
