import { HTMLMotionProps } from 'framer-motion';

/**
 * Returns a general animation for both mobile and non-mobile nav item components.
 * @param initialOpacity the optional initial opacity for the given nav item
 * @returns a object of motion props for an 'a' element.
 */
export const navItemAnimations = (
  initialOpacity?: number
): HTMLMotionProps<'a'> => ({
  initial: {
    opacity: initialOpacity === undefined ? 0.3 : initialOpacity,
  },
  whileHover: { opacity: 1 },
  transition: { duration: 0.25 },
});
