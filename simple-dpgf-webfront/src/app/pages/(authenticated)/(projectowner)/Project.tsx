import { useCallback, useContext } from "react";
import PageContainer from "../../../components/containers/PageContainer";
import NavBar from "../../../components/NavBar";
import TitleH2 from "../../../components/typographies/TitleH2";
import { DpgfContext } from "../../../core/contexts/dpgf-context";
import { Box, Table, TableBody } from "@mui/material";
import StatusSelectInput from "../../../components/inputs/StatusSelectInput";
import TooltipCustom from "../../../components/info/TooltipCustom";
import OutlinedButton from "../../../components/buttons/OutlinedButton";
import { DialogContext } from "../../../core/contexts/dialog-context";
import LotCreationDialog from "../../../components/modals/LotCreationDialog";
import LotCard from "../../../components/cards/LotCard";
import ProductTableHead from "../../../components/table/ProductTableHead";
import ProductRow from "../../../components/table/ProductRow";
import CircularLoadingPage from "../../../components/progress/CircularLoadingPage";

export default function Project(): JSX.Element {
  const { dpgf, lotList, productList, isLotListLoading, isProductListLoading } =
    useContext(DpgfContext);
  const { setIsCreateDialogOpen } = useContext(DialogContext);

  const handleOpenCreateDialog = useCallback(() => {
    setIsCreateDialogOpen(true);
  }, [setIsCreateDialogOpen]);

  console.log("produit", productList);

  if (isLotListLoading && isProductListLoading) {
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
              <TitleH2>{dpgf?.name}</TitleH2>
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
                            <TableBody>
                              <ProductRow key={product.id} product={product} />
                            </TableBody>
                          ))}
                        </Table>
                      )}
                    </Box>
                  );
                })}
          </>
        )}
      </PageContainer>
    </>
  );
}
