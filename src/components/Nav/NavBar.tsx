import { motion } from 'framer-motion';
import { ReactNode, ReactElement } from 'react';
import styled from 'styled-components';
import { visibilityStates } from '../../constants/framerMotionStates';

const Styled = {
  NavbarContainer: styled(motion.nav)`
    display: flex;
    position: absolute;
    right: 5%;
    top: 30px;
    gap: 45px;
  `,
};

export const Navbar = ({
  children,
  delay,
  className,
}: {
  children: ReactNode;
  delay?: boolean;
  className?: string;
}): ReactElement => {
  return (
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
  );
};
