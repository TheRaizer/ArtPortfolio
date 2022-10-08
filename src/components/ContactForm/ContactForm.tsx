import { motion, Variants } from 'framer-motion';
import { StatusCodes } from 'http-status-codes';
import { ReactElement, useCallback, useMemo, useState } from 'react';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { DimensionProps } from '../../../types/Dimension.type';
import { SendInquiryEmailBody } from '../../../types/pages/api/send-inquiry-email.type';
import { ViewportStates } from '../../../types/recoil/atoms/appConfig.type';
import { DetailData } from '../../../types/utils/api.type';
import { appConfigState } from '../../recoil/atoms/appConfig';
import { fetchNextAPI } from '../../utils/api';
import { emitErrorToast } from '../../utils/toast';
import { Col } from '../common/Col';
import { FormInput } from './FormInput';

enum EmailState {
  INITIAL = 'initial',
  SENDING = 'sending',
  SENT = 'sent',
}

const Styled = {
  ButtonContainer: styled.div`
    width: 150px;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
  `,
  SubmitButton: styled(motion.button)<DimensionProps & { $state: EmailState }>`
    width: ${({ width }) => width};
    height: ${({ height }) => height};
    border-radius: 3px;
    background-color: ${({ $state }) =>
      $state !== EmailState.INITIAL ? 'gray' : 'black'};
    pointer-events: ${({ $state }) => $state !== EmailState.INITIAL && 'none'};

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
  tap: {
    scale: 0.9,
    transition: {
      duration: 0.2,
      type: 'spring',
    },
  },
};

/**
 * The RegExp pattern that emails should follow if they are valid.
 */
const pattern = new RegExp(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(.\w{2,3})+$/);

export const ContactForm = (): ReactElement => {
  const { viewportState } = useRecoilValue(appConfigState);
  const [emailState, setEmailState] = useState(EmailState.INITIAL);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const animation = useMemo(
    () => (emailState !== EmailState.INITIAL ? 'initial' : 'tap'),
    [emailState]
  );
  const buttonText = useMemo(() => {
    switch (emailState) {
      case EmailState.INITIAL:
        return 'Submit';
      case EmailState.SENDING:
        return 'Sending...';
      case EmailState.SENT:
        return 'Sent!';
    }
  }, [emailState]);

  const submitAction = useCallback(() => {
    if (!name || !email || !message) {
      emitErrorToast('There is a missing field');
      return;
    }

    if (!pattern.test(email)) {
      emitErrorToast('Not a valid email');
      return;
    }

    // should change from submit to sending state
    setEmailState(EmailState.SENDING);

    fetchNextAPI<DetailData, SendInquiryEmailBody>(
      'send-inquiry-email',
      'POST',
      { sender_name: name, email, message }
    )
      .then(({ data, res }) => {
        // if successful change from sending state to sent state
        if (data.ok) setEmailState(EmailState.SENT);
        else if (res.status === StatusCodes.TOO_MANY_REQUESTS)
          emitErrorToast(
            'Please wait a moment before submitting another message'
          );
        else if (data.detail) emitErrorToast(data.detail);

        // if message sending failed, reset email state
        if (!data.ok) setEmailState(EmailState.INITIAL);
      })
      .catch((err) => console.error(err));
  }, [email, message, name]);

  return (
    <Col gap="20px">
      <FormInput
        setText={setName}
        label="Name (required)"
        width="300px"
        height="33px"
        fontSize="15px"
        labelSize="14px"
      />
      <FormInput
        setText={setEmail}
        label="Email (required)"
        width="300px"
        height="33px"
        fontSize="15px"
        labelSize="14px"
      />
      <FormInput
        setText={setMessage}
        label="Message (required)"
        width={viewportState !== ViewportStates.DESKTOP ? '300px' : '600px'}
        height="30vh"
        fontSize="15px"
        labelSize="14px"
        isTextArea={true}
      />
      <Styled.ButtonContainer>
        <Styled.SubmitButton
          initial="initial"
          whileTap={animation}
          onClick={submitAction}
          variants={submitButtonVariants}
          width="150px"
          height="50px"
          $state={emailState}
        >
          {buttonText}
        </Styled.SubmitButton>
      </Styled.ButtonContainer>
    </Col>
  );
};
