export enum DpgfStatusEnum {
  IN_PROGRESS = "IN_PROGRESS",
  DONE = "DONE",
  ARCHIVED = "ARCHIVED",
  DELETED = "DELETED",
}

export const dpgfStatusEnumLabels = {
  [DpgfStatusEnum.IN_PROGRESS]: "En cours",
  [DpgfStatusEnum.DONE]: "Terminé",
  [DpgfStatusEnum.ARCHIVED]: "Archivé",
  [DpgfStatusEnum.DELETED]: "Supprimé",
};

export function dpgfStatusToLabel(dpgfStatus: DpgfStatusEnum) {
  switch (dpgfStatus) {
    case DpgfStatusEnum.IN_PROGRESS:
      return "En cours";
    case DpgfStatusEnum.DONE:
      return "Terminé";
    case DpgfStatusEnum.ARCHIVED:
      return "Archivé";
    case DpgfStatusEnum.DELETED:
      return "Supprimé";
    default:
      return "Non spécifié";
  }
}
