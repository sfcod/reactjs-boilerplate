import React from 'react';
import { Redirect } from 'react-router-dom';
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
        return redirectTo ? <Redirect to={redirectTo} /> : <NoMatch code={403} message="No access" />;
    }

    return children;
};

export default Restricted;
