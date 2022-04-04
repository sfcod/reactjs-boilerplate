import React, { DetailedHTMLProps, InputHTMLAttributes, PropsWithChildren } from 'react';
import classNames, { Argument as ClassValue } from 'classnames';
import styles from '../assets/field-textarea.module.scss';
import { Controller } from 'react-hook-form';
import { CommonFieldProps } from '../types/common';
import FieldWrapper, { FieldWrapperProps } from './FieldWrapper';
import { Control } from 'react-hook-form/dist/types/form';

interface FieldTextAreaProps<Control> extends CommonFieldProps {
    wrapperProps?: FieldWrapperProps;
    errorClassName?: ClassValue;
    control: Control;
    inputClassName?: ClassValue;
    invalidInputClassName?: ClassValue;
    disabled?: boolean;
}

type Props<T> = FieldTextAreaProps<T> &
    DetailedHTMLProps<InputHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement>;

const FieldTextArea = <T extends Control<any>>({
    control,
    wrapperProps,
    className = 'form-control',
    errorClassName = 'border-danger text-danger',
    error,
    children,
    ...props
}: PropsWithChildren<Props<T>>) => (
    <Controller
        name={props.name}
        control={control}
        defaultValue=""
        render={({ field }) => (
            <FieldWrapper {...wrapperProps} classNames={wrapperProps?.classNames} name={props.name} error={error}>
                <textarea
                    id={props.id || props.name}
                    {...props}
                    {...field}
                    className={classNames(styles.textarea, className, error && errorClassName)}
                    placeholder={props.placeholder}
                />
                {children}
            </FieldWrapper>
        )}
    />
);

export default FieldTextArea;
