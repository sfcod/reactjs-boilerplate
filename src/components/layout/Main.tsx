import type { ReactNode } from 'react';
import React from 'react';
import styles from './assets/main.module.scss';
import classNames from 'classnames';

interface Props {
    children?: ReactNode;
}

const Main: React.FunctionComponent<Props> = ({ children }: Props) => (
    <main className={classNames(styles.main, 'content-wrapper', 'position-relative')}>{children}</main>
);

export default Main;
