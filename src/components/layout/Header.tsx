import React from 'react';
import styles from './assets/header.module.scss';
import classNames from 'classnames';
import logo from './assets/images/logo.png';
import { Link } from 'react-router-dom';
import { routes } from '../../navigation';
import Router from '../../navigation/router';

const Header: React.FunctionComponent = () => {
    return (
        <header className={classNames(styles.header)}>
            <div className={classNames(styles.holder, 'container')}>
                <Link to={Router.generate(routes.HOME)} className={classNames(styles.logo)}>
                    <img className={classNames(styles.logoImg)} src={logo} alt="logo" />
                </Link>
            </div>
        </header>
    );
};

export default Header;
