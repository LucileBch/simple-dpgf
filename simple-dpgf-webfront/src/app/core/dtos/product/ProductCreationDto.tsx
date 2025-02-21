import { UnitEnum } from "../../enums/UnitEnum";

export interface ProductCreationDto {
  name: string;
  unit: UnitEnum;
  quantity: number;
  unitPrice: number;
}
