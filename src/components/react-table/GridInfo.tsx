import React from 'react';
import classNames from 'classnames';
import styles from './assets/grid-info.module.scss';

interface Props {
    page: number;
    pageSize: number;
    totalCount?: number;
}

const GridInfo: React.FunctionComponent<Props> = React.memo(({ page, pageSize, totalCount = -1 }: Props) => {
    const from = (page - 1) * pageSize + 1;
    let to = page * pageSize;
    to = to < totalCount ? to : totalCount;

    if (to < 1) {
        return null;
    }

    return (
        <div className={classNames(styles.gridInfo)}>
            Showing {from} to {to} of {totalCount < 0 ? '?' : totalCount} {totalCount === 1 ? 'entry' : 'entries'}
        </div>
    );
});

export default GridInfo;
