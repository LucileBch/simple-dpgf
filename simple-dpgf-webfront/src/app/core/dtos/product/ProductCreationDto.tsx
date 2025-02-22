import { UnitEnum } from "../../enums/UnitEnum";

export interface ProductCreationOrUpdateDto {
  name: string;
  unit: UnitEnum;
  quantity: number;
  unitPrice: number;
}
