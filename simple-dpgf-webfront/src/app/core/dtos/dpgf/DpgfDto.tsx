import { DpgfStatusEnum } from "../../enums/DpgfStatusEnum";

export interface DpgfDto {
  id: string;
  name: string;
  dpgfStatus: DpgfStatusEnum;
  createdByUser: string;
  lastModifiedDate: Date;
}
