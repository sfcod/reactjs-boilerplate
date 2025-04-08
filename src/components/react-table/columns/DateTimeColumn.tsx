import React from 'react';
import { DATETIME_FORMAT } from 'src/config/env';
import styles from '../assets/date-time-column.module.scss';
import classNames from 'classnames';
import { DateTime } from 'luxon';

interface Props {
    value: string;
    format?: string;
    hoverDateFormat?: string;
}

const DateTimeColumn: React.FC<Props> = ({ format = DATETIME_FORMAT, hoverDateFormat = DATETIME_FORMAT, value }) => {
    const dateTime = DateTime.fromJSDate(new Date(value));

    return (
        <span
            title={hoverDateFormat && hoverDateFormat !== format ? dateTime.toFormat(hoverDateFormat) : undefined}
            className={classNames(styles.container)}
        >
            {dateTime.toFormat(format)}
        </span>
    );
};
export default React.memo(DateTimeColumn);
