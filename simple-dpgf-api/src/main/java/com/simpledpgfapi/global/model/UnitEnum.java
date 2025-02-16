package com.simpledpgfapi.global.model;


import lombok.extern.slf4j.Slf4j;

@Slf4j
public enum UnitEnum {
    SQUARE_DECIMETER,
    SQUARE_METER,
    KG,
    CUBIC_METER,
    METER,
    MEGAJOULES,
    KILOWATT_PER_HOUR,
    LITER,
    GRAM,
    CENTIMETER,
    PERCENT,
    PER_UNIT,
    KG_CO2_EQ,
    KG_SO2_EQ,
    KG_CFC11_EQ,
    KG_C2H4_EQ,
    MILLIGRAM,
    CUBIC_MILLIMETER,
    G_EQ_SO2,
    G_C2H4_EQ,
    GRAM_PER_SQUARE_METER,
    KG_SB_EQ,
    M3_PER_UF,
    KG_PER_M2,
    K_WHEP,
    NO_UNIT,
    M3_AIR,
    KG_PO4_3_EQ,
    METRIC_TON,
    M3_EAU,
    PERSON_RESERVE,
    MOLE_EQ_H_PLUS,
    MOLE_EQ_N,
    KILOMETER,
    G_EQ_CO2,
    G_EQ_CFC11,
    G_EQ_PO4_3,
    G_EQ_C2H4,
    G_EQ_H_PLUS,
    CUBIC_DECIMETER,
    YEAR_MINUS_1,
    K_WC,
    METRIC_TON_KM,
    DECA_NEWTON,
    M3_PER_HOUR,
    MILLIMETER,
    KG_PER_M3,
    KILOWATT,
    DECIBEL,
    KELVIN_PER_WATT,
    W_PER_M2_K,
    SQUARE_CENTIMETER,
    SQUARE_MILLIMETER,
    WC,
    FLOOR_NUMBER,
    M2_K_PER_WATT,
    KILOGRAM_PER_METER,
    KG_P_EQ,
    KG_N_EQ,
    KG_COVNM,
    DISEASE_INCIDENCE,
    KG_BQ_U235_EQ,
    CTU_E,
    CTU_H,
    M3_EQ_PRIV_WORLD,
    UNKNOWN;

    UnitEnum() {
    }

    public static String toLabel(UnitEnum unitEnum) {
        if (unitEnum == null) {
            return "unité inconnue";
        }
        return switch (unitEnum) {
            case SQUARE_DECIMETER -> "dm²";
            case SQUARE_METER -> "m²";
            case KG -> "kg";
            case CUBIC_METER -> "m³";
            case METER -> "m";
            case MEGAJOULES -> "MJ";
            case KILOWATT_PER_HOUR -> "kWh";
            case LITER -> "l";
            case GRAM -> "g";
            case CENTIMETER -> "cm";
            case PERCENT -> "%";
            case PER_UNIT -> "unité";
            case KG_CO2_EQ -> "kg CO₂ eq";
            case KG_SO2_EQ -> "kg SO₂ eq";
            case KG_CFC11_EQ -> "kg CFC₁₁ eq";
            case KG_C2H4_EQ -> "kg C₂H₄ eq";
            case MILLIGRAM -> "mg";
            case CUBIC_MILLIMETER -> "mm³";
            case G_EQ_SO2 -> "g SO₂ eq";
            case G_C2H4_EQ -> "g C₂H₄ eq";
            case GRAM_PER_SQUARE_METER -> "g/m²";
            case KG_SB_EQ -> "kg SB eq";
            case M3_PER_UF -> "m³/UF";
            case KG_PER_M2 -> "kg/m²";
            case K_WHEP -> "kWhep";
            case NO_UNIT -> "";
            case M3_AIR -> "m³ air";
            case KG_PO4_3_EQ -> "kg PO4³⁻ eq";
            case METRIC_TON -> "t";
            case M3_EAU -> "m³ eau";
            case PERSON_RESERVE -> "réservé par personne";
            case MOLE_EQ_H_PLUS -> "mol H⁺ eq";
            case MOLE_EQ_N -> "mol N eq";
            case KILOMETER -> "km";
            case G_EQ_CO2 -> "g CO₂ eq";
            case G_EQ_CFC11 -> "g CFC₁₁ eq";
            case G_EQ_PO4_3 -> "g PO₄³⁻ eq";
            case G_EQ_C2H4 -> "g C₂H₄ eq";
            case G_EQ_H_PLUS -> "g H⁺ eq";
            case CUBIC_DECIMETER -> "dm³";
            case YEAR_MINUS_1 -> "année⁻¹";
            case K_WC -> "kWc";
            case METRIC_TON_KM -> "t·km";
            case DECA_NEWTON -> "daN";
            case M3_PER_HOUR -> "m³/h";
            case MILLIMETER -> "mm";
            case KG_PER_M3 -> "kg/m³";
            case KILOWATT -> "kW";
            case DECIBEL -> "dB";
            case KELVIN_PER_WATT -> "K/W";
            case W_PER_M2_K -> "W/m²·K";
            case SQUARE_CENTIMETER -> "cm²";
            case SQUARE_MILLIMETER -> "mm²";
            case WC -> "Wc";
            case FLOOR_NUMBER -> "étage(s)";
            case M2_K_PER_WATT -> "m²·K/W";
            case KILOGRAM_PER_METER -> "kg/m";
            default -> "unité inconnue";
        };
    }

    public String getLabel() {
        return toLabel(this);
    }
}
