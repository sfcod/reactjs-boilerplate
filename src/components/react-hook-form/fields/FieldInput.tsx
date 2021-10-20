import React, { DetailedHTMLProps, InputHTMLAttributes, PropsWithChildren } from 'react';
import classNames from 'classnames';
import styles from '../assets/field-input.module.scss';
import { Ref } from 'react-hook-form';
import { CommonFieldProps } from '../types/common';
import FieldWrapper, { FieldWrapperProps } from './FieldWrapper';

interface FieldInputProps extends CommonFieldProps {
    register: (ref: Ref | null) => void;
    wrapperProps?: FieldWrapperProps;
    errorClassName?: any;
}

type Props = FieldInputProps & DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;
//@TODO Fix props
const FieldInput: React.FunctionComponent<any> = ({
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
