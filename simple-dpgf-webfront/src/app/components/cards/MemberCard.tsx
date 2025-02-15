import { Box, Card, CardContent, Typography } from "@mui/material";
import { InvitationDto } from "../../core/dtos/invitation/InvitationDto";
import OutlinedButton from "../buttons/OutlinedButton";
import {
  InvitationStatusEnum,
  invitationStatusToLabel,
} from "../../core/enums/InvitationStatusEnum";
import { theme } from "../../styles/theme";
import { useCallback, useContext, useState } from "react";
import { DialogContext } from "../../core/contexts/dialog-context";
import InvitationDialog from "../modals/InvitationDialog";

interface IProps {
  invitedMember: InvitationDto;
}

export default function MemberCard({
  invitedMember,
}: Readonly<IProps>): JSX.Element {
  const { isDeleteDialogOpen, setIsDeleteDialogOpen } =
    useContext(DialogContext);

  const [dialogOption, setDialogOption] = useState<
    "deleteMember" | "deleteInvitation" | null
  >(null);

  const handleOpenInvitationDialog = useCallback(
    (option: "deleteMember" | "deleteInvitation") => {
      setIsDeleteDialogOpen(true);
      setDialogOption(option);
    },
    [setIsDeleteDialogOpen]
  );

  return (
    <Card>
      <CardContent
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          maxHeight: "60px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-evenly",
            width: "50%",
          }}
        >
          <Typography>{invitedMember.firstName}</Typography>
          <Typography>{invitedMember.lastName}</Typography>
          <Typography>{invitedMember.emailReceiver}</Typography>
          <Typography
            sx={{
              color:
                invitedMember.invitationStatus === InvitationStatusEnum.CONSUMED
                  ? theme.palette.success.main
                  : theme.palette.error.main,
            }}
          >
            {invitationStatusToLabel(invitedMember.invitationStatus)}
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-evenly",
            width: "30%",
          }}
        >
          {invitedMember.invitationStatus === InvitationStatusEnum.CONSUMED ? (
            <OutlinedButton
              label="Supprimer le membre"
              onClick={() => handleOpenInvitationDialog("deleteMember")}
            />
          ) : (
            <OutlinedButton
              label="Supprimer l'invitation"
              onClick={() => handleOpenInvitationDialog("deleteInvitation")}
            />
          )}

          {isDeleteDialogOpen && dialogOption && (
            <InvitationDialog
              dialogTitle={
                dialogOption === "deleteMember"
                  ? "Etes-vous sur de vouloir supprimer ce collaborateur ?"
                  : "Etes-vous sur de vouloir annuler cette invitation ?"
              }
              dialogOption={dialogOption}
              invitationId={invitedMember.id}
            />
          )}
        </Box>
      </CardContent>
    </Card>
  );
}
