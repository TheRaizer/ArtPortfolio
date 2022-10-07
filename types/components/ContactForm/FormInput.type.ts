import { Dispatch, SetStateAction } from "react";
import { DimensionProps } from "../../Dimension.type";

export type FormInputProps = {
  label: string;
  labelSize: string;
  fontSize: string;
  isTextArea?: boolean;
  setText: Dispatch<SetStateAction<string>>;
} & DimensionProps;
