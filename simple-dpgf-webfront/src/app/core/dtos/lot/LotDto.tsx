import { LotEnum } from "../../enums/LotEnum";

export interface LotDto {
  id: string;
  lotName: LotEnum;
  code: number;
  dpgfId: string;
}
