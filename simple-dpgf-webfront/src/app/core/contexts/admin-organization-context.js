import { jsx as _jsx } from "react/jsx-runtime";
/* eslint-disable react-refresh/only-export-components */
import React, { useCallback, useEffect, useMemo, useState, } from "react";
import { useOrganization } from "../hooks/use-organization";
import { useParams } from "react-router-dom";
export const AdminOrganizationContext = React.createContext({});
export function AdminOrganizationContextProvider({ children, }) {
    const { organizationId } = useParams();
    const { fetchOrganizationList, fetchOrganizationById } = useOrganization();
    const [organizationList, setOrganizationList] = useState([]);
    const [isOrganizationListLoading, setIsOrganizationListLoading] = useState(false);
    const [organization, setOrganization] = useState(undefined);
    const [isOrganizationLoading, setIsOrganizationLoading] = useState(false);
    const getOrganizationList = useCallback(() => {
        setIsOrganizationListLoading(true);
        fetchOrganizationList()
            .then((newOrganizationList) => setOrganizationList(newOrganizationList))
            .finally(() => setIsOrganizationListLoading(false));
    }, [fetchOrganizationList]);
    useEffect(() => {
        getOrganizationList();
    }, [getOrganizationList]);
    useEffect(() => {
        if (organizationId) {
            setIsOrganizationLoading(true);
            fetchOrganizationById(organizationId)
                .then((organization) => setOrganization(organization))
                .finally(() => setIsOrganizationLoading(false));
        }
    }, [fetchOrganizationById, organizationId]);
    const adminOrganizationStore = useMemo(() => ({
        organizationList,
        setOrganizationList,
        isOrganizationListLoading,
        organization,
        setOrganization,
        isOrganizationLoading,
    }), [
        organizationList,
        setOrganizationList,
        isOrganizationListLoading,
        organization,
        setOrganization,
        isOrganizationLoading,
    ]);
    return (_jsx(AdminOrganizationContext.Provider, { value: adminOrganizationStore, children: children }));
}
