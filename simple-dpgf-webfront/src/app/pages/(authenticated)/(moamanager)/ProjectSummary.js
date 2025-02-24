import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import DownloadIcon from "@mui/icons-material/Download";
import { useCallback, useContext } from "react";
import { DpgfContext } from "../../../core/contexts/dpgf-context";
import { generatePdf } from "../../../core/services/generate-pdf";
import CircularLoadingPage from "../../../components/progress/CircularLoadingPage";
import NavBar from "../../../components/navbar/NavBar";
import PageContainer from "../../../components/containers/PageContainer";
import { Box, Grid2, Table, TableBody, Tooltip } from "@mui/material";
import TitleH2 from "../../../components/typographies/TitleH2";
import ProductTableHead from "../../../components/table/ProductTableHead";
import ProductRow from "../../../components/table/ProductRow";
import LotCard from "../../../components/cards/LotCard";
import TitleH3 from "../../../components/typographies/TitleH3";
import { theme } from "../../../styles/theme";
import ChipStatus from "../../../components/info/ChipStatus";
export default function ProjectSummary() {
    const { dpgf, lotList, productList, isDpgfLoading, isLotListLoading, isProductListLoading, } = useContext(DpgfContext);
    const handlePdfExport = useCallback(() => {
        if (dpgf && lotList && productList) {
            generatePdf(dpgf, lotList, productList);
        }
    }, [dpgf, lotList, productList]);
    if (isDpgfLoading || isLotListLoading || isProductListLoading) {
        return _jsx(CircularLoadingPage, {});
    }
    return (_jsxs(_Fragment, { children: [_jsx(NavBar, {}), _jsxs(PageContainer, { children: [dpgf && (_jsxs(_Fragment, { children: [_jsxs(Box, { sx: {
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "space-between",
                                }, children: [_jsx(TitleH2, { children: dpgf.name }), _jsx(Box, { sx: { display: "flex", alignItems: "center", gap: "10px" }, children: _jsx(ChipStatus, { label: dpgf.dpgfStatus }) })] }), lotList &&
                                lotList.length > 0 &&
                                lotList
                                    .slice()
                                    .sort((a, b) => a.code - b.code)
                                    .map((lot) => {
                                    const filteredProducts = productList?.filter((product) => product.lotCode === lot.code);
                                    return (_jsxs(Box, { sx: { marginBottom: "10px" }, children: [_jsx(LotCard, { lot: lot, isManager: true }), filteredProducts && filteredProducts.length > 0 && (_jsxs(Table, { children: [_jsx(ProductTableHead, {}), filteredProducts.map((product) => (_jsx(TableBody, { children: _jsx(ProductRow, { product: product, isManager: true }) }, product.id)))] }))] }, lot.id));
                                }), _jsxs(Grid2, { sx: {
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "space-between",
                                    paddingX: "10px",
                                    border: "solid",
                                    borderWidth: "1px",
                                    borderColor: theme.palette.primary.main,
                                    borderRadius: "5px",
                                    width: "100%",
                                    backgroundColor: theme.palette.background.paper,
                                }, children: [_jsx(Grid2, { children: _jsx(TitleH3, { children: "Total: " }) }), _jsx(Grid2, { children: _jsxs(TitleH3, { children: [dpgf.dpgfTotal.toFixed(2), " \u20AC"] }) })] })] })), dpgf &&
                        lotList &&
                        productList &&
                        lotList.length > 0 &&
                        productList.length > 0 && (_jsx(Box, { sx: { display: "flex", justifyContent: "end", marginTop: "20px" }, children: _jsx(Tooltip, { title: "Exporter au format PDF", children: _jsx(DownloadIcon, { onClick: handlePdfExport, sx: {
                                    fontSize: "30px",
                                    color: theme.palette.secondary.main,
                                    cursor: "pointer",
                                    "&:hover": { opacity: 0.8 },
                                } }) }) }))] })] }));
}
