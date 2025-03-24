import type { PropsWithChildren } from 'react';
import React from 'react';
import styles from './assets/base-layout.module.scss';
import classNames from 'classnames';
import Main from './Main';

interface Props {}

const AuthLayout: React.FunctionComponent<Props> = ({ children }: PropsWithChildren<Props>) => (
    <div className={classNames(styles.layout)}>
        <div className={classNames(styles.content)}>
            <header />
            <Main>{children}</Main>
        </div>
        <footer />
    </div>
);

export default AuthLayout;
