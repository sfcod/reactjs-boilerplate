import React, { useCallback } from 'react';
import classNames from 'classnames';
import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import type { IconProp } from '@fortawesome/fontawesome-svg-core';
import styles from './assets/sidebar-item-link.module.scss';

interface Props {
    title: string;
    to: string;
    icon: IconProp;
}

const SidebarItemLink: React.FunctionComponent<Props> = ({ title, to, icon }: Props) => {
    const location = useLocation();
    const isActive = location.pathname === to;

    const onClick = useCallback(() => {
        if (document.body.classList.contains('sidebar-open')) {
            document.body.classList.remove('sidebar-open');
            document.body.classList.add('sidebar-closed', 'sidebar-collapse');
        }
    }, []);

    return (
        <li className={classNames('nav-item')} onClick={onClick}>
            <Link to={to} className={classNames('nav-link', isActive && 'active')}>
                <FontAwesomeIcon className={classNames(styles.icon, 'nav-icon')} icon={icon} />
                <p>{title}</p>
            </Link>
        </li>
    );
};

export default SidebarItemLink;
