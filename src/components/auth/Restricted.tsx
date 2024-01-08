import React from 'react';
import { Navigate } from 'react-router-dom';
import securityService from '../../security/security';
import NoMatch from 'src/screens/NoMatch';

const Restricted: any = ({
    children,
    authParams,
    redirectTo,
}: {
    children: any;
    authParams?: { action: string; subject?: any } | null;
    redirectTo?: string;
}) => {
    if (authParams && !securityService.isGranted(authParams.action, authParams.subject)) {
        return redirectTo ? <Navigate replace={true} to={redirectTo} /> : <NoMatch code={403} message="No access" />;
    }

    return children;
};

export default Restricted;
