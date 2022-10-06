import { useCallback, useEffect, useMemo, useState } from 'react';
import { useAnimateInViewOnce } from '../hooks/useAnimateInViewOnce';
import { useRecoilValue, useRecoilCallback } from 'recoil';
import { timelineState } from '../recoil/atoms/timelineState';
import { useScroll } from 'framer-motion';
import { visibilityStates } from '../constants/framerMotionStates';

/**
 * The animation of a timeline component.
 * @param order: the position of the timeline component in the overall timeline. 0 indexed.
 * @returns
 * @see ref: a ref that should be passed to the timeline component that will be controlled.
 * @see control: a control that manages the animation of the timeline component.
 * (Should be passed to the timeline component in the 'animate' prop)
 * @see onAnimationCompleted: a function that registers this timeline component's animation as completed in
 * the global recoil state. It should be passed to the timeline components 'onAnimationCompleted' prop.
 * @see onAnimationStarted: a function that registers this timeline component's animation state as started.
 * It should be passed to the timeline component's 'onAnimationStarted' prop.
 */
export const useTimelineComponent = (order: number) => {
  const timeline = useRecoilValue(timelineState);
  const [animationStarted, setAnimationStarted] = useState(false);
  const { scrollY } = useScroll();

  /**
   * We can only animate if the previous component in the timeline has finished animating
   * or if this component is the first component in the timeline.
   *
   * Also, the animation must not be already started.
   */
  const canAnimate = useMemo(
    () =>
      (order !== 0 ? timeline.componentsAnimated[order - 1] : true) &&
      !animationStarted,
    [animationStarted, order, timeline.componentsAnimated]
  );

  const { ref, control } = useAnimateInViewOnce(canAnimate);

  /**
   * Sets the current 'order' of timeline component to be registered as animated in the
   * componentsAnimated prop in timelineState.
   */
  const onAnimationCompleted = useRecoilCallback(({ set }) => () => {
    set(timelineState, (prevState) => {
      const newComponentsAnimated = [...prevState.componentsAnimated];
      newComponentsAnimated[order] = true;

      return { ...prevState, componentsAnimated: newComponentsAnimated };
    });
  });

  const onAnimationStarted = useCallback(() => setAnimationStarted(true), []);

  useEffect(() => {
    if (animationStarted) return;

    return scrollY.onChange(() => {
      if (ref.current) {
        // Force animation to start if the timeline component has been scrolled past.
        if (ref.current?.getBoundingClientRect().top < 0) {
          control
            .start(visibilityStates.animate)
            .catch((err) => console.error(err));
        }
      }
    });
  }, [
    scrollY,
    ref,
    order,
    control,
    canAnimate,
    onAnimationCompleted,
    animationStarted,
  ]);

  return { ref, control, onAnimationCompleted, onAnimationStarted };
};
