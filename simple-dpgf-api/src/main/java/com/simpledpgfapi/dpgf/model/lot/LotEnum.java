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
            1
    ), FONDATION_2(
            "Fondations et infrastructures",
            2
    ), SUPERSTRUCTURE_3(
            "Superstructure - Maçonnerie",
            3
    ), CHARPENTE_4(
            "Couverture - Etanchéité - Charpente - Zinguerie",
            4
    ), CLOISONNEMENT_5(
            "Cloisonnement - Doublage - Plafonds suspendus - Menuiseries intérieures",
            5
    ), FACADE_6(
            "Façades et menuiseries extérieures",
            6
    ), REVETEMENT_7(
            "Revêtements des sols, murs et plafonds - Chape - Produits de décoration",
            7
    ), CVC_8(
            "CVC (Chauffage - Ventilation - Refroidissement - Eau chaude sanitaire)",
            8
    ), SANITAIRES_9(
            "Installations sanitaires",
            9
    ), CFO_10(
            "Réseaux d'énergie (CFO)",
            10
    ),
    CFA_11(
            "Réseaux de com (CFA)",
            11
    ), ELEVATEUR_12(
            "Appareils élévateurs et autres équipements de transport intérieur",
            12
    ), PRODUCTION_ELECTRICITE_13(
            "Équipement de production locale d'électricité",
            13
    ), ENERGIE(
            "Énergie",
            14
    ), AUTRE(
            "Autres",
            15
    ), UNKNOWN(
            "",
            16
    );

    @Getter
    private final int key;
    private final String label;
    LotEnum(String label, int key) {
        this.label = label;
        this.key = key;
    }

    // TODO: delete ?
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
