import type { ReactNode } from 'react';
import React from 'react';
import styles from './assets/button.module.scss';
import classNames from 'classnames';

interface Props {
    children: ReactNode | string;
    disabled?: boolean;
    type?: 'submit' | 'reset' | 'button';
    onClick?: () => void;
    className?: AnyObject | string;
    loading?: boolean;
}

const Button: React.FunctionComponent<Props & React.HTMLProps<HTMLButtonElement>> = ({
    children,
    type = 'button',
    onClick,
    className,
    disabled = false,
    loading,
    ...rest
}: Props) => (
    <button
        type={type}
        onClick={onClick}
        className={classNames(styles.button, 'btn', disabled && styles.disabled, className)}
        disabled={disabled}
        {...rest}
    >
        {loading && (
            <span
                className={classNames('spinner-border', 'spinner-border-sm', 'mr-1')}
                role="status"
                aria-hidden="true"
            />
        )}
        {children}
    </button>
);

export default Button;
