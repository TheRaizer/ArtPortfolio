import { screen } from '@testing-library/react';
import React from 'react';
import { render } from '../../test-utils/custom-renderer';
import { PositionProps } from '../../../../types/Position.type';
import { Line } from '../../../components/Timeline/Line';
import { DimensionProps } from '../../../../types/Dimension.type';

describe('GalleryPiece', () => {
  it('should render correctly', () => {
    render(
      <Line transitionDuration={0} order={0} width="5px" height="100px" />
    );

    const LineElement = screen.getByTestId('line');

    expect(LineElement).toBeVisible();
    expect(LineElement).toHaveStyleRule('width', '5px');
    expect(LineElement).toHaveStyleRule('height', '100px');
  });

  it('should pass style props correctly', () => {
    const positionProps: PositionProps & DimensionProps[] = [
      {
        top: '10px',
        bottom: '1px',
        left: '23px',
        right: '232px',
        width: '230px',
        height: '210px',
      },
      {
        top: '5px',
        bottom: '12px',
        left: '9px',
        right: '98px',
        width: '20px',
        height: '9px',
      },
    ];
    const { rerender } = render(
      <Line transitionDuration={0} order={0} {...positionProps[0]} />
    );
    const LineElement = screen.getByTestId('line');

    Object.entries(positionProps[0]).forEach(([key, value]) =>
      expect(LineElement).toHaveStyleRule(key, value)
    );

    rerender(<Line transitionDuration={0} order={0} {...positionProps[1]} />);

    Object.entries(positionProps[1]).forEach(([key, value]) =>
      expect(LineElement).toHaveStyleRule(key, value)
    );
  });

  describe('expandVertically props', () => {
    test('if true, height should be 0px and width should be 25px', () => {
      render(
        <Line
          transitionDuration={0}
          order={0}
          expandVertically={true}
          height="25px"
          width="25px"
        />
      );
      const LineElement = screen.getByTestId('line');
      expect(LineElement).toHaveStyle('height: 0');
      expect(LineElement).toHaveStyle('width: 25px');
    });
    test('if false or undefined, height should be 25px and width should be 0px', () => {
      render(
        <Line
          transitionDuration={0}
          order={0}
          expandVertically={false}
          height="25px"
          width="25px"
        />
      );
      const LineElement = screen.getByTestId('line');
      expect(LineElement).toHaveStyle('width: 0');
      expect(LineElement).toHaveStyle('height: 25px');
    });
  });
});
