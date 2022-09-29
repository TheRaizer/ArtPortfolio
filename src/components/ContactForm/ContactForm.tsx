import { ReactElement } from 'react';
import { FormInput } from './FormInput';

export const ContactForm = (): ReactElement => {
  return (
    <>
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
        width="400px"
        height="300px"
        fontSize="15px"
        labelSize="14px"
        isTextArea={true}
      />
    </>
  );
};
