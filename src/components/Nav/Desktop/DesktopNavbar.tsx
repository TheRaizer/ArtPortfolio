import { motion } from 'framer-motion';
import { ReactElement } from 'react';
import styled from 'styled-components';
import { NavbarProps } from '../../../../types/Nav/Navbar.type';
import { visibilityStates } from '../../../constants/framerMotionStates';

const Styled = {
  NavbarContainer: styled(motion.ul)`
    display: flex;
    position: absolute;
    right: 5%;
    top: 30px;
    gap: 45px;
  `,
};

export const DesktopNavbar = ({
  children,
  delay,
  className,
}: NavbarProps): ReactElement => {
  return (
    <nav>
      <Styled.NavbarContainer
        className={className}
        transition={{
          staggerChildren: 0.25,
          delayChildren: delay ? 0.8 : 0,
        }}
        {...visibilityStates}
      >
        {children}
      </Styled.NavbarContainer>
    </nav>
  );
};
