import React, { DetailedHTMLProps, InputHTMLAttributes, PropsWithChildren } from 'react';
import classNames, { Argument as ClassValue } from 'classnames';
import styles from '../assets/field-input.module.scss';
import { Controller } from 'react-hook-form';
import { CommonFieldProps } from '../types/common';
import FieldWrapper, { FieldWrapperProps } from './FieldWrapper';
import { Control } from 'react-hook-form/dist/types/form';

interface FieldInputProps extends CommonFieldProps {
    wrapperProps?: FieldWrapperProps;
    errorClassName?: any;
    control: Control;
    inputClassName?: ClassValue;
    invalidInputClassName?: ClassValue;
    country?: string;
    disabled?: boolean;
}

type Props = FieldInputProps & DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

const FieldInput: React.FunctionComponent<PropsWithChildren<Props>> = ({
    control,
    wrapperProps,
    className = 'form-control',
    errorClassName = 'border-danger text-danger',
    error,
    children,
    ...props
}: PropsWithChildren<Props>) => (
    <Controller
        name={props.name as `${string}`}
        control={control}
        defaultValue=""
        render={(controlledProps) => (
            <FieldWrapper {...wrapperProps} classNames={wrapperProps?.classNames} name={props.name} error={error}>
                <input
                    id={props.id || props.name}
                    {...props}
                    {...controlledProps}
                    className={classNames(styles.input, className, error && errorClassName)}
                    placeholder={props.placeholder}
                />
                {children}
            </FieldWrapper>
        )}
    />
);

export default FieldInput;
