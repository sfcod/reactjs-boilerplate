import React, { ReactNode } from 'react';
import styles from './assets/base-layout.module.scss';
import classNames from 'classnames';
import Header from './Header';
import Footer from './Footer';
import Main from './Main';

interface Props {
    children?: ReactNode;
}

const MainLayout: React.FunctionComponent<Props> = ({ children }: Props) => (
    <div className={classNames(styles.layout)}>
        <div className={classNames(styles.content)}>
            <Header />
            <Main>{children}</Main>
        </div>
        <Footer />
    </div>
);

export default MainLayout;
