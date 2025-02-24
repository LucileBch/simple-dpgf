import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { FormControl, InputLabel, MenuItem, Select, } from "@mui/material";
import { DpgfStatusEnum, dpgfStatusToLabel, } from "../../core/enums/DpgfStatusEnum";
import { useCallback, useContext, useState } from "react";
import { DpgfContext } from "../../core/contexts/dpgf-context";
import { useNavigate, useParams } from "react-router-dom";
import { AlertContext } from "../../core/contexts/alert-context";
import { pagesUrl } from "../../core/appConstants";
export default function StatusSelectInput({ label, }) {
    const { dpgfId } = useParams();
    const navigate = useNavigate();
    const [status, setStatus] = useState(label);
    const { updateDpgfStatus, deleteDpgf } = useContext(DpgfContext);
    const { handleSuccessAlert, handleErrorAlert } = useContext(AlertContext);
    const handleChange = useCallback(async (event) => {
        const newStatus = event.target.value;
        if (!dpgfId) {
            handleErrorAlert("Erreur : Dpgf non reconnu");
            return;
        }
        if (newStatus === DpgfStatusEnum.DELETED) {
            await deleteDpgf(dpgfId);
            handleSuccessAlert("Dpgf supprimé");
            navigate(pagesUrl.MOA_PROJECTS_PAGE);
        }
        else {
            await updateDpgfStatus(dpgfId, newStatus);
            handleSuccessAlert("Status du projet mis à jour");
            setStatus(newStatus);
        }
    }, [
        deleteDpgf,
        dpgfId,
        handleErrorAlert,
        handleSuccessAlert,
        navigate,
        updateDpgfStatus,
    ]);
    return (_jsxs(FormControl, { children: [_jsx(InputLabel, { id: "select-status-input", children: "Statut" }), _jsxs(Select, { labelId: "demo-simple-select-label", id: "demo-simple-select", value: status, label: "Statut", onChange: handleChange, sx: {
                    "& .MuiSelect-select": {
                        padding: "8px 16px",
                    },
                }, children: [_jsx(MenuItem, { value: DpgfStatusEnum.IN_PROGRESS, children: dpgfStatusToLabel(DpgfStatusEnum.IN_PROGRESS) }), _jsx(MenuItem, { value: DpgfStatusEnum.DONE, children: dpgfStatusToLabel(DpgfStatusEnum.DONE) }), _jsx(MenuItem, { value: DpgfStatusEnum.ARCHIVED, children: dpgfStatusToLabel(DpgfStatusEnum.ARCHIVED) }), _jsx(MenuItem, { value: DpgfStatusEnum.DELETED, children: dpgfStatusToLabel(DpgfStatusEnum.DELETED) })] })] }));
}
