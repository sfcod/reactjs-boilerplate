import React, { DetailedHTMLProps, InputHTMLAttributes, PropsWithChildren } from 'react';
import classNames from 'classnames';
import styles from '../assets/field-input.module.scss';
import { ClassValue } from 'classnames/types';
import { Ref } from 'react-hook-form';
import { CommonFieldProps } from '../types/common';
import FieldWrapper, { FieldWrapperProps } from './FieldWrapper';

interface FieldInputProps extends CommonFieldProps {
    register: (ref: Ref | null) => void;
    wrapperProps?: FieldWrapperProps;
    errorClassName?: ClassValue;
}

type Props = FieldInputProps & DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

const FieldInput: React.FunctionComponent<Props> = ({
    wrapperProps,
    className = 'form-control',
    errorClassName = 'border-danger text-danger',
    register,
    error,
    children,
    ...props
}: PropsWithChildren<Props>) => (
    <FieldWrapper {...wrapperProps} classNames={wrapperProps?.classNames} name={props.name} error={error}>
        <input
            id={props.id || props.name}
            {...props}
            ref={register}
            className={classNames(styles.input, className, error && errorClassName)}
            placeholder={props.placeholder}
        />
        {children}
    </FieldWrapper>
);

export default FieldInput;
