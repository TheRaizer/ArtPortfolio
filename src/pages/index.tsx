import type { NextPage } from 'next';
import Head from 'next/head';
import { AboutSection } from '../components/IndexPageSections/AboutSection';
import { GallerySection } from '../components/IndexPageSections/GallerySection';
import { HomeSection } from '../components/IndexPageSections/HomeSection';
import { TimelineOverlay } from '../components/Timeline/TimelineOverlay';

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Gabriella Joan</title>
        <meta name="description" content="Gabriella Joan's art portfolio" />
      </Head>
      <HomeSection />
      <AboutSection />
      <GallerySection />
      <TimelineOverlay />
    </>
  );
};

export default Home;
