import React from 'react';
import classNames from 'classnames';

interface Props {
    pageIndex: number;
    gotoPage?: (pageIndex: number) => void;
    className?: string;
    text?: string;
}

const PageItem: React.FunctionComponent<Props> = React.memo(({ pageIndex, gotoPage, text, className }: Props) => (
    <li className={classNames('page-item', className)}>
        <button className={classNames('page-link')} onClick={() => (gotoPage ? gotoPage(pageIndex) : null)}>
            {text ? text : pageIndex + 1}
        </button>
    </li>
));

export default PageItem;
