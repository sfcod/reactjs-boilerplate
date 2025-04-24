import React from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import Router from '../../../navigation/router';
import routes from '../../../navigation/routes';
import { CSidebar, CSidebarBrand, CSidebarHeader, CSidebarNav, CSidebarToggler, CNavLink } from '@coreui/react';

import CIcon from '@coreui/icons-react';
import { cilPeople, cilSpeedometer } from '@coreui/icons';

const Sidebar: React.FunctionComponent = React.memo(() => {
    return (
        <CSidebar className="border-end sidebar" unfoldable placement="start">
            <CSidebarHeader className="border-bottom">
                <CSidebarBrand>CoreUI</CSidebarBrand>
            </CSidebarHeader>
            <CSidebarNav>
                <Link to={Router.generate(routes.DASHBOARD)} className={classNames('text-decoration-none')}>
                    <CNavLink>
                        <CIcon customClassName="nav-icon" icon={cilSpeedometer} /> Dashboard
                    </CNavLink>
                </Link>
                <Link to={Router.generate(routes.USER_LIST)} className={classNames('text-decoration-none')}>
                    <CNavLink>
                        <CIcon customClassName="nav-icon" icon={cilPeople} /> Users
                    </CNavLink>
                </Link>
            </CSidebarNav>
            <CSidebarHeader className="border-top">
                <CSidebarToggler />
            </CSidebarHeader>
        </CSidebar>
    );
});

export default Sidebar;
