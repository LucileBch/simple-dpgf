import DownloadIcon from "@mui/icons-material/Download";
import React, { useCallback, useContext } from "react";
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

export default function ProjectSummary(): React.JSX.Element {
  const {
    dpgf,
    lotList,
    productList,
    isDpgfLoading,
    isLotListLoading,
    isProductListLoading,
  } = useContext(DpgfContext);

  const handlePdfExport = useCallback(() => {
    if (dpgf && lotList && productList) {
      generatePdf(dpgf, lotList, productList);
    }
  }, [dpgf, lotList, productList]);

  if (isDpgfLoading || isLotListLoading || isProductListLoading) {
    return <CircularLoadingPage />;
  }

  return (
    <>
      <NavBar />
      <PageContainer>
        {dpgf && (
          <>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <TitleH2>{dpgf.name}</TitleH2>
              <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <ChipStatus label={dpgf.dpgfStatus} />
              </Box>
            </Box>

            {lotList &&
              lotList.length > 0 &&
              lotList
                .slice()
                .sort((a, b) => a.code - b.code)
                .map((lot) => {
                  const filteredProducts = productList?.filter(
                    (product) => product.lotCode === lot.code
                  );

                  return (
                    <Box key={lot.id} sx={{ marginBottom: "10px" }}>
                      <LotCard lot={lot} isManager />
                      {filteredProducts && filteredProducts.length > 0 && (
                        <Table>
                          <ProductTableHead />
                          {filteredProducts.map((product) => (
                            <TableBody key={product.id}>
                              <ProductRow product={product} isManager />
                            </TableBody>
                          ))}
                        </Table>
                      )}
                    </Box>
                  );
                })}
            <Grid2
              sx={{
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
              }}
            >
              <Grid2>
                <TitleH3>Total: </TitleH3>
              </Grid2>
              <Grid2>
                <TitleH3>{dpgf.dpgfTotal.toFixed(2)} €</TitleH3>
              </Grid2>
            </Grid2>
          </>
        )}

        {dpgf &&
          lotList &&
          productList &&
          lotList.length > 0 &&
          productList.length > 0 && (
            <Box
              sx={{ display: "flex", justifyContent: "end", marginTop: "20px" }}
            >
              <Tooltip title="Exporter au format PDF">
                <DownloadIcon
                  onClick={handlePdfExport}
                  sx={{
                    fontSize: "30px",
                    color: theme.palette.secondary.main,
                    cursor: "pointer",
                    "&:hover": { opacity: 0.8 },
                  }}
                />
              </Tooltip>
            </Box>
          )}
      </PageContainer>
    </>
  );
}
