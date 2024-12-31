import { Link } from "react-router-dom";
import { pagesUrl } from "../../../core/appConstants";

export default function MoaManagerTeam(): JSX.Element {
  return (
    <div>
      {/* Orgnization manager */}
      <h1>Manager MOA Equipe</h1>
      {/* au click voir tous les membres de l'orga  avec statut de l'invit pending, consumed et possibilité d'annuler ou supprimer ...*/}
      {/* bouton envoie invitation avec status invitation */}
      <Link to={pagesUrl.MOA_MANAGER_TEAM_PAGE}>
        <button>Equipe</button>
      </Link>
      {/* au click voir tous les projets + status du projet en cours... */}
      {/* au click sur un projet voir la page extrait pdf */}
      <Link to={pagesUrl.MOA_MANAGER_DASHBOARD_PAGE}>
        <button>Projets</button>
      </Link>
    </div>
  );
}
