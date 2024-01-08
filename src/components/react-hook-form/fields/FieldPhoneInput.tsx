import React from 'react';
import type { FieldWrapperProps } from './FieldWrapper';
import FieldWrapper from './FieldWrapper';
import { Controller } from 'react-hook-form';
import type { Control } from 'react-hook-form';
import type { Argument as ClassValue } from 'classnames';
import classNames from 'classnames';
import type { CommonFieldProps } from '../types/common';
import PhoneInput from 'react-phone-input-2';

interface Props extends CommonFieldProps {
    control: Control;
    wrapperProps?: FieldWrapperProps;
    inputClassName?: ClassValue;
    invalidInputClassName?: ClassValue;
    country?: string;
    disabled?: boolean;
}

const FieldPhoneInput: React.FunctionComponent<Props> = ({
    control,
    wrapperProps,
    error,
    name,
    inputClassName,
    invalidInputClassName = 'border-danger',
    country,
    disabled,
}: Props) => (
    <Controller
        name={name as `${string}`}
        control={control}
        defaultValue=""
        render={(controlledProps) => (
            <FieldWrapper {...wrapperProps} name={name} error={error}>
                <PhoneInput
                    {...controlledProps}
                    inputClass={classNames(inputClassName, error && invalidInputClassName)}
                    country={country}
                    disabled={disabled}
                />
            </FieldWrapper>
        )}
    />
);

export default FieldPhoneInput;
