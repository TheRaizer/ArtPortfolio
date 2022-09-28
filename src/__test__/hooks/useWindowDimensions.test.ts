import { renderHook, act } from '@testing-library/react';
import { useWindowDimensions } from '../../hooks/useWindowDimensions';

const initialDimensions = {
  width: 200,
  height: 200,
};

describe('useWindowDimensions', () => {
  beforeEach(() => {
    Object.defineProperty(global, 'innerWidth', {
      writable: true,
      configurable: true,
      value: initialDimensions.width,
    });

    Object.defineProperty(global, 'innerHeight', {
      writable: true,
      configurable: true,
      value: initialDimensions.height,
    });
  });

  it('should return the window dimensions on resize', () => {
    const handleResize = jest.fn();

    const { result } = renderHook(() => useWindowDimensions(handleResize));

    expect(result.current.width).toStrictEqual(initialDimensions.width);
    expect(result.current.height).toStrictEqual(initialDimensions.height);

    const newDimensions = { width: 700, height: 500 };
    global.innerWidth = newDimensions.width;
    global.innerHeight = newDimensions.height;

    act(() => {
      // trigger resize which should update values of width and height in the hook.
      global.dispatchEvent(new Event('resize'));
    });

    expect(result.current.width).toStrictEqual(newDimensions.width);
    expect(result.current.height).toStrictEqual(newDimensions.height);
  });

  describe('resize function parameter', () => {
    it('should be triggered on window resize', () => {
      const handleResize = jest.fn();

      renderHook(() => useWindowDimensions(handleResize));

      expect(handleResize).toHaveBeenCalledTimes(1);

      act(() => {
        global.dispatchEvent(new Event('resize'));
      });

      expect(handleResize).toHaveBeenCalledTimes(2);
    });

    it('should be passed the correct width and height of the window', () => {
      const handleResize = jest.fn();

      renderHook(() => useWindowDimensions(handleResize));

      expect(handleResize).toHaveBeenCalledWith({
        width: initialDimensions.width,
        height: initialDimensions.height,
      });

      act(() => {
        global.dispatchEvent(new Event('resize'));
      });

      const newDimensions = { width: 1055, height: 11 };
      global.innerWidth = newDimensions.width;
      global.innerHeight = newDimensions.height;

      act(() => {
        global.dispatchEvent(new Event('resize'));
      });

      expect(handleResize).toHaveBeenCalledWith({
        width: newDimensions.width,
        height: newDimensions.height,
      });
    });
  });
});
