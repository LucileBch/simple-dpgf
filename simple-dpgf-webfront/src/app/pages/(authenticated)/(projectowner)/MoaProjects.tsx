import NavigationButton from "../../../components/buttons/NavigationButton";
import PageContainer from "../../../components/containers/PageContainer";
import NavBar from "../../../components/NavBar";
import TitleH2 from "../../../components/typographies/TitleH2";

export default function MoaProjects(): JSX.Element {
  return (
    <PageContainer>
      <NavBar />
      <TitleH2>Mes projets</TitleH2>
      {/* affichage de tout les projets et leur statut*/}
      {/* au click sur un projet => page de SYNTHESE d'un projet avec bouton "modifier" qui renvoie à la page de modif du projet*/}

      {/* FAIRE une modale pour rentre les premières infos projet puis naviguer à la page du projet */}
      <NavigationButton label="Créer un projet" />
    </PageContainer>
  );
}
