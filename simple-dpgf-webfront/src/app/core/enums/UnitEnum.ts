export enum UnitEnum {
  METER = "METER",
  SQUARE_METER = "SQUARE_METER",
  CUBIC_METER = "CUBIC_METER",
  KG = "KG",
  PER_UNIT = "PER_UNIT",
  NO_UNIT = "NO_UNIT",
  SQUARE_DECIMETER = "SQUARE_DECIMETER",
  MEGAJOULES = "MEGAJOULES",
  KILOWATT_PER_HOUR = "KILOWATT_PER_HOUR",
  LITER = "LITER",
  GRAM = "GRAM",
  CENTIMETER = "CENTIMETER",
  PERCENT = "PERCENT",
  KG_CO2_EQ = "KG_CO2_EQ",
  KG_SO2_EQ = "KG_SO2_EQ",
  KG_CFC11_EQ = "KG_CFC11_EQ",
  KG_C2H4_EQ = "KG_C2H4_EQ",
  MILLIGRAM = "MILLIGRAM",
  CUBIC_MILLIMETER = "CUBIC_MILLIMETER",
  G_EQ_SO2 = "G_EQ_SO2",
  G_C2H4_EQ = "G_C2H4_EQ",
  GRAM_PER_SQUARE_METER = "GRAM_PER_SQUARE_METER",
  KG_SB_EQ = "KG_SB_EQ",
  M3_PER_UF = "M3_PER_UF",
  KG_PER_M2 = "KG_PER_M2",
  K_WHEP = "K_WHEP",
  M3_AIR = "M3_AIR",
  KG_PO4_3_EQ = "KG_PO4_3_EQ",
  METRIC_TON = "METRIC_TON",
  M3_EAU = "M3_EAU",
  PERSON_RESERVE = "PERSON_RESERVE",
  MOLE_EQ_H_PLUS = "MOLE_EQ_H_PLUS",
  MOLE_EQ_N = "MOLE_EQ_N",
  KILOMETER = "KILOMETER",
  G_EQ_CO2 = "G_EQ_CO2",
  G_EQ_CFC11 = "G_EQ_CFC11",
  G_EQ_PO4_3 = "G_EQ_PO4_3",
  G_EQ_C2H4 = "G_EQ_C2H4",
  G_EQ_H_PLUS = "G_EQ_H_PLUS",
  CUBIC_DECIMETER = "CUBIC_DECIMETER",
  K_WC = "K_WC",
  METRIC_TON_KM = "METRIC_TON_KM",
  DECA_NEWTON = "DECA_NEWTON",
  M3_PER_HOUR = "M3_PER_HOUR",
  MILLIMETER = "MILLIMETER",
  KG_PER_M3 = "KG_PER_M3",
  KILOWATT = "KILOWATT",
  DECIBEL = "DECIBEL",
  W_PER_M2_K = "W_PER_M2_K",
  SQUARE_CENTIMETER = "SQUARE_CENTIMETER",
  SQUARE_MILLIMETER = "SQUARE_MILLIMETER",
  WC = "WC",
  FLOOR_NUMBER = "FLOOR_NUMBER",
  M2_K_PER_WATT = "M2_K_PER_WATT",
  KILOGRAM_PER_METER = "KILOGRAM_PER_METER",
  KG_BQ_U235_EQ = "KG_BQ_U235_EQ",
  CTU_E = "CTU_E",
  CTU_H = "CTU_H",
  NONE = "Aucune",
}

export function unitEnumtoLabel(unitEnum: UnitEnum | undefined): string {
  if (!unitEnum) {
    return "unité inconnue";
  }
  switch (unitEnum) {
    case "SQUARE_DECIMETER":
      return "dm²";
    case "SQUARE_METER":
      return "m²";
    case "KG":
      return "kg";
    case "CUBIC_METER":
      return "m³";
    case "METER":
      return "m";
    case "MEGAJOULES":
      return "MJ";
    case "KILOWATT_PER_HOUR":
      return "kWh";
    case "LITER":
      return "l";
    case "GRAM":
      return "g";
    case "CENTIMETER":
      return "cm";
    case "PERCENT":
      return "%";
    case "PER_UNIT":
      return "unité";
    case "MILLIGRAM":
      return "mg";
    case "CUBIC_MILLIMETER":
      return "mm³";
    case "GRAM_PER_SQUARE_METER":
      return "g/m²";
    case "KG_PER_M2":
      return "kg/m²";
    case "K_WHEP":
      return "kWhep";
    case "NO_UNIT":
      return "";
    case "M3_AIR":
      return "m³ air";
    case "METRIC_TON":
      return "t";
    case "M3_EAU":
      return "m³ eau";
    case "PERSON_RESERVE":
      return "réservé par personne";
    case "KILOMETER":
      return "km";
    case "CUBIC_DECIMETER":
      return "dm³";
    case "K_WC":
      return "kWc";
    case "METRIC_TON_KM":
      return "t·km";
    case "M3_PER_HOUR":
      return "m³/h";
    case "MILLIMETER":
      return "mm";
    case "KG_PER_M3":
      return "kg/m³";
    case "KILOWATT":
      return "kW";
    case "DECIBEL":
      return "dB";
    case "SQUARE_CENTIMETER":
      return "cm²";
    case "SQUARE_MILLIMETER":
      return "mm²";
    case "WC":
      return "Wc";
    case "FLOOR_NUMBER":
      return "étage(s)";
    case "M2_K_PER_WATT":
      return "m²·K/W";
    case "KILOGRAM_PER_METER":
      return "kg/m";
    case UnitEnum.NONE:
      return "Aucune";
    default:
      return "unité inconnue";
  }
}
