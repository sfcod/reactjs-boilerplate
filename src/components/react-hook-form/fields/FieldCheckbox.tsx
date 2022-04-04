import { CommonFieldProps } from '../types/common';
import FieldWrapper, { FieldWrapperProps } from './FieldWrapper';
import { Control } from 'react-hook-form/dist/types/form';
import { Controller } from 'react-hook-form';
import classNames, { Argument as ClassValue } from 'classnames';
import React, { DetailedHTMLProps, InputHTMLAttributes, PropsWithChildren } from 'react';

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

const FieldCheckbox = <C extends Control<any>>({
    control,
    wrapperProps,
    className,
    errorClassName = 'border-danger text-danger',
    error,
    children,
    ...props
}: PropsWithChildren<Props<C>>) => {
    return (
        <Controller
            name={props?.name}
            control={control}
            defaultValue=""
            render={({ field }) => (
                <FieldWrapper {...wrapperProps} classNames={wrapperProps?.classNames} name={props.name} error={error}>
                    <input
                        id={props.id || props.name}
                        type="checkbox"
                        {...props}
                        {...field}
                        className={classNames(className, error && errorClassName)}
                        placeholder={props.placeholder}
                    />
                    {children}
                </FieldWrapper>
            )}
        />
    );
};

export default FieldCheckbox;
