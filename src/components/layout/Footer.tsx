import React from 'react';
import styles from './assets/footer.module.scss';
import classNames from 'classnames';

const Footer: React.FunctionComponent = React.memo(() => (
    <footer className={classNames(styles.footer)}>
        <div className={classNames(styles.bottom)}>
            <div className={classNames(styles.bottomHolder, 'container')}>
                <span>©{new Date().getFullYear()} Some company</span>
                <span>All Rights Reserved.</span>
            </div>
        </div>
    </footer>
));

export default Footer;
