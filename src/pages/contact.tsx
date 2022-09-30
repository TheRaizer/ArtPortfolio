import { NextPage } from 'next';
import Head from 'next/head';
import styled from 'styled-components';
import Image from 'next/image';
import { Socials } from '../components/Socials';
import { ContactForm } from '../components/ContactForm/ContactForm';

export const Styled = {
  Container: styled.section`
    width: var(--vw-no-scrollbar);
    height: 100vh;
    position: relative;
  `,
  Header: styled.h2`
    z-index: 1;
    color: black;
    position: absolute;
    font-size: 50px;
    left: 15%;
    top: 13%;
  `,
  ContactFormContainer: styled.div`
    z-index: 2;
    position: absolute;
    left: 15%;
    top: 25%;
  `,
  SocialsContainer: styled.div`
    z-index: 1;
    width: 100%;
    height: 100%;
    position: absolute;
    display: flex;
    align-items: flex-end;
    justify-content: flex-end;
    padding-right: 10px;
    padding-bottom: 10px;
  `,
};

const Contact: NextPage = () => {
  return (
    <>
      <Head>
        <title>Gabriella Joan</title>
        <meta name="description" content="Gabriella Joan's art portfolio" />
      </Head>
      <Styled.Container>
        <Image
          alt="Galaxy"
          src="/images/DesertPlanet_BG.png"
          layout="fill"
          objectFit="cover"
          priority={true}
        />
        <Styled.Header>Inquiries</Styled.Header>
        <Styled.ContactFormContainer>
          <ContactForm />
        </Styled.ContactFormContainer>
        <Styled.SocialsContainer>
          <Socials />
        </Styled.SocialsContainer>
      </Styled.Container>
    </>
  );
};

export default Contact;
