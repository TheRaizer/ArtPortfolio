import { Dispatch, ReactElement, SetStateAction } from 'react';
import styled, { css } from 'styled-components';
import { DimensionProps } from '../../../types/Dimension.type';

const inputFieldCSS = css<FormInputProps>`
  border: 1px solid var(--gray-2);
  border-radius: 3px;
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  font-size: ${({ fontSize }) => fontSize};

  transition: border 150ms ease-in;

  &:focus {
    border: 2px solid var(--gray-10);
  }
`;

const Styled = {
  InputContainer: styled.div`
    display: flex;
    flex-direction: column;
  `,
  InputLabel: styled.p<{ labelSize: string }>`
    color: black;
    font-size: ${({ labelSize }) => labelSize};
  `,
  InputField: styled.input<FormInputProps>`
    ${inputFieldCSS}
  `,
  TextArea: styled.textarea<FormInputProps>`
    ${inputFieldCSS}
  `,
};

export type FormInputProps = {
  label: string;
  labelSize: string;
  fontSize: string;
  isTextArea?: boolean;
  setText: Dispatch<SetStateAction<string>>;
} & DimensionProps;

export const FormInput = ({
  label,
  ...props
}: FormInputProps): ReactElement => {
  return (
    <Styled.InputContainer>
      <Styled.InputLabel labelSize={props.labelSize}>{label}</Styled.InputLabel>
      {props.isTextArea ? (
        <Styled.TextArea
          label={label}
          {...props}
          onChange={(evt) => props.setText(evt.target.value)}
        />
      ) : (
        <Styled.InputField
          label={label}
          {...props}
          onChange={(evt) => props.setText(evt.target.value)}
        />
      )}
    </Styled.InputContainer>
  );
};
