import React from 'react';
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { useResponsive } from '../../../hooks/responsive';

interface Props {
    sidebarControl?: boolean;
}

const Navigation: React.FunctionComponent<Props> = React.memo(({ sidebarControl = true }: Props) => {
    const { isDesktopOrLaptop } = useResponsive();
    const handleToggleClick = (e: any) => {
        e.preventDefault();
        if (isDesktopOrLaptop) {
            document.body.classList.toggle('sidebar-collapse');
            document.body.classList.remove('sidebar-open');
        } else {
            document.body.classList.toggle('sidebar-open');
            document.body.classList.remove('sidebar-collapse');
        }
    };
    return (
        <ul className={classNames('navbar-nav')}>
            {sidebarControl && (
                <li className={classNames('nav-item')}>
                    <a
                        className={classNames('px-3', 'nav-link', 'pushmenu')}
                        data-widget="pushmenu"
                        href="#"
                        role={'button'}
                        data-auto-collapse-size="1199"
                        onClick={handleToggleClick}
                    >
                        <FontAwesomeIcon icon={faBars} />
                    </a>
                </li>
            )}
        </ul>
    );
});

export default Navigation;
