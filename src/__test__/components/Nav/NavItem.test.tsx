import { screen } from '@testing-library/react';
import React from 'react';
import { NavItem } from '../../../components/Nav/NavItem';
import { render } from '../../utils/custom-renderer';

describe('NavItem', () => {
  it('should render with the correct text', () => {
    const texts = ['Navigation', 'Other'];

    texts.forEach((text) => {
      render(
        <NavItem href={'some-link'} initialOpacity={1}>
          {text}
        </NavItem>
      );

      expect(screen.getByRole('link', { name: text })).toBeInTheDocument();
    });
  });

  it('should be created with the correct link', () => {
    const hrefs = ['some-link', 'other-link'];

    hrefs.forEach((href) => {
      render(
        <NavItem href={href} initialOpacity={1}>
          {href}
        </NavItem>
      );

      expect(screen.getByRole('link', { name: href })).toHaveAttribute(
        'href',
        '/' + href
      );
    });
  });

  it('should be invisible if initial opacity is set to 0', () => {
    render(
      <NavItem href={'href'} initialOpacity={0}>
        Test
      </NavItem>
    );

    expect(screen.getByRole('link', { name: 'Test' })).not.toBeVisible();
  });
});
