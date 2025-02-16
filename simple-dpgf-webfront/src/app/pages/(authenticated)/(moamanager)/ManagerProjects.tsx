import { useContext } from "react";
import PageContainer from "../../../components/containers/PageContainer";
import NavBar from "../../../components/NavBar";
import TitleH2 from "../../../components/typographies/TitleH2";
import { OrganizationContext } from "../../../core/contexts/organization-context";
import { Typography } from "@mui/material";

export default function ManagerProjects(): JSX.Element {
  const { organization } = useContext(OrganizationContext);
  return (
    <PageContainer>
      <NavBar />
      <TitleH2>Gestion des projets</TitleH2>

      {/* display tous les projets de l'organisation */}

      {/* au click voir tous les membres de l'orga  avec statut de l'invit pending, consumed et possibilité d'annuler ou supprimer ...*/}
      {/* bouton envoie invitation avec status invitation */}

      {/* display tous les projets + status du projet en cours... */}
      {/* au click sur un projet voir la page extrait pdf */}

      {/* {isOrganizationListLoading ? (
        <CircularLoadingPage />
      ) : (
        <Grid2 container spacing={2}>
          {organizationList.length === 0 ? (
            <Typography>Il n'y a pas encore d'organisation</Typography>
          ) : (
            organizationList.map((organization) => {
              return (
                <Grid2 size={4} key={organization.id}>
                  {/* projects cards */}
      {/* </Grid2>
              );
            })
          )}
        </Grid2>
      )} */}
      <Typography sx={{ textAlign: "end" }}>
        Nombre de licenses projets consommées :{" "}
        {organization?.projectLicenseCounter} /{" "}
        {organization?.maxProjectLicenseCounter}
      </Typography>
    </PageContainer>
  );
}
