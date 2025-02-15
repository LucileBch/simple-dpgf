import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import OutlinedButton from "../buttons/OutlinedButton";
import { useCallback, useContext, useEffect, useState } from "react";
import { DialogContext } from "../../core/contexts/dialog-context";
import { OrganizationLicenseUpdateDto } from "../../core/dtos/OrganizationLicenseUpdateDto";
import { useOrganization } from "../../core/hooks/use-organization";
import { OrganizationDto } from "../../core/dtos/organization/OrganizationDto";
import { NumberInput } from "../inputs/NumberInput";
import { AdminOrganizationContext } from "../../core/contexts/admin-organization-context";

interface IProps {
  dialogTitle: string;
  dialogContent?: string;
  organization: OrganizationDto;
}

export default function UpdateLicenseDialog({
  dialogTitle,
  dialogContent,
  organization,
}: Readonly<IProps>): JSX.Element {
  const { updateOrganizationLicense } = useOrganization();

  const { setOrganization } = useContext(AdminOrganizationContext);
  const {
    isUpdateDialogOpen,
    isSubmitting,
    setIsSubmitting,
    setAlertMessage,
    setIsUpdateDialogOpen,
    setOpenAlert,
    handleCancelAndClose,
  } = useContext(DialogContext);

  const [formData, setFormData] = useState<OrganizationLicenseUpdateDto>({
    memberLicenseCounter: organization.memberLicenseCounter,
    maxMemberLicenseCounter: organization.maxMemberLicenseCounter,
    projectLicenseCounter: organization.projectLicenseCounter,
    maxProjectLicenseCounter: organization.maxProjectLicenseCounter,
  });

  useEffect(() => {
    if (isUpdateDialogOpen) {
      setFormData({
        memberLicenseCounter: organization.memberLicenseCounter,
        maxMemberLicenseCounter: organization.maxMemberLicenseCounter,
        projectLicenseCounter: organization.projectLicenseCounter,
        maxProjectLicenseCounter: organization.maxProjectLicenseCounter,
      });
    }
  }, [isUpdateDialogOpen, organization]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const valueToNumber = Number(value);

    const number = Number(value);
    if (number < 0) return;

    setFormData({
      ...formData,
      [name]: valueToNumber,
    });
  };

  const handleSubmitAndClose = useCallback(async () => {
    if (isSubmitting) {
      return;
    }

    setIsSubmitting(true);
    setAlertMessage(null);
    setOpenAlert(false);

    try {
      const updatedOrganization = await updateOrganizationLicense(
        organization.id,
        formData
      );

      setOrganization(updatedOrganization);

      setIsSubmitting(false);
      setAlertMessage("Les licenses de l'organisation ont été mises à jour.");
      setOpenAlert(true);

      setTimeout(() => {
        setIsUpdateDialogOpen(false);
      }, 2000);
    } finally {
      setIsSubmitting(false);
    }
  }, [
    formData,
    isSubmitting,
    organization.id,
    setAlertMessage,
    setIsUpdateDialogOpen,
    setIsSubmitting,
    setOpenAlert,
    setOrganization,
    updateOrganizationLicense,
  ]);

  return (
    <Dialog
      open={isUpdateDialogOpen}
      onClose={handleCancelAndClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{dialogTitle}</DialogTitle>
      <DialogContent
        id="alert-dialog-description"
        sx={{ display: "flex", flexDirection: "column", p: 2, gap: 2 }}
      >
        {dialogContent}
        <NumberInput
          id="memberLicenseCounter"
          name="memberLicenseCounter"
          label="Licenses utilisateurs"
          required
          onChange={handleChange}
          value={formData.memberLicenseCounter}
        />
        <NumberInput
          id="maxMemberLicenseCounter"
          name="maxMemberLicenseCounter"
          label="Licenses utilisateurs maximum"
          required
          onChange={handleChange}
          value={formData.maxMemberLicenseCounter}
        />

        <NumberInput
          id="projectLicenseCounter"
          name="projectLicenseCounter"
          label="Licenses projets"
          required
          onChange={handleChange}
          value={formData.projectLicenseCounter}
        />
        <NumberInput
          id="maxProjectLicense"
          name="maxProjectLicenseCounter"
          label="Licenses projets maximum"
          required
          onChange={handleChange}
          value={formData.maxProjectLicenseCounter}
        />
      </DialogContent>
      <DialogActions>
        <OutlinedButton
          label="Annuler"
          onClick={handleCancelAndClose}
          disabled={isSubmitting}
        />
        <OutlinedButton label="Confirmer" onClick={handleSubmitAndClose} />
      </DialogActions>
    </Dialog>
  );
}
