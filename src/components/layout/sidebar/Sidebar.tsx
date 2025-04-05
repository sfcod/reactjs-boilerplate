import React from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import Router from '../../../navigation/router';
import routes from '../../../navigation/routes';
import SidebarItem from './SidebarItem';
import { faSuitcase, faTimes, faUsers } from '@fortawesome/free-solid-svg-icons';
import styles from './assets/sidebar.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Authenticated from 'src/components/auth/Authenticated';

const Sidebar: React.FunctionComponent = React.memo(() => {
    const handleCloseClick = (e: any) => {
        e.preventDefault();
        document.body.classList.remove('sidebar-open');
    };

    return (
        <aside className={classNames('sidebar-no-expand', 'main-sidebar', 'sidebar-dark-primary')}>
            <strong className={classNames('brand-link', 'text-center', styles.sidebarTop)}>
                <Link to={Router.generate(routes.DASHBOARD)} className={classNames('text-white', 'text-lg')}>
                    Company name
                </Link>
                <a
                    className={classNames(styles.burger, 'pushmenu')}
                    data-widget="pushmenu"
                    data-auto-collapse-size="1199"
                    href="#"
                    role={'button'}
                    onClick={handleCloseClick}
                >
                    <FontAwesomeIcon icon={faTimes} />
                </a>
            </strong>
            <div className={classNames('sidebar')}>
                <nav className={classNames('mt-2')}>
                    <ul className={classNames('nav', 'nav-pills', 'nav-sidebar', 'flex-column')}>
                        <Authenticated>
                            <>
                                <SidebarItem
                                    title="Companies"
                                    icon={faSuitcase}
                                    link={Router.generate(routes.DASHBOARD)}
                                />
                                <SidebarItem title="Users" icon={faUsers} link={Router.generate(routes.USER_LIST)} />
                            </>
                        </Authenticated>
                    </ul>
                </nav>
            </div>
        </aside>
    );
});

export default Sidebar;
