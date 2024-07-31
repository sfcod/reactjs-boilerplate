import type { PropsWithChildren, ReactNode } from 'react';
import React from 'react';
import type { Argument as ClassValue } from 'classnames';
import classNames from 'classnames';
import styles from '../assets/wrapper-input.module.scss';
import FormError from '../FormError';

export interface FieldWrapperProps {
    classNames?: {
        wrapperContainer?: ClassValue;
        labelContainer?: ClassValue;
        labelContainerError?: ClassValue;
        errorContainer?: ClassValue;
        errorMessage?: ClassValue;
        inputContainer?: ClassValue;
    };
    label?: ReactNode;
    noWrapper?: boolean;
}

interface Props extends FieldWrapperProps {
    name: string;
    error?: string;
}

const FieldWrapper: React.FunctionComponent<PropsWithChildren<Props>> = ({
    label,
    children,
    name,
    error,
    classNames: classes,
    noWrapper,
}) =>
    noWrapper ? (
        <>{children}</>
    ) : (
        <div className={classNames(styles.wrapperContainer, 'form-group', classes?.wrapperContainer)}>
            {label && (
                <label
                    htmlFor={name}
                    className={classNames(
                        classes?.labelContainer ?? 'form-label',
                        error && (classes?.labelContainerError ?? 'text-danger'),
                    )}
                >
                    {label}
                </label>
            )}
            <div className={classNames(styles.inputContainer, classes?.inputContainer)}>{children}</div>
            {error && (
                <FormError
                    classNames={{
                        errorMessage: classes?.errorMessage,
                        errorContainer: classes?.errorContainer,
                    }}
                    error={error}
                />
            )}
        </div>
    );

export default FieldWrapper;
