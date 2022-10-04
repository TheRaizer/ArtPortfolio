import { ReactElement, useEffect, useMemo } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { ViewportStates } from '../../../types/recoil/atoms/appConfig.type';
import { Pages } from '../../constants/pages';
import { appConfigState } from '../../recoil/atoms/appConfig';
import { mobileNavIsOpenSelector } from '../../recoil/selectors/mobileNavSelector';
import { DesktopNavbar } from './Desktop/DesktopNavbar';
import { DesktopNavItem } from './Desktop/DesktopNavItem';
import { MobileNav } from './Mobile/MobileNav';
import { MobileNavItem } from './Mobile/MobileNavItem';

export const Navbar = ({
  page,
  className,
}: {
  page: Pages;
  className?: string;
}): ReactElement => {
  const { viewportState } = useRecoilValue(appConfigState);
  const setMobileNavIsOpen = useSetRecoilState(mobileNavIsOpenSelector);

  const NavComponent = useMemo(
    () =>
      viewportState === ViewportStates.MOBILE ? (
        <MobileNav className={className}>
          <MobileNavItem
            href={'/'}
            initialOpacity={page === Pages.HOME ? 1 : undefined}
          >
            Home
          </MobileNavItem>
          <MobileNavItem href={'/#about'}>About</MobileNavItem>
          <MobileNavItem href={'/#gallery'}>Gallery</MobileNavItem>
          <MobileNavItem
            href={Pages.CONTACT}
            initialOpacity={page === Pages.CONTACT ? 1 : undefined}
          >
            Contact
          </MobileNavItem>
        </MobileNav>
      ) : (
        <DesktopNavbar delay={page !== Pages.CONTACT} className={className}>
          <DesktopNavItem
            href={'/'}
            initialOpacity={page === Pages.HOME ? 1 : undefined}
          >
            Home
          </DesktopNavItem>
          <DesktopNavItem href={'/#about'}>About</DesktopNavItem>
          <DesktopNavItem href={'/#gallery'}>Gallery</DesktopNavItem>
          <DesktopNavItem
            href={Pages.CONTACT}
            initialOpacity={page === Pages.CONTACT ? 1 : undefined}
          >
            Contact
          </DesktopNavItem>
        </DesktopNavbar>
      ),
    [className, page, viewportState]
  );

  useEffect(() => {
    if (viewportState !== ViewportStates.MOBILE) setMobileNavIsOpen(false);
  }, [setMobileNavIsOpen, viewportState]);

  return NavComponent;
};
