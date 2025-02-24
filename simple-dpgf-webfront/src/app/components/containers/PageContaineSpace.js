import { jsx as _jsx } from "react/jsx-runtime";
import { Container } from "@mui/material";
export default function PageContainerSpace({ children, }) {
    return (_jsx(Container, { maxWidth: "xl", sx: {
            p: 1,
            minHeight: "calc(100vh - 150px)",
        }, children: children }));
}
