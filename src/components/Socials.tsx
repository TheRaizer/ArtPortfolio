import { ReactElement } from 'react';
import styled from 'styled-components';
import { AiOutlineInstagram, AiOutlineTwitter } from 'react-icons/ai';
import { RiFacebookCircleLine } from 'react-icons/ri';
import Link from 'next/link';

const Styled = {
  SocialsContainer: styled.div`
    display: flex;
    width: 8.5em;
    align-items: center;
    justify-content: space-around;
  `,
};

export const Socials = (): ReactElement => {
  return (
    <Styled.SocialsContainer>
      <Link href="https://instagram.com" passHref>
        <a>
          <AiOutlineInstagram color="white" size="2.5em" />
        </a>
      </Link>
      <Link href="https://facebook.com" passHref>
        <a>
          <RiFacebookCircleLine color="white" size="2.5em" />
        </a>
      </Link>
      <Link href="https://twitter.com" passHref>
        <a>
          <AiOutlineTwitter color="white" size="2.5em" />
        </a>
      </Link>
    </Styled.SocialsContainer>
  );
};
