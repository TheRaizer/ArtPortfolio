import type { AppProps } from 'next/app';
import GlobalStyle from '../styles/globalStyles';
import { RecoilRoot, useRecoilValue } from 'recoil';
import Head from 'next/head';
import useMobileTheme from '../hooks/lifecycles/useMobileTheme';
import { ReactElement } from 'react';
import { ViewportStates } from '../../types/recoil/atoms/appConfig.type';
import memoize from 'lodash/memoize';
import { ThemeProvider } from 'styled-components';
import { appConfigState } from '../recoil/atoms/appConfig';

declare module 'styled-components' {
  export interface DefaultTheme {
    viewportState: ViewportStates;
  }
}

// ignore in-browser next/js recoil warnings until its fixed.
const mutedConsole = memoize((console: Console) => ({
  ...console,
  warn: (...args: (string | string[])[]) =>
    args[0].includes('Duplicate atom key') ? null : console.warn(...args),
}));
global.console = mutedConsole(global.console);

const Page = ({ Component, pageProps }: AppProps): ReactElement => {
  const { viewportState } = useRecoilValue(appConfigState);
  useMobileTheme();

  return (
    <ThemeProvider theme={{ viewportState }}>
      <Component {...pageProps} />
    </ThemeProvider>
  );
};

function ArtPortfolioApp(props: AppProps) {
  return (
    <>
      <Head>
        <meta httpEquiv="content-language" content="en" />
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="keywords" content="website, art, portfolio" />
        <meta name="author" content="Aidan Fu" />
        <meta name="publisher" content="Aidan Fu" />
        <meta name="copyright" content="Aidan Fu" />
        <meta name="page-topic" content="Art" />
        <meta name="page-type" content="Art" />
        <meta name="audience" content="Everyone" />
        <meta name="robots" content="index, follow" />
      </Head>
      <GlobalStyle />
      <RecoilRoot>
        <Page {...props} />
      </RecoilRoot>
    </>
  );
}

export default ArtPortfolioApp;
