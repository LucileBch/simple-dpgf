export enum UnitEnum {
  NO_UNIT = "NO_UNIT",
  METER = "METER",
  SQUARE_METER = "SQUARE_METER",
  CUBIC_METER = "CUBIC_METER",
  KG = "KG",
  PER_UNIT = "PER_UNIT",
  SQUARE_DECIMETER = "SQUARE_DECIMETER",
  MEGAJOULES = "MEGAJOULES",
  KILOWATT_PER_HOUR = "KILOWATT_PER_HOUR",
  LITER = "LITER",
  GRAM = "GRAM",
  CENTIMETER = "CENTIMETER",
  PERCENT = "PERCENT",
  MILLIGRAM = "MILLIGRAM",
  CUBIC_MILLIMETER = "CUBIC_MILLIMETER",
  GRAM_PER_SQUARE_METER = "GRAM_PER_SQUARE_METER",
  KG_PER_M2 = "KG_PER_M2",
  M3_AIR = "M3_AIR",
  METRIC_TON = "METRIC_TON",
  M3_EAU = "M3_EAU",
  KILOMETER = "KILOMETER",
  CUBIC_DECIMETER = "CUBIC_DECIMETER",
  M3_PER_HOUR = "M3_PER_HOUR",
  MILLIMETER = "MILLIMETER",
  KG_PER_M3 = "KG_PER_M3",
  KILOWATT = "KILOWATT",
  DECIBEL = "DECIBEL",
  SQUARE_CENTIMETER = "SQUARE_CENTIMETER",
  SQUARE_MILLIMETER = "SQUARE_MILLIMETER",
  WC = "WC",
  FLOOR_NUMBER = "FLOOR_NUMBER",
  KILOGRAM_PER_METER = "KILOGRAM_PER_METER",
}

export function unitEnumtoLabel(unitEnum: UnitEnum | undefined): string {
  if (!unitEnum) {
    return "unité inconnue";
  }
  switch (unitEnum) {
    case "NO_UNIT":
      return "Pas d'unité";
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
    case "M3_AIR":
      return "m³ air";
    case "METRIC_TON":
      return "t";
    case "M3_EAU":
      return "m³ eau";
    case "KILOMETER":
      return "km";
    case "CUBIC_DECIMETER":
      return "dm³";
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
    case "KILOGRAM_PER_METER":
      return "kg/m";
    default:
      return "unité inconnue";
  }
}
