import React, { FC, ReactElement } from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { ViewportStates } from '../../../types/recoil/atoms/appConfig.type';
import { RecoilRoot } from 'recoil';

const AllTheProviders: FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <RecoilRoot>
      <ThemeProvider theme={{ viewportState: ViewportStates.DESKTOP }}>
        {children}
      </ThemeProvider>
    </RecoilRoot>
  );
};

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => render(ui, { wrapper: AllTheProviders, ...options });
export * from '@testing-library/react';
export { customRender as render };
