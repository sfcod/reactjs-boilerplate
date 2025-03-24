import React from 'react';
import classNames from 'classnames';
import { NavDropdown } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog } from '@fortawesome/free-solid-svg-icons';
import Router from '../../../navigation/router';
import routes from '../../../navigation/routes';
import { Link } from 'react-router-dom';

interface Props {}

const UserPreferences: React.FunctionComponent<Props> = React.memo(({}: Props) => (
    <ul className={classNames('navbar-nav', 'ml-auto')}>
        <NavDropdown title={<FontAwesomeIcon icon={faCog} />} id="nav-dropdown" align="end">
            <NavDropdown.Item as={Link} to={Router.generate(routes.PROFILE)}>
                Profile
            </NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href={Router.generate(routes.LOGOUT)}>Logout</NavDropdown.Item>
        </NavDropdown>
    </ul>
));

export default UserPreferences;
