import { Link } from "react-router-dom";
import { pagesUrl } from "../../../core/appConstants";

export default function ManagerDashboard(): JSX.Element {
  return (
    <div>
      {/* Orgnization manager */}
      <h1>Manager Dashboard MOA</h1>
      {/* au click voir tous les membres de l'orga  avec statut de l'invit pending, consumed et possibilité d'annuler ou supprimer ...*/}
      {/* bouton envoie invitation avec status invitation */}
      <Link to={pagesUrl.MOA_MANAGER_TEAM_PAGE}>
        <button>Equipe</button>
      </Link>
      {/* display tous les projets + status du projet en cours... */}
      {/* au click sur un projet voir la page extrait pdf */}
      <button>Mon profil</button>
    </div>
  );
}
