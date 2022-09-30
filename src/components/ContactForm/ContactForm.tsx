import { motion, Variants } from 'framer-motion';
import { ReactElement, useMemo, useState } from 'react';
import styled from 'styled-components';
import { DimensionProps } from '../../../types/Dimension.type';
import { Col } from '../common/Col';
import { FormInput } from './FormInput';

const Styled = {
  ButtonContainer: styled.div`
    width: 150px;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
  `,
  SubmitButton: styled(motion.button)<DimensionProps & { sent: boolean }>`
    width: ${({ width }) => width};
    height: ${({ height }) => height};
    border-radius: 3px;
    background-color: ${({ sent }) => (sent ? 'gray' : 'black')};

    transition: width 200ms linear;
  `,
};

const submitButtonVariants: Variants = {
  initial: {
    scale: 1,
    transition: {
      duration: 0.2,
      type: 'spring',
    },
  },
  sent: {
    scale: 0.9,
    transition: {
      duration: 0.2,
      type: 'spring',
    },
  },
};

export const ContactForm = (): ReactElement => {
  const [sent, setSent] = useState(false);
  const animation = useMemo(() => (sent ? 'initial' : 'sent'), [sent]);
  const buttonText = useMemo(() => (sent ? 'Sent!' : 'Submit'), [sent]);

  return (
    <Col gap="20px">
      <FormInput
        label="Name (required)"
        width="300px"
        height="33px"
        fontSize="15px"
        labelSize="14px"
      />
      <FormInput
        label="Email (required)"
        width="300px"
        height="33px"
        fontSize="15px"
        labelSize="14px"
      />
      <FormInput
        label="Message"
        width="600px"
        height="300px"
        fontSize="15px"
        labelSize="14px"
        isTextArea={true}
      />
      <Styled.ButtonContainer>
        <Styled.SubmitButton
          initial="initial"
          whileTap={animation}
          onClick={() => setSent(true)}
          variants={submitButtonVariants}
          width="150px"
          height="50px"
          sent={sent}
          disabled={sent}
        >
          {buttonText}
        </Styled.SubmitButton>
      </Styled.ButtonContainer>
    </Col>
  );
};
