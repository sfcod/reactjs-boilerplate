import React from 'react';
import classNames from 'classnames';

type Props = {} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const Button: React.FC<Props> = ({ children, ...props }) => {
    return (
        <button {...props} className={classNames('btn', props.className)}>
            {children}
        </button>
    );
};

export default Button;
