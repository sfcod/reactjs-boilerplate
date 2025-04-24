import type { PropsWithChildren } from 'react';
import React from 'react';
import classNames from 'classnames';
import Loader from '../../ui/Loader';

interface Props {
    loading?: boolean;
    className?: string;
}

const Content: React.FunctionComponent<PropsWithChildren<Props>> = ({ children, loading = false, className }) => {
    if (loading) {
        return <Loader />;
    }

    return (
        <section className={classNames('content', 'position-relative', className)}>
            <div className={classNames('container-fluid')}>{children}</div>
        </section>
    );
};

export default Content;
