import React from 'react';
import classNames from 'classnames';

type Props = {} & React.HTMLAttributes<HTMLDivElement>;

const Error: React.FC<Props> = ({ children, ...props }) => {
    return (
        <div {...props} className={classNames('small text-danger', props.className)}>
            {children}
        </div>
    );
};

export default Error;
