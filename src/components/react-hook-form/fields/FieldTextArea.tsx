import type { DetailedHTMLProps, InputHTMLAttributes, PropsWithChildren } from 'react';
import React from 'react';
import type { Argument as ClassValue } from 'classnames';
import classNames from 'classnames';
import styles from '../assets/field-textarea.module.scss';
import { Controller } from 'react-hook-form';
import type { CommonFieldProps } from '../types/common';
import type { FieldWrapperProps } from './FieldWrapper';
import FieldWrapper from './FieldWrapper';
import type { Control } from 'react-hook-form';

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
