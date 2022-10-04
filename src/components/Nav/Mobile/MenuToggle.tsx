import { motion, SVGMotionProps } from 'framer-motion';
import styled from 'styled-components';
import { visibilityStates } from '../../../constants/framerMotionStates';

const Styled = {
  MenuButton: styled.button`
    position: absolute;
    z-index: 100;
    left: 29px;
    top: 30px;
  `,
};

const Path = (props: SVGMotionProps<SVGPathElement>) => (
  <motion.path
    fill="transparent"
    strokeWidth="3"
    stroke="hsl(0, 0%, 18%)"
    strokeLinecap="round"
    {...props}
  />
);

export const MenuToggle = ({ toggle }: { toggle: () => void }): JSX.Element => (
  <Styled.MenuButton onClick={toggle}>
    <svg width="23" height="23" viewBox="0 0 23 23">
      <Path
        variants={{
          [visibilityStates.initial]: { d: 'M 2 2.5 L 20 2.5' },
          [visibilityStates.animate]: { d: 'M 3 16.5 L 17 2.5' },
        }}
      />
      <Path
        d="M 2 9.423 L 20 9.423"
        variants={{
          [visibilityStates.initial]: { opacity: 1 },
          [visibilityStates.animate]: { opacity: 0 },
        }}
        transition={{ duration: 0.1 }}
      />
      <Path
        variants={{
          [visibilityStates.initial]: { d: 'M 2 16.346 L 20 16.346' },
          [visibilityStates.animate]: { d: 'M 3 2.5 L 17 16.346' },
        }}
      />
    </svg>
  </Styled.MenuButton>
);
