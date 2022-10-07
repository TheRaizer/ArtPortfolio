import { useRef } from 'react';
import { motion } from 'framer-motion';
import { MenuToggle } from './MenuToggle';
import { NavArea } from './NavArea';
import { visibilityStates } from '../../../constants/framerMotionStates';
import styled from 'styled-components';
import { useRecoilState } from 'recoil';
import { mobileNavIsOpenSelector } from '../../../recoil/selectors/mobileNavSelector';
import { NavbarProps } from '../../../../types/components/Nav/Navbar.type';

const Styled = {
  MobileNavContainer: styled(motion.nav)`
    position: fixed;
    width: 100%;
    height: 50px;
  `,
};

export const MobileNav = ({ children, className }: NavbarProps) => {
  const [mobileNavIsOpen, setMobileNavIsOpen] = useRecoilState(
    mobileNavIsOpenSelector
  );
  const containerRef = useRef(null);

  return (
    <Styled.MobileNavContainer
      className={className}
      initial={false}
      animate={
        mobileNavIsOpen ? visibilityStates.animate : visibilityStates.initial
      }
      custom={1000}
      ref={containerRef}
    >
      <MenuToggle toggle={() => setMobileNavIsOpen(!mobileNavIsOpen)} />
      <NavArea>{children}</NavArea>
    </Styled.MobileNavContainer>
  );
};
