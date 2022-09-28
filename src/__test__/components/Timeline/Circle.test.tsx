import { screen } from '@testing-library/react';
import React from 'react';
import { render } from '../../utils/custom-renderer';
import { Circle } from '../../../components/Timeline/Circle';
import { PositionProps } from '../../../../types/Position.type';

describe('GalleryPiece', () => {
  it('should render correctly', () => {
    render(<Circle transitionDuration={0} order={0} />);

    const CircleElement = screen.getByTestId('circle');

    expect(CircleElement).toBeVisible();
    expect(CircleElement).toHaveStyleRule('width', '25px');
    expect(CircleElement).toHaveStyleRule('height', '25px');
  });

  it('should pass style props correctly', () => {
    const positionProps: PositionProps[] = [
      { top: '10px', bottom: '1px', left: '23px', right: '232px' },
      { top: '5px', bottom: '12px', left: '9px', right: '98px' },
    ];
    const { rerender } = render(
      <Circle transitionDuration={0} order={0} {...positionProps[0]} />
    );
    const CircleElement = screen.getByTestId('circle');

    Object.entries(positionProps[0]).forEach(([key, value]) =>
      expect(CircleElement).toHaveStyleRule(key, value)
    );

    rerender(<Circle transitionDuration={0} order={0} {...positionProps[1]} />);

    Object.entries(positionProps[1]).forEach(([key, value]) =>
      expect(CircleElement).toHaveStyleRule(key, value)
    );
  });

  describe('expandVertically props', () => {
    test('if true, height should be 0px and width should be 25px', () => {
      render(
        <Circle transitionDuration={0} order={0} expandVertically={true} />
      );
      const CircleElement = screen.getByTestId('circle');
      expect(CircleElement).toHaveStyle('height: 0');
      expect(CircleElement).toHaveStyle('width: 25px');
    });
    test('if false or undefined, height should be 25px and width should be 0px', () => {
      render(
        <Circle transitionDuration={0} order={0} expandVertically={false} />
      );
      const CircleElement = screen.getByTestId('circle');
      expect(CircleElement).toHaveStyle('width: 0');
      expect(CircleElement).toHaveStyle('height: 25px');
    });
  });
});
