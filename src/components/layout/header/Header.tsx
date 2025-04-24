import React from 'react';
import styles from './assets/header.module.scss';
import classNames from 'classnames';
import UserPreferences from './UserPreferences';
import Authenticated from 'src/components/auth/Authenticated';

const Header: React.FunctionComponent = () => {
    return (
        <header className={classNames(styles.header)}>
            <Authenticated>
                <UserPreferences />
            </Authenticated>
        </header>
    );
};

export default Header;
