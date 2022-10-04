import { ReactElement, useMemo } from 'react';
import { motion, Variants } from 'framer-motion';
import styled from 'styled-components';
import Link from 'next/link';
import { NavItemProps } from '../../../../types/Nav/NavItem.type';
import { visibilityStates } from '../../../constants/framerMotionStates';
import { navItemAnimations } from '../navItemAnimation';

const Styled = {
  NavText: styled(motion.a)`
    font-size: 20px;
    color: white;
    text-decoration: none;
  `,
};

const navItemVariants: Variants = {
  [visibilityStates.initial]: {
    opacity: 0,
    y: -20,
  },
  [visibilityStates.animate]: {
    y: 0,
    opacity: 1,
  },
};

/**
 * A item that exists within the NavBar
 */
export const DesktopNavItem = ({
  href,
  children,
  initialOpacity,
}: NavItemProps): ReactElement => {
  const navItemAnimation = useMemo(
    () => navItemAnimations(initialOpacity),
    [initialOpacity]
  );

  return (
    <motion.li variants={navItemVariants}>
      <Link href={href} passHref>
        <Styled.NavText {...navItemAnimation}>{children}</Styled.NavText>
      </Link>
    </motion.li>
  );
};
