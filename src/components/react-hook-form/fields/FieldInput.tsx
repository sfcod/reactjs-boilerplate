import React, { DetailedHTMLProps, InputHTMLAttributes, PropsWithChildren } from 'react';
import classNames, { Argument as ClassValue } from 'classnames';
import styles from '../assets/field-input.module.scss';
import { Controller } from 'react-hook-form';
import { CommonFieldProps } from '../types/common';
import FieldWrapper, { FieldWrapperProps } from './FieldWrapper';
import { Control } from 'react-hook-form/dist/types/form';

interface FieldInputProps<Control> extends CommonFieldProps {
    wrapperProps?: FieldWrapperProps;
    errorClassName?: ClassValue;
    control: Control;
    inputClassName?: ClassValue;
    invalidInputClassName?: ClassValue;
    country?: string;
    disabled?: boolean;
}

type Props<C> = FieldInputProps<C> & DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

const FieldInput = <C extends Control<any>>({
    control,
    wrapperProps,
    className = 'form-control',
    errorClassName = 'border-danger text-danger',
    error,
    children,
    ...props
}: PropsWithChildren<Props<C>>) => (
    <Controller
        name={props.name}
        control={control}
        defaultValue=""
        render={({ field }) => (
            <FieldWrapper {...wrapperProps} classNames={wrapperProps?.classNames} name={props.name} error={error}>
                <input
                    id={props.id || props.name}
                    {...props}
                    {...field}
                    className={classNames(styles.input, className, error && errorClassName)}
                    placeholder={props.placeholder}
                />
                {children}
            </FieldWrapper>
        )}
    />
);

export default FieldInput;
