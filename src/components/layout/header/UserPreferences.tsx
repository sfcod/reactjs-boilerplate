import React from 'react';
import classNames from 'classnames';
import { NavDropdown } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog } from '@fortawesome/free-solid-svg-icons';
import Router from '../../../navigation/router';
import routes from '../../../navigation/routes';
import { Link } from 'react-router-dom';
import UserAuthService from 'src/services/user-auth';

interface Props {}

const UserPreferences: React.FunctionComponent<Props> = React.memo(({}: Props) => {
    if (!UserAuthService.isLoggedIn()) {
        return null;
    }

    return (
        <div className={classNames('d-flex', 'align-items-center', 'gap-3', 'text-white')}>
            <span>{String(UserAuthService.getData()?.username)}</span>
            <NavDropdown title={<FontAwesomeIcon icon={faCog} />} id="nav-dropdown" align="end">
                <NavDropdown.Item href={Router.generate(routes.LOGOUT)}>Logout</NavDropdown.Item>
            </NavDropdown>
        </div>
    );
});

export default UserPreferences;
