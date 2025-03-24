import React from 'react';
import moment from 'moment';
import { DATETIME_FORMAT } from 'src/config/env';
import styles from '../assets/date-time-column.module.scss';
import classNames from 'classnames';

interface Props {
    value: string;
    format?: string;
    hoverDateFormat?: string;
}

const DateTimeColumn: React.FC<Props> = ({ format = DATETIME_FORMAT, hoverDateFormat = DATETIME_FORMAT, value }) => (
    <span
        title={hoverDateFormat && hoverDateFormat != format ? moment(value).format(hoverDateFormat) : undefined}
        className={classNames(styles.container)}
    >
        {moment(value).format(format)}
    </span>
);

export default React.memo(DateTimeColumn);
