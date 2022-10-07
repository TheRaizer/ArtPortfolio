import { waitFor, screen } from '@testing-library/react';
import React from 'react';
import { AboutSection } from '../../../components/IndexPageSections/AboutSection';
import { render } from '../../test-utils/custom-renderer';

/**
 * the useInView hook will always return true so components that use the hook to start
 * animations, will have their animations started as soon as their rendered.
 */
// eslint-disable-next-line @typescript-eslint/no-unsafe-return
jest.mock('framer-motion', () => ({
  ...jest.requireActual('framer-motion'),
  useInView: () => true,
}));

describe('AboutSection', () => {
  it('should render text properly', async () => {
    render(<AboutSection />);

    await waitFor(() =>
      expect(
        screen.getByRole('heading', {
          name: /gabriella joan is an artist, illustrator and printmaker\./i,
        })
      ).toBeVisible()
    );
    await waitFor(() =>
      expect(
        screen.getByText(
          /lorem ipsum dolor sit amet, consectetur adipiscing elit\. vestibulum arcu lacus, sagittis vitae neque sit amet, volutpat euismod tellus\. proin efficitur rhoncus lorem in lobortis\. phasellus iaculis non orci id posuere\. sed efficitur odio in eleifend dignissim\. aenean cursus pharetra pellentesque\. donec euismod id lectus et accumsan\. quisque at sapien velit\. proin congue nec massa eu congue\.pellentesque lobortismassa metus, ut consectetur augue condimentum vel\. nullam porta ac libero non elementum\. fusce faucibus ullamcorper neque\. sed porta vulputate justo eget scelerisque\. nunc ultricies urna ac tempor varius\. maecenas aliquam iaculis justo, vel interdum tortor consequat ac\. donec laoreet accumsan sapien, sit amet posuere nunc laoreet et\. mauris id diam diam\. ut euismod faucibus sem non dapibus\. nulla non porttitor erat, sed facilisis libero\./i
        )
      ).toBeVisible()
    );
  });
});
