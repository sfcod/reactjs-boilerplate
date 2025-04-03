import type { ReactNode } from 'react';
import styles from './assets/base-layout.module.scss';
import classNames from 'classnames';
import Header from './header/Header';
import Footer from './footer/Footer';
import Main from './Main';
import Sidebar from './sidebar/Sidebar';

interface Props {
    children?: ReactNode;
}

const MainLayout = ({ children }: Props) => (
    <div className={classNames(styles.layout)}>
        <div className={classNames(styles.content)}>
            <Header />
            <Sidebar />
            <Main>{children}</Main>
        </div>
        <Footer />
    </div>
);

export default MainLayout;
