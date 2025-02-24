import { jsx as _jsx } from "react/jsx-runtime";
import { Tooltip } from "@mui/material";
export default function TooltipCustom({ children, title, placement = "left", }) {
    return (_jsx(Tooltip, { arrow: true, title: title, placement: placement, children: _jsx("span", { children: children }) }));
}
