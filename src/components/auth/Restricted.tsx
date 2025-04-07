import React, { useMemo } from 'react';
import { Navigate } from 'react-router-dom';
import securityService from '../../security/security';
import NoMatch from 'src/screens/NoMatch';

const Restricted = ({
    children,
    authParams,
    redirectTo,
}: {
    children: any;
    authParams?: { action: string; subject?: any }[] | null;
    redirectTo?: string;
}) => {
    const isGranted = useMemo<boolean>(() => {
        if (authParams) {
            for (const authParam of authParams) {
                if (securityService.isGranted(authParam.action, authParam.subject)) {
                    return true;
                }
            }
            return false;
        }
        return true;
    }, [authParams]);

    if (!isGranted) {
        return redirectTo ? <Navigate replace to={redirectTo} /> : <NoMatch code={403} message="No access" />;
    }

    return children;
};

export default Restricted;
