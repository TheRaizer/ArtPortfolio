import { motion, Variants } from 'framer-motion';
import Link from 'next/link';
import { useMemo } from 'react';
import { useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import { NavItemProps } from '../../../../types/Nav/NavItem.type';
import { visibilityStates } from '../../../constants/framerMotionStates';
import { mobileNavIsOpenSelector } from '../../../recoil/selectors/mobileNavSelector';
import { navItemAnimations } from '../navItemAnimation';

const Styled = {
  NavText: styled(motion.a)`
    font-size: 36px;
    color: black;
  `,
};

const navItemVariants: Variants = {
  [visibilityStates.animate]: {
    opacity: 1,
    pointerEvents: 'all',
  },
  [visibilityStates.initial]: {
    opacity: 0,
    pointerEvents: 'none',
  },
};

export const MobileNavItem = ({
  href,
  children,
  initialOpacity,
}: NavItemProps) => {
  const setMobileNavIsOpen = useSetRecoilState(mobileNavIsOpenSelector);
  const navItemAnimation = useMemo(
    () => navItemAnimations(initialOpacity),
    [initialOpacity]
  );

  return (
    <motion.li variants={navItemVariants}>
      <Link href={href} passHref>
        <Styled.NavText
          {...navItemAnimation}
          onClick={() => setMobileNavIsOpen(false)}
        >
          {children}
        </Styled.NavText>
      </Link>
    </motion.li>
  );
};
