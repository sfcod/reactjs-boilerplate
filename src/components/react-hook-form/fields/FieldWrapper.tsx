import React, { PropsWithChildren, ReactNode } from 'react';
import classNames from 'classnames';
import styles from '../assets/wrapper-input.module.scss';
import FormError from '../FormError';

export interface FieldWrapperProps {
    classNames?: {
        wrapperContainer?: any;
        labelContainer?: any;
        labelContainerError?: any;
        errorContainer?: any;
        errorMessage?: any;
        inputContainer?: any;
    };
    label?: ReactNode;
}

interface Props extends FieldWrapperProps {
    name: string;
    error?: string;
}

const FieldWrapper: React.FunctionComponent<Props> = ({
    label,
    children,
    name,
    error,
    classNames: classes,
}: PropsWithChildren<Props>) => (
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
