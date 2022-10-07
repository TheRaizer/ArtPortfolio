import { screen } from '@testing-library/react';
import React from 'react';
import { GallerySection } from '../../../components/IndexPageSections/GallerySection';
import { render } from '../../test-utils/custom-renderer';

describe('AboutSection', () => {
  it('should render properly', () => {
    render(<GallerySection />);

    expect(screen.getByText(/gallery/i)).toBeVisible();
  });
});
