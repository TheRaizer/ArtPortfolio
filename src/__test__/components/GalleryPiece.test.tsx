import { screen } from '@testing-library/react';
import React from 'react';
import { GalleryPiece } from '../../components/GalleryPiece';
import { render } from '../utils/custom-renderer';
import 'jest-styled-components';

// eslint-disable-next-line @typescript-eslint/no-unsafe-return
jest.mock('framer-motion', () => ({
  ...jest.requireActual('framer-motion'),
  motion: {
    div: jest.fn().mockImplementation(({ children }) => <div>{children}</div>),
  },
}));

describe('GalleryPiece', () => {
  it('should render correctly', () => {
    render(<GalleryPiece src="/some-src" />);

    const GalleryPieceElement = screen.getByAltText('art piece');

    expect(GalleryPieceElement).toBeVisible();
    expect(GalleryPieceElement).toHaveStyleRule('width', '400px');
  });
});
