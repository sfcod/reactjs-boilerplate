import React, { ReactNode } from 'react';
import styles from './assets/main.module.scss';
import classNames from 'classnames';

interface Props {
    children?: ReactNode;
}

const Main: React.FunctionComponent<Props> = ({ children }: Props) => (
    <main className={classNames(styles.main)}>{children}</main>
);

export default Main;
