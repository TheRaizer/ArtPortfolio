import { screen, waitFor } from '@testing-library/react';
import React from 'react';
import { HomeSection } from '../../../components/IndexPageSections/HomeSection';
import { render } from '../../test-utils/custom-renderer';

describe('HomeSection', () => {
  it('should render properly', async () => {
    render(<HomeSection />);

    await waitFor(() =>
      expect(
        screen.getByRole('heading', {
          name: /artist name/i,
        })
      ).toBeVisible()
    );
    await waitFor(() =>
      expect(
        screen.getByRole('heading', {
          name: /fine artist \| illustrator \| printmaker/i,
        })
      ).toBeVisible()
    );

    await waitFor(() =>
      expect(screen.getByRole('link', { name: /home/i })).toBeVisible()
    );
    await waitFor(() =>
      expect(screen.getByRole('link', { name: /about/i })).toBeVisible()
    );
    await waitFor(() =>
      expect(screen.getByRole('link', { name: /gallery/i })).toBeVisible()
    );
    await waitFor(() =>
      expect(screen.getByRole('link', { name: /contact/i })).toBeVisible()
    );
  });
});
