package com.simpledpgfapi.dpgf.model.lot;

import lombok.Getter;
import lombok.extern.slf4j.Slf4j;
import org.apache.logging.log4j.util.Strings;

import java.util.List;
import java.util.Objects;
import java.util.stream.Stream;

@Getter
@Slf4j
public enum LotEnum {
    VRD_1(
            "VRD (Voirie et réseaux divers)",
            "1"
//            Arrays.asList(
//                    SousLotEnum.RESEAU_1_1,
//                    SousLotEnum.STOCKAGE_1_2,
//                    SousLotEnum.PARKING_1_3
//            )
    ), FONDATION_2(
            "Fondations et infrastructures",
            "2"
//            Arrays.asList(
//                    SousLotEnum.FONDATIONS_2_1,
//                    SousLotEnum.MUR_2_2,
//                    SousLotEnum.PARKING_INTERIEUR_2_3
//            )
    ), SUPERSTRUCTURE_3(
            "Superstructure - Maçonnerie",
            "3"
//            Arrays.asList(
//                    SousLotEnum.HORIZONTAUX_SOL_3_1,
//                    SousLotEnum.HORIZONTAUX_POUTRES_3_2,
//                    SousLotEnum.FACADE_3_3,
//                    SousLotEnum.REFENDS_3_4,
//                    SousLotEnum.POTEAUX_3_5,
//                    SousLotEnum.ESCALIER_3_6,
//                    SousLotEnum.ISOLATION_3_7,
//                    SousLotEnum.MACONNERIES_3_8
//            )
    ), CHARPENTE_4(
            "Couverture - Etanchéité - Charpente - Zinguerie",
            "4"
//            Arrays.asList(
//                    SousLotEnum.TOITURES_TERRASSES_4_1,
//                    SousLotEnum.TOITURES_EN_PENTE_4_2,
//                    SousLotEnum.TOITURES_TECHNIQUES_4_3
//            )
    ), CLOISONNEMENT_5(
            "Cloisonnement - Doublage - Plafonds suspendus - Menuiseries intérieures",
            "5"
//            Arrays.asList(
//                    SousLotEnum.CLOISONS_5_1,
//                    SousLotEnum.DOUBLAGES_5_2,
//                    SousLotEnum.PLAFONDS_SUSPENDUS_5_3,
//                    SousLotEnum.PLAFONDS_SURELEVES_5_4,
//                    SousLotEnum.MENUISERIES_5_5
//            )
    ), FACADE_6(
            "Façades et menuiseries extérieures",
            "6"
//            Arrays.asList(
//                    SousLotEnum.REVETEMENT_ISOLATION_6_1,
//                    SousLotEnum.PORTES_6_2,
//                    SousLotEnum.HABILLAGES_6_3
//            )
    ), REVETEMENT_7(
            "Revêtements des sols, murs et plafonds - Chape - Produits de décoration",
            "7"
//            Arrays.asList(
//                    SousLotEnum.REVETEMENT_SOL_7_1,
//                    SousLotEnum.REVETEMENT_MUR_7_2,
//                    SousLotEnum.DECORATION_7_3
//            )
    ), CVC_8(
            "CVC (Chauffage - Ventilation - Refroidissement - Eau chaude sanitaire)",
            "8"
//            Arrays.asList(
//                    SousLotEnum.PRODUCTION_8_1,
//                    SousLotEnum.COGENERATION_8_2,
//                    SousLotEnum.EMISSION_8_3,
//                    SousLotEnum.TRAITEMENT_AIR_8_4,
//                    SousLotEnum.RESEAUX_CONDUITS_8_5,
//                    SousLotEnum.STOCKAGE_8_6,
//                    SousLotEnum.FRIGORIGENE_8_7
//            )
    ), SANITAIRES_9(
            "Installations sanitaires",
            "9"
//            List.of(
//                    SousLotEnum.ROBINETTERIE_9_1,
//                    SousLotEnum.CANALISATIONS_9_2
//            )
    ), CFO_10(
            "Réseaux d'énergie (CFO)",
            "10"
//            List.of(
//                    SousLotEnum.ELECTRIQUE_10_1,
//                    SousLotEnum.SECURITE_10_2,
//                    SousLotEnum.ECLAIRAGE_INTERIEUR_10_3,
//                    SousLotEnum.ECLAIRAGE_EXTERIEUR_10_4,
//                    SousLotEnum.AUTOMATISATION_10_5,
//                    SousLotEnum.APPAREILLAGES_10_6
//            )
    ),
    CFA_11(
            "Réseaux de com (CFA)",
            "11"
//            List.of(
//                    SousLotEnum.COMMUNICATION_11_1,
//                    SousLotEnum.SECURITE_11_2,
//                    SousLotEnum.APPAREILLAGES_11_3
//            )
    ), ELEVATEUR_12(
            "Appareils élévateurs et autres équipements de transport intérieur",
            "12"
            //List.of(SousLotEnum.TRANSPORT_12_1)
    ), PRODUCTION_ELECTRICITE_13(
            "Équipement de production locale d'électricité",
            "13"
           // List.of(SousLotEnum.PRODUCTION_ELECTRIQUE_13_1)
    ), ENERGIE(
            "Énergie",
            ""
//            List.of(
//                    SousLotEnum.ENERGIE_CHAUFFAGE,
//                    SousLotEnum.ENERGIE_REFROIDISSEMENT,
//                    SousLotEnum.ENERGIE_ECS,
//                    SousLotEnum.ENERGIE_ECLAIRAGE,
//                    SousLotEnum.ENERGIE_VENTILATION,
//                    SousLotEnum.ENERGIE_DISTRIBUTION,
//                    SousLotEnum.ENERGIE_DEPLACEMENT,
//                    SousLotEnum.ENERGIE_EXPORT
//            )
    ), AUTRE(
            "Autres",
            ""
           // List.of(SousLotEnum.AUTRES)
    ), UNKNOWN(
            "",
            "Inconnu"
           // List.of(SousLotEnum.UNKNOWN)
    );

   // private final List<SousLotEnum> children;
    private final String key;
    private final String label;

    LotEnum(String label,
            String key
           // List<SousLotEnum> sousLots
        ) {
        if (Strings.isEmpty(label)) {
            this.label = key;
        } else if (Strings.isEmpty(key)) {
            this.label = label;
        } else {
            this.label = key + ". " + label;
        }
        this.key = key;
        //this.children = sousLots;
    }

    public static LotEnum fromKey(String key) {
        if (Strings.isEmpty(key)) {
            return UNKNOWN;
        } else {
            return Stream.of(LotEnum.values()).filter(lot -> Objects.equals(
                    lot.getKey(),
                    key
            )).findFirst().orElse(UNKNOWN);
        }
    }

//    public static LotEnum findLotForSousLot(SousLotEnum sousLot) {
//        for (LotEnum lot : LotEnum.values()) {
//            if (lot.getChildren().contains(sousLot)) {
//                return lot;
//            }
//        }
//        return LotEnum.UNKNOWN;
//    }

    public static List<LotEnum> getLotsList() {
        return List.of(
                VRD_1,
                FONDATION_2,
                SUPERSTRUCTURE_3,
                CHARPENTE_4,
                CLOISONNEMENT_5,
                FACADE_6,
                REVETEMENT_7,
                CVC_8,
                SANITAIRES_9,
                CFO_10,
                CFA_11,
                ELEVATEUR_12,
                PRODUCTION_ELECTRICITE_13,
                AUTRE
        );
    }
}
