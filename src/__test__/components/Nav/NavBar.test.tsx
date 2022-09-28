import { screen, waitFor } from '@testing-library/react';
import React from 'react';
import { Navbar } from '../../../components/Nav/NavBar';
import { render } from '../../utils/custom-renderer';

describe('NavBar', () => {
  it('should contain the correct sections text', () => {
    render(<Navbar />);

    expect(screen.getByRole('link', { name: /home/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /about/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /gallery/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /contact/i })).toBeInTheDocument();
  });

  describe('Visibility', () => {
    it('should not be visible initially', () => {
      render(<Navbar />);

      expect(screen.getByRole('link', { name: /home/i })).not.toBeVisible();
      expect(screen.getByRole('link', { name: /about/i })).not.toBeVisible();
      expect(screen.getByRole('link', { name: /gallery/i })).not.toBeVisible();
      expect(screen.getByRole('link', { name: /contact/i })).not.toBeVisible();
    });

    it('should become visible', async () => {
      render(<Navbar />);

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
});
