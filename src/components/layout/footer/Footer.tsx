import React from 'react';
import styles from './assets/footer.module.scss';
import classNames from 'classnames';
import moment from 'moment';

const Footer: React.FunctionComponent = React.memo(() => (
    <footer className={classNames(styles.footer, 'main-footer')}>All rights reserved. {moment().year()}</footer>
));

export default Footer;
