import React, { DetailedHTMLProps, TextareaHTMLAttributes, PropsWithChildren } from 'react';
import { CommonFieldProps } from '../types/common';
import classNames from 'classnames';
import styles from '../assets/field-input.module.scss';
import FieldWrapper, { FieldWrapperProps } from './FieldWrapper';
import { Ref } from 'react-hook-form';
import { ClassValue } from 'classnames/types';

interface FieldTextAreaProps extends CommonFieldProps {
    register: (ref: Ref | null) => void;
    wrapperProps?: FieldWrapperProps;
    errorClassName?: ClassValue;
}

type Props = FieldTextAreaProps & DetailedHTMLProps<TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement>;

const FieldTextArea: React.FunctionComponent<PropsWithChildren<Props>> = ({
    error,
    wrapperProps,
    register,
    className = 'form-control',
    errorClassName = 'border-danger text-danger',
    id,
    children,
    ...props
}: Props) => (
    <FieldWrapper {...wrapperProps} name={props.name} error={error}>
        <textarea
            id={id || props.name}
            {...props}
            ref={register}
            className={classNames(styles.input, className, error && errorClassName)}
        />
        {children}
    </FieldWrapper>
);

export default FieldTextArea;
