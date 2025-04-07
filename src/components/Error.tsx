import React from 'react';
import classNames from 'classnames';

interface Props {
    code?: number;
    message?: string;
}

const Error: React.FC<Props> = ({ code, message }: Props) => {
    return (
        <div className={classNames('container')}>
            <div className={classNames('text-center', 'my-5', 'py-5')}>
                <h1 className={classNames('display-1')}>{code}</h1>
                <p>{message}</p>
            </div>
        </div>
    );
};

Error.defaultProps = {
    code: 404,
    message: 'Page Not found',
};

export default Error;
