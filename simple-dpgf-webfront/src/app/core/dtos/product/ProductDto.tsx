import { UnitEnum } from "../../enums/UnitEnum";

export interface ProductDto {
  id: string;
  lotId: string;
  lotCode: number;
  dpgfId: string;
  name: string;
  unit: UnitEnum;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}
