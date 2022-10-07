import { screen } from '@testing-library/react';
import React from 'react';
import { DesktopNavItem } from '../../../../components/Nav/Desktop/DesktopNavItem';
import { render } from '../../../test-utils/custom-renderer';

describe('NavItem', () => {
  it('should render with the correct text', () => {
    const texts = ['Navigation', 'Other'];

    texts.forEach((text) => {
      render(
        <DesktopNavItem href={'some-link'} initialOpacity={1}>
          {text}
        </DesktopNavItem>
      );

      expect(screen.getByRole('link', { name: text })).toBeInTheDocument();
    });
  });

  it('should be created with the correct link', () => {
    const hrefs = ['some-link', 'other-link'];

    hrefs.forEach((href) => {
      render(
        <DesktopNavItem href={href} initialOpacity={1}>
          {href}
        </DesktopNavItem>
      );

      expect(screen.getByRole('link', { name: href })).toHaveAttribute(
        'href',
        '/' + href
      );
    });
  });

  it('should be invisible if initial opacity is set to 0', () => {
    render(
      <DesktopNavItem href={'href'} initialOpacity={0}>
        Test
      </DesktopNavItem>
    );

    expect(screen.getByRole('link', { name: 'Test' })).not.toBeVisible();
  });
});
