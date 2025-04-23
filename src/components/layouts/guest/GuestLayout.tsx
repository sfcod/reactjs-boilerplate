import type { PropsWithChildren } from 'react';
import React from 'react';
import classNames from 'classnames';
import styles from './assets/guest-layout.module.scss';

interface Props {
    className?: string;
    classNameWrapper?: string;
}

const GuestLayout: React.FC<PropsWithChildren<Props>> = ({ children, className, classNameWrapper }) => {
    return (
        <div className={classNames(className)}>
            <main className={classNames(styles.main, classNameWrapper)}>{children}</main>
        </div>
    );
};

export default GuestLayout;
