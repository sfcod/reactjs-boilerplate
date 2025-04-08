import React from 'react';
import styles from './assets/footer.module.scss';
import classNames from 'classnames';
import { DateTime } from 'luxon';

const Footer: React.FunctionComponent = React.memo(() => (
    <footer className={classNames(styles.footer, 'main-footer')}>All rights reserved. {DateTime.now().year}</footer>
));

export default Footer;
