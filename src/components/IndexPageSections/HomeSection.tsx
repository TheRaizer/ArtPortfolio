import { motion, Variants } from 'framer-motion';
import Image from 'next/image';
import { ReactElement } from 'react';
import styled from 'styled-components';
import { ViewportStates } from '../../../types/recoil/atoms/appConfig.type';
import { visibilityStates } from '../../constants/framerMotionStates';
import { Col } from '../common/Col';
import { Navbar } from '../Nav/NavBar';
import { NavItem } from '../Nav/NavItem';

export const Styled = {
  Container: styled.section`
    width: var(--vw-no-scrollbar);
    height: 100vh;
  `,
  HeaderContainer: styled(Col)`
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: absolute;
    top: 37%;
    left: ${({ theme }) =>
      theme.viewportState === ViewportStates.MOBILE ? '5%' : '15%'};
  `,
  ArtistName: styled(motion.h1)`
    font-size: ${({ theme }) =>
      theme.viewportState === ViewportStates.MOBILE ? '50px' : '80px'};
  `,
  ArtistSubtitle: styled(motion.h4)`
    font-size: ${({ theme }) =>
      theme.viewportState === ViewportStates.MOBILE ? '15px' : '20px'};
    font-style: italic;
    color: var(--gray-4);
  `,
  GradientOverlay: styled.div`
    width: 100%;
    height: 100%;
    position: absolute;
    background: linear-gradient(
      180deg,
      rgba(0, 0, 0, 0) 0%,
      #000000 99.99%,
      #000000 100%,
      #ffffff 100%
    );
  `,
};

const headerVariants: Variants = {
  [visibilityStates.initial]: {
    opacity: 0,
  },
  [visibilityStates.animate]: {
    opacity: 1,
  },
};

export const HomeSection = (): ReactElement => {
  return (
    <Styled.Container>
      <Image
        alt="Galaxy"
        src="/images/Home_BG.png"
        layout="fill"
        objectFit="cover"
        priority={true}
      />
      <Styled.GradientOverlay />
      <Styled.HeaderContainer gap={'10px'}>
        <Styled.ArtistName
          {...visibilityStates}
          variants={headerVariants}
          transition={{ duration: 1.5 }}
          title="Artist Name"
        >
          Gabriella Joan
        </Styled.ArtistName>
        <Styled.ArtistSubtitle
          {...visibilityStates}
          variants={headerVariants}
          transition={{ duration: 1.5, delay: 0.5 }}
        >
          Fine Artist | Illustrator | printmaker
        </Styled.ArtistSubtitle>
      </Styled.HeaderContainer>
      <Navbar delay={true}>
        <NavItem href={'#'} initialOpacity={1}>
          Home
        </NavItem>
        <NavItem href={'#about'}>About</NavItem>
        <NavItem href={'#gallery'}>Gallery</NavItem>
        <NavItem href={'/contact'}>Contact</NavItem>
      </Navbar>
    </Styled.Container>
  );
};
