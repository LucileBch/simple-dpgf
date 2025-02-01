import { Card, CardContent, Typography } from "@mui/material";
import { OrganizationDto } from "../../core/dtos/organization/OrganizationDto";
import { useContext } from "react";
import { OrganizationContext } from "../../core/contexts/organization-context";
import { useNavigate } from "react-router-dom";
import { pagesUrl } from "../../core/appConstants";
import { resolveUrl } from "../../core/services/http-service";
import TitleH3 from "../typographies/TitleH3";

type IProps = {
  organization: OrganizationDto;
};

export default function OrganizationCard({
  organization,
}: IProps): JSX.Element {
  const navigate = useNavigate();

  const { setOrganization } = useContext(OrganizationContext);

  function navigateToOrganization(): void {
    if (organization.id !== undefined) {
      setOrganization(organization);
      navigate(resolveUrl(pagesUrl.ADMIN_ORGANIZATION_PAGE, [organization.id]));
    } else {
      console.log("aucune orga");
    }
  }

  return (
    <Card sx={{ maxWidth: 240, minHeight: 200 }}>
      <CardContent onClick={navigateToOrganization} sx={{ cursor: "pointer" }}>
        <TitleH3>{organization.name}</TitleH3>
        <Typography>
          Type d'organisation : {organization.organizationType}
        </Typography>
        <Typography>
          Nombre de licenses utilisateur : {organization.memberLicenseCounter} /{" "}
          {organization.maxMemberLicenseCounter}
        </Typography>
        <Typography>
          Nombre de licenses projet : {organization.projectLicenseCounter} /{" "}
          {organization.maxProjectLicenseCounter}
        </Typography>
      </CardContent>
    </Card>
  );
}
