import { MarginProps } from '../Margins.type';
import { PositionProps } from '../Position.type';

export type TimeLineProps = {
  /**
   * Whether the given timeline element should animate vertically or horizontally.
   */
  expandVertically?: boolean;
  /**
   * How long it takes for the animation to complete.
   */
  transitionDuration: number;
  /**
   * How long before the animation starts when triggered.
   */
  transitionDelay?: number;

  // the position of this timeline component in the timeline starting at 0
  order: number;
} & PositionProps &
  MarginProps;
