import * as React from 'react';
import styles from './assets/loader.module.scss';
import classNames from 'classnames';

const Loader: React.FunctionComponent = () => (
    <div className={classNames(styles.loader)}>
        <div className={classNames(styles.holder, 'd-flex', 'justify-content-center', 'align-items-center')}>
            <div className={classNames('spinner-border', 'text-primary')} role="status">
                <span className={classNames('sr-only')}>Loading...</span>
            </div>
        </div>
    </div>
);

export default Loader;
