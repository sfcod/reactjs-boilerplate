import React, { ReactNode } from 'react';
import styles from './assets/button.module.scss';
import classNames from 'classnames';

interface Props {
    children: ReactNode | string;
    disabled?: boolean;
    type?: 'submit' | 'reset' | 'button';
    onClick?: () => void;
    className?: AnyObject | string;
}

const Button: React.FunctionComponent<Props> = ({ children, type, onClick, className, disabled }: Props) => (
    <button
        type={type}
        onClick={onClick}
        className={classNames(styles.button, disabled && styles.disabled, className)}
        disabled={disabled}
    >
        {children}
    </button>
);

Button.defaultProps = {
    type: 'button',
    disabled: false,
};

export default Button;
