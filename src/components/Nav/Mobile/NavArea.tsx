import { motion, Variants } from 'framer-motion';
import { ReactElement, ReactNode } from 'react';
import styled from 'styled-components';
import { visibilityStates } from '../../../constants/framerMotionStates';

const navAreaVariants: Variants = {
  [visibilityStates.initial]: {
    height: 50,
    width: 50,
    top: 15,
    left: 15,
    borderRadius: 50,
    transition: { duration: 0.5, staggerChildren: 0.07, staggerDirection: -1 },
  },
  [visibilityStates.animate]: {
    height: '100vh',
    width: '100%',
    top: 0,
    left: 0,
    borderRadius: 0,
    transition: {
      duration: 0.5,
      staggerChildren: 0.05,
      delayChildren: 0.4,
    },
  },
};

const Styled = {
  NavAreaContainer: styled(motion.ul)`
    opacity: 0.95;
    position: absolute;
    background-color: white;
  `,
  ItemsContainer: styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
    height: 100%;
    padding: 80px 5vw;
  `,
};

export const NavArea = ({
  children,
}: {
  children: ReactNode;
}): ReactElement => (
  <Styled.NavAreaContainer variants={navAreaVariants}>
    <Styled.ItemsContainer>{children}</Styled.ItemsContainer>
  </Styled.NavAreaContainer>
);
