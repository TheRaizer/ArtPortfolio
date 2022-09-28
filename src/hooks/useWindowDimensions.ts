import { useState, useEffect, useCallback } from 'react';

const getWindowDimensions = (): { width: number; height: number } => {
  if (typeof window !== 'undefined') {
    const { innerWidth: width, innerHeight: height } = window;
    return {
      width,
      height,
    };
  }
  return { width: 0, height: 0 };
};

/**
 * Executes a given function whenever a resize event is fired from the window.
 * @param handleResize: function to execute when window is resized.
 * @returns
 * @see windowDimensions: the current window dimensions.
 */
export const useWindowDimensions = (
  handleResize: ({ width, height }: { width: number; height: number }) => void
): { width: number; height: number } => {
  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  );

  const onResize = useCallback(() => {
    const dimensions = getWindowDimensions();
    setWindowDimensions(dimensions);
    handleResize(dimensions);
  }, [handleResize]);

  useEffect(() => {
    onResize();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [onResize]);

  return windowDimensions;
};
