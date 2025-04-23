import React from 'react';
import { Spinner } from 'react-bootstrap';
import classNames from 'classnames';

interface Props {
    className?: string;
}

const Loader: React.FC<Props> = ({ className }) => {
    return (
        <div
            className={classNames(
                'position-absolute',
                'w-100',
                'h-100',
                'd-flex',
                'justify-content-center',
                'align-items-center',
                className,
            )}
        >
            <Spinner animation="border" role="status" variant={'primary'}>
                <span className="visually-hidden">Loading...</span>
            </Spinner>
        </div>
    );
};

export default Loader;
