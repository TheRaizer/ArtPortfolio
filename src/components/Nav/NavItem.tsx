import { ReactElement } from 'react';
import { motion, Variants } from 'framer-motion';
import styled from 'styled-components';
import Link from 'next/link';
import { NavItemProps } from '../../../types/Nav/NavItem.type';
import { visibilityStates } from '../../constants/framerMotionStates';

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

export const NavItem = ({
  href,
  children,
  initialOpacity,
}: NavItemProps): ReactElement => {
  return (
    <motion.div variants={navItemVariants}>
      <Link href={href} passHref>
        {/* While hover is applied 1 level deeper then the staggered child component because 
        staggered children + whileHover, is a mess. */}
        <Styled.NavText
          initial={{
            opacity: initialOpacity === undefined ? 0.3 : initialOpacity,
          }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.25 }}
        >
          {children}
        </Styled.NavText>
      </Link>
    </motion.div>
  );
};
