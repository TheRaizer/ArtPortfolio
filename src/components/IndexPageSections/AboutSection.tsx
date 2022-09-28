import { motion, Variants } from 'framer-motion';
import { ReactElement } from 'react';
import styled from 'styled-components';
import { ViewportStates } from '../../../types/recoil/atoms/appConfig.type';
import { visibilityStates } from '../../constants/framerMotionStates';
import { useAnimateInViewOnce } from '../../hooks/useAnimateInViewOnce';
import { Col } from '../common/Col';

const Styled = {
  Container: styled.section`
    display: flex;
    padding: 7% 9%;
    width: var(--vw-no-scrollbar);
    height: fit-content;
    background-color: black;
  `,
  Header: styled(motion.h2)`
    width: 70vw;
    max-width: 500px;
    font-size: ${({ theme }) =>
      theme.viewportState !== ViewportStates.DESKTOP ? '30px' : '50px'};
    font-style: italic;
    color: white;
  `,
  Text: styled(motion.p)`
    font-size: ${({ theme }) =>
      theme.viewportState !== ViewportStates.DESKTOP ? '16px' : '24px'};
    line-height: ${({ theme }) =>
      theme.viewportState !== ViewportStates.DESKTOP ? '20px' : '39px'};
    width: 80vw;
    letter-spacing: 0.1em;
    color: var(--gray-3);
  `,
};

const textVariants: Variants = {
  [visibilityStates.initial]: {
    opacity: 0,
    y: 100,
  },
  [visibilityStates.animate]: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      type: 'spring',
    },
  },
};

export const AboutSection = (): ReactElement => {
  const { ref: headerRef, control: headerControl } = useAnimateInViewOnce(true);
  const { ref: textRef, control: textControl } = useAnimateInViewOnce(true);

  return (
    <Styled.Container id="about">
      <Col gap="30px">
        <Styled.Header
          ref={headerRef}
          initial={visibilityStates.initial}
          animate={headerControl}
          variants={textVariants}
        >
          Gabriella Joan is an artist, illustrator and printmaker.
        </Styled.Header>
        <Styled.Text
          ref={textRef}
          initial={visibilityStates.initial}
          animate={textControl}
          variants={textVariants}
        >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum
          arcu lacus, sagittis vitae neque sit amet, volutpat euismod tellus.
          Proin efficitur rhoncus lorem in lobortis. Phasellus iaculis non orci
          id posuere. Sed efficitur odio in eleifend dignissim. Aenean cursus
          pharetra pellentesque. Donec euismod id lectus et accumsan. Quisque at
          sapien velit. Proin congue nec massa eu congue.
          <br />
          <br />
          Pellentesque lobortismassa metus, ut consectetur augue condimentum
          vel. Nullam porta ac libero non elementum. Fusce faucibus ullamcorper
          neque. Sed porta vulputate justo eget scelerisque. Nunc ultricies urna
          ac tempor varius. Maecenas aliquam iaculis justo, vel interdum tortor
          consequat ac. Donec laoreet accumsan sapien, sit amet posuere nunc
          laoreet et. Mauris id diam diam. Ut euismod faucibus sem non dapibus.
          Nulla non porttitor erat, sed facilisis libero.
        </Styled.Text>
      </Col>
    </Styled.Container>
  );
};
