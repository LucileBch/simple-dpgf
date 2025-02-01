import NavBar from "../../components/NavBar";

import { Container } from "@mui/material";

export default function UserProfile(): JSX.Element {
  //   const navigate = useNavigate();

  //const { user } = useContext(UserContext);

  //   useEffect(() => {
  //     if (!user) {
  //       return;
  //     }

  //     let targetPage = null;

  //     switch (user.role) {
  //       case RoleEnum.ADMIN:
  //         targetPage = pagesUrl.ADMIN_ORGANIZATIONS_PAGE;
  //         break;
  //       case RoleEnum.ORGANIZATION_MANAGER:
  //         targetPage = pagesUrl.MOA_MANAGER_DASHBOARD_PAGE;
  //         break;
  //       case RoleEnum.PROJECT_OWNER:
  //         targetPage = pagesUrl.MOA_DASHBOARD_PAGE;
  //         break;
  //       default:
  //         removeCookies();
  //         removeUserFromLocalStorage();
  //         targetPage = pagesUrl.SIGN_IN_PAGE;
  //     }

  //     if (targetPage && window.location.pathname !== targetPage) {
  //       navigate(targetPage);
  //     }
  //   }, [navigate, user]);

  return (
    <Container
      maxWidth="lg"
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        p: 1,
        backgroundColor: "cyan",
      }}
    >
      <NavBar />
      <p>Profile page </p>
      {/* <CircularProgress /> */}
    </Container>
  );
}
