import { useAnimation, useInView } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { visibilityStates } from '../constants/framerMotionStates';

/**
 * When the assigned ref is visible through the viewport,
 * the visibilityState.animate transition is executed
 * through the returned framer control.
 *
 * @returns
 * @see ref: A ref to an element that will be watched, in order
 * to trigger animation once it's in view.
 * @see control: The control to pass to the motion elements that will
 * animate when the given ref is visible through the viewport.
 */
export const useAnimateInViewOnce = (canAnimate: boolean) => {
  const control = useAnimation();
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref);

  useEffect(() => {
    if (isInView && canAnimate) {
      control
        .start(visibilityStates.animate)
        .catch((err) => console.error(err));
    }
  }, [canAnimate, control, isInView]);

  return { ref, control };
};
