import type { PropsWithChildren, ReactNode } from 'react';
import React from 'react';
import type { Argument as ClassValue } from 'classnames';
import classNames from 'classnames';
import FormError from '../ui/Error';
import Label from '../ui/Label';

export interface FieldWrapperProps {
    classNames?: {
        container?: ClassValue;
        label?: ClassValue;
        error?: ClassValue;
        containerError?: ClassValue;
        labelError?: ClassValue;
    };
    label?: ReactNode;
    labelFor?: string;
}

interface Props extends FieldWrapperProps {
    error?: string;
}

const FieldWrapper: React.FunctionComponent<PropsWithChildren<Props>> = ({
    label,
    children,
    labelFor,
    error,
    classNames: classes,
}) => (
    <div className={classNames('form-group mb-3', classes?.container, error && classes?.containerError)}>
        {label && (
            <Label
                htmlFor={labelFor}
                className={classNames(classes?.label, error && (classes?.labelError ?? 'text-danger'))}
            >
                {label}
            </Label>
        )}
        {children}
        {error && <FormError className={classNames('mt-1', classes?.error)}>{error}</FormError>}
    </div>
);

export default FieldWrapper;
