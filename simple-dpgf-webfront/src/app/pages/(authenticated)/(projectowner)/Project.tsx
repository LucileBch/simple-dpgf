import DownloadIcon from "@mui/icons-material/Download";
import React, { useCallback, useContext } from "react";
import NavBar from "../../../components/navbar/NavBar";
import TitleH2 from "../../../components/typographies/TitleH2";
import { DpgfContext } from "../../../core/contexts/dpgf-context";
import { Box, Grid2, Table, TableBody, Tooltip } from "@mui/material";
import StatusSelectInput from "../../../components/inputs/StatusSelectInput";
import TooltipCustom from "../../../components/info/TooltipCustom";
import OutlinedButton from "../../../components/buttons/OutlinedButton";
import { DialogContext } from "../../../core/contexts/dialog-context";
import LotCreationDialog from "../../../components/modals/LotCreationDialog";
import LotCard from "../../../components/cards/LotCard";
import ProductTableHead from "../../../components/table/ProductTableHead";
import ProductRow from "../../../components/table/ProductRow";
import CircularLoadingPage from "../../../components/progress/CircularLoadingPage";
import TitleH3 from "../../../components/typographies/TitleH3";
import { theme } from "../../../styles/theme";
import { generatePdf } from "../../../core/services/generate-pdf";
import PageContainerSpace from "../../../components/containers/PageContainerSpace";

export default function Project(): React.JSX.Element {
  const {
    dpgf,
    lotList,
    productList,
    isDpgfLoading,
    isLotListLoading,
    isProductListLoading,
  } = useContext(DpgfContext);
  const { setIsCreateDialogOpen } = useContext(DialogContext);

  const handleOpenCreateDialog = useCallback(() => {
    setIsCreateDialogOpen(true);
  }, [setIsCreateDialogOpen]);

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
      <PageContainerSpace>
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
                <Box>
                  <OutlinedButton
                    label="Ajouter un lot"
                    onClick={handleOpenCreateDialog}
                  />
                  <LotCreationDialog dialogTitle="Ajouter un nouveau lot" />
                </Box>
                <TooltipCustom title="Mettre à jour le status du projet">
                  <StatusSelectInput label={dpgf.dpgfStatus} />
                </TooltipCustom>
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
                      <LotCard lot={lot} />
                      {filteredProducts && filteredProducts.length > 0 && (
                        <Table>
                          <ProductTableHead />
                          {filteredProducts.map((product) => (
                            <TableBody key={product.id}>
                              <ProductRow product={product} />
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
      </PageContainerSpace>
    </>
  );
}
