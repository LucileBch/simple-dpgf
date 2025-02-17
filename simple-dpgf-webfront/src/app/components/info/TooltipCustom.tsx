import { Tooltip } from "@mui/material";
import { ReactElement } from "react";

interface IProps {
  children: ReactElement;
  title: string;
  placement?:
    | "top"
    | "right"
    | "bottom"
    | "left"
    | "bottom-end"
    | "bottom-start"
    | "left-end"
    | "left-start"
    | "right-end"
    | "right-start"
    | "top-end"
    | "top-start"
    | undefined;
}

export default function TooltipCustom({
  children,
  title,
  placement = "left",
}: Readonly<IProps>): JSX.Element {
  return (
    <Tooltip arrow title={title} placement={placement}>
      <span>{children}</span>
    </Tooltip>
  );
}
