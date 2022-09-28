import { MarginProps } from '../Margins.type';
import { PositionProps } from '../Position.type';

export type TimeLineProps = {
  // if false or undefined then the circle will expand horizontally
  expandVertically?: boolean;
  transitionDuration: number;
  transitionDelay?: number;

  // the position of this timeline component in the timeline starting at 0
  order: number;
} & PositionProps &
  MarginProps;
