import type { PropsWithChildren } from 'react';
import React from 'react';
import classNames from 'classnames';
import styles from './assets/default-layout.module.scss';
import { Dropdown } from 'react-bootstrap';
import { useAuth } from '../../../hooks/auth';
import routes from '../../../navigation/routes';

interface Props {
    className?: string;
    classNameWrapper?: string;
}

const DefaultLayout: React.FC<PropsWithChildren<Props>> = ({ children, className, classNameWrapper }) => {
    const { user } = useAuth();
    return (
        <div className={classNames(styles.container, className)}>
            <header className={'d-flex justify-content-between p-3'}>
                <div>&nbsp;</div>
                <h3>Boilerplate</h3>
                <Dropdown>
                    <Dropdown.Toggle variant="link" id="dropdown-header">
                        {user?.email}
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <Dropdown.Item href={routes.PROFILE}>Profile</Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Item href={routes.LOGOUT}>Logout</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </header>
            <main className={classNames(styles.main, classNameWrapper)}>{children}</main>
            <footer className={classNames('d-flex justify-content-center p-3')}>Footer</footer>
        </div>
    );
};

export default DefaultLayout;
