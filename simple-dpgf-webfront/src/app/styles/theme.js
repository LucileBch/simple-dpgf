import { createTheme } from "@mui/material/styles";
import "@fontsource/pt-serif";
import "@fontsource/roboto-condensed";
export const theme = createTheme({
    // Customize typography
    typography: {
        h1: {
            fontFamily: "'PT Serif',Roboto, sans-serif",
            fontWeight: 600,
            fontSize: "24px",
        },
        h2: {
            fontFamily: "'PT Serif',Roboto, sans-serif",
            fontWeight: 600,
            fontSize: "20px",
        },
        h3: {
            fontFamily: "'PT Serif',Roboto, sans-serif",
            fontWeight: "bold",
            fontSize: "16px",
        },
        body1: {
            fontFamily: "'Roboto Condensed', Arial, sans-serif",
            fontWeight: 400,
            fontSize: "13px",
        },
    },
    // Customize color palette
    palette: {
        primary: {
            main: "#0d5c63",
        },
        secondary: {
            main: "#44a1a0",
        },
        text: {
            primary: "#000000",
            secondary: "#0d5c63",
        },
        error: {
            main: "#A30015",
            contrastText: "rgba(163, 0, 21, 0.4)",
        },
        success: {
            main: "#104911",
            contrastText: "rgba(16, 73, 17, 0.5)",
        },
        background: {
            default: "#ffffff",
            paper: "#dfe3e8",
        },
    },
    // customize components
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    fontFamily: "'Roboto Condensed', Arial, sans-serif",
                    fontWeight: 600,
                    color: "fffffa",
                },
            },
        },
        MuiTextField: {
            styleOverrides: {
                root: {
                    "& .MuiInputBase-root": {
                        backgroundColor: "#ffffff", // Couleur de fond de l'input
                    },
                },
            },
        },
        MuiDialogTitle: {
            styleOverrides: {
                root: {
                    fontFamily: "'PT Serif',Roboto, sans-serif",
                },
            },
        },
        MuiSelect: {
            styleOverrides: {
                root: {
                    color: "#0d5c63", // Change la couleur du texte sélectionné
                    "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#424242", // Change la couleur de la bordure
                    },
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#0d5c63", // Couleur de bordure au hover
                    },
                },
            },
        },
        MuiMenuItem: {
            styleOverrides: {
                root: {
                    color: "#424242", // Couleur des options dans le menu déroulant
                    "&:hover": {
                        backgroundColor: "#44a1a0", // Couleur de fond au hover
                    },
                },
            },
        },
        MuiTooltip: {
            styleOverrides: {
                tooltip: {
                    backgroundColor: "rgba(13, 92, 99, 0.8) ",
                    fontWeight: "bold",
                },
                arrow: {
                    color: "rgba(13, 92, 99, 0.8)",
                },
            },
        },
        MuiPagination: {
            styleOverrides: {
                ul: {
                    justifyContent: "center",
                },
            },
        },
        MuiPaginationItem: {
            styleOverrides: {
                root: {
                    "&.Mui-selected": {
                        backgroundColor: "rgba(13, 92, 99, 0.8)",
                        color: "white",
                    },
                },
            },
        },
    },
});
