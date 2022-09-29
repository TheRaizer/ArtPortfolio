import { motion } from 'framer-motion';
import { ReactElement } from 'react';
import styled from 'styled-components';
import { visibilityStates } from '../../constants/framerMotionStates';
import { NavItem } from './NavItem';

const Styled = {
  NavbarContainer: styled(motion.nav)`
    display: flex;
    position: absolute;
    right: 5%;
    top: 30px;
    gap: 45px;
  `,
};

export const Navbar = (): ReactElement => {
  return (
    <Styled.NavbarContainer
      transition={{
        staggerChildren: 0.25,
        delayChildren: 0.8,
      }}
      {...visibilityStates}
    >
      <NavItem href={'#'} initialOpacity={1}>
        Home
      </NavItem>
      <NavItem href={'#about'}>About</NavItem>
      <NavItem href={'#gallery'}>Gallery</NavItem>
      <NavItem href={'/contact'}>Contact</NavItem>
    </Styled.NavbarContainer>
  );
};
