export var LotEnum;
(function (LotEnum) {
    LotEnum["VRD_1"] = "VRD_1";
    LotEnum["FONDATION_2"] = "FONDATION_2";
    LotEnum["SUPERSTRUCTURE_3"] = "SUPERSTRUCTURE_3";
    LotEnum["CHARPENTE_4"] = "CHARPENTE_4";
    LotEnum["CLOISONNEMENT_5"] = "CLOISONNEMENT_5";
    LotEnum["FACADE_6"] = "FACADE_6";
    LotEnum["REVETEMENT_7"] = "REVETEMENT_7";
    LotEnum["CVC_8"] = "CVC_8";
    LotEnum["SANITAIRES_9"] = "SANITAIRES_9";
    LotEnum["CFO_10"] = "CFO_10";
    LotEnum["CFA_11"] = "CFA_11";
    LotEnum["ELEVATEUR_12"] = "ELEVATEUR_12";
    LotEnum["PRODUCTION_ELECTRICITE_13"] = "PRODUCTION_ELECTRICITE_13";
    LotEnum["ENERGIE"] = "ENERGIE";
    LotEnum["AUTRE"] = "AUTRE";
    LotEnum["UNKNOWN"] = "UNKNOWN";
    LotEnum["NONE"] = "EMPTY";
})(LotEnum || (LotEnum = {}));
export const lotEnumLabels = {
    [LotEnum.VRD_1]: "VRD (Voirie et réseaux divers)",
    [LotEnum.FONDATION_2]: "Fondations et infrastructures",
    [LotEnum.SUPERSTRUCTURE_3]: "Superstructure - Maçonnerie",
    [LotEnum.CHARPENTE_4]: "Couverture - Etanchéité - Charpente - Zinguerie",
    [LotEnum.CLOISONNEMENT_5]: "Cloisonnement - Doublage - Plafonds suspendus - Menuiseries intérieures",
    [LotEnum.FACADE_6]: "Façades et menuiseries extérieures",
    [LotEnum.REVETEMENT_7]: "Revêtements des sols, murs et plafonds - Chape - Produits de décoration",
    [LotEnum.CVC_8]: "CVC (Chauffage - Ventilation - Refroidissement - Eau chaude sanitaire)",
    [LotEnum.SANITAIRES_9]: "Installations sanitaires",
    [LotEnum.CFO_10]: "Réseaux d'énergie (CFO)",
    [LotEnum.CFA_11]: "Réseaux de com (CFA)",
    [LotEnum.ELEVATEUR_12]: "Appareils élévateurs et autres équipements de transport intérieur",
    [LotEnum.PRODUCTION_ELECTRICITE_13]: "Équipement de production locale d'électricité",
    [LotEnum.ENERGIE]: "Énergie",
    [LotEnum.AUTRE]: "Autre",
    [LotEnum.UNKNOWN]: "Inconnu",
    [LotEnum.NONE]: "Vide",
};
export function lotNameToLabel(lotName) {
    switch (lotName) {
        case LotEnum.VRD_1:
            return "VRD (Voirie et réseaux divers)";
        case LotEnum.FONDATION_2:
            return "Fondations et infrastructures";
        case LotEnum.SUPERSTRUCTURE_3:
            return "Superstructure - Maçonnerie";
        case LotEnum.CHARPENTE_4:
            return "Couverture - Etanchéité - Charpente - Zinguerie";
        case LotEnum.CLOISONNEMENT_5:
            return "Cloisonnement - Doublage - Plafonds suspendus - Menuiseries intérieures";
        case LotEnum.FACADE_6:
            return "Façades et menuiseries extérieures";
        case LotEnum.REVETEMENT_7:
            return "Revêtements des sols, murs et plafonds - Chape - Produits de décoration";
        case LotEnum.CVC_8:
            return "CVC (Chauffage - Ventilation - Refroidissement - Eau chaude sanitaire)";
        case LotEnum.SANITAIRES_9:
            return "Installations sanitaires";
        case LotEnum.CFO_10:
            return "Réseaux d'énergie (CFO)";
        case LotEnum.CFA_11:
            return "Réseaux de com (CFA)";
        case LotEnum.ELEVATEUR_12:
            return "Appareils élévateurs et autres équipements de transport intérieur";
        case LotEnum.PRODUCTION_ELECTRICITE_13:
            return "Équipement de production locale d'électricité";
        case LotEnum.ENERGIE:
            return "Énergie";
        case LotEnum.AUTRE:
            return "Autre";
        case LotEnum.NONE:
            return "Vide";
        default:
            return "Inconnu";
    }
}
