import React, { useCallback, useMemo, useState } from 'react';
import classNames from 'classnames';
import SidebarItemLink from './SidebarItemLink';
import type { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { faCircle } from '@fortawesome/free-regular-svg-icons';
import styles from './assets/sidebar-item-tree.module.scss';
import { useLocation } from 'react-router-dom';

interface Props {
    title: string;
    icon: IconProp;
    items: Array<{ title: string; to: string }>;
}

const SidebarItemTree: React.FunctionComponent<Props> = ({ title, icon, items }: Props) => {
    const location = useLocation();
    const isActive = useMemo(() => {
        return items.filter((item) => location.pathname === item.to).length > 0;
    }, [location.pathname]);
    const [open, setOpen] = useState<boolean>(isActive);
    const handleClick = useCallback(() => {
        setOpen(!open);
    }, [open]);

    return (
        <li className={classNames('nav-item', 'has-treeview', open && 'menu-open')}>
            <a href="#" className={classNames('nav-link', isActive && 'active')} onClick={handleClick}>
                <FontAwesomeIcon className={classNames(styles.icon, 'nav-icon')} icon={icon} />
                <p>
                    {title}
                    <FontAwesomeIcon className={classNames('right')} icon={open ? faAngleDown : faAngleLeft} />
                </p>
            </a>
            <ul className={classNames('nav', 'nav-treeview')}>
                {items.map((item) => (
                    <SidebarItemLink key={item.to} {...item} icon={faCircle} />
                ))}
            </ul>
        </li>
    );
};

export default SidebarItemTree;
