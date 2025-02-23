import { AdminOrganizationContext } from "../../../core/contexts/admin-organization-context";
import OrganizationCard from "../../../components/cards/OrganizationCard";
import { Grid2, Typography } from "@mui/material";
import { useContext } from "react";
import NavBar from "../../../components/NavBar";
import PageContainer from "../../../components/containers/PageContainer";
import TitleH2 from "../../../components/typographies/TitleH2";
import CircularLoadingPage from "../../../components/progress/CircularLoadingPage";

export default function AdminOrganizations(): JSX.Element {
  const { organizationList, isOrganizationListLoading } = useContext(
    AdminOrganizationContext
  );

  return (
    <>
      <NavBar />
      <PageContainer>
        <TitleH2>Gestion des organisations</TitleH2>
        {isOrganizationListLoading ? (
          <CircularLoadingPage />
        ) : (
          <Grid2 container spacing={2}>
            {organizationList.length === 0 ? (
              <Typography>Il n'y a pas encore d'organisation</Typography>
            ) : (
              organizationList.map((organization) => {
                return (
                  <Grid2 size={4} key={organization.id}>
                    <OrganizationCard organization={organization} />
                  </Grid2>
                );
              })
            )}
          </Grid2>
        )}
      </PageContainer>
    </>
  );
}
