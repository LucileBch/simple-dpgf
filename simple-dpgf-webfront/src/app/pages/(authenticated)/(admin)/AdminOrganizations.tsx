import { OrganizationContext } from "../../../core/contexts/organization-context";
import OrganizationCard from "../../../components/cards/OrganizationCard";
import { Typography } from "@mui/material";
import { useContext } from "react";
import NavBar from "../../../components/NavBar";
import PageContainer from "../../../components/containers/PageContainer";
import TitleH2 from "../../../components/typographies/TitleH2";
import CircularLoadingPage from "../../../components/progress/CircularLoadingPage";

export default function AdminOrganizations(): JSX.Element {
  const { organizationList, isOrganizationListLoading } =
    useContext(OrganizationContext);

  return (
    <PageContainer>
      <NavBar />
      <TitleH2>Gestion des organisations</TitleH2>
      {isOrganizationListLoading ? (
        <CircularLoadingPage />
      ) : (
        <>
          {organizationList.length === 0 || organizationList === undefined ? (
            <Typography>Il n'y a pas encore d'organisation</Typography>
          ) : (
            organizationList.map((organization) => {
              return (
                <OrganizationCard
                  key={organization.id}
                  organization={organization}
                />
              );
            })
          )}
        </>
      )}
    </PageContainer>
  );
}
