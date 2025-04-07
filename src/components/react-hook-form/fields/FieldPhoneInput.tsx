import React, { useId, useState } from 'react';
import type { FieldWrapperProps } from './FieldWrapper';
import FieldWrapper from './FieldWrapper';
import { Controller } from 'react-hook-form';
import type { Control } from 'react-hook-form';
import type { Argument as ClassValue } from 'classnames';
import classNames from 'classnames';
import type { CommonFieldProps } from '../types/common';
import type { CountryData, PhoneInputProps } from 'react-phone-input-2';
import PhoneInput from 'react-phone-input-2';
import styles from '../assets/field-phone-input.module.scss';
import 'react-phone-input-2/lib/style.css';
import * as yup from 'yup';
import type { StringSchema } from 'yup';

interface Props extends CommonFieldProps, PhoneInputProps {
    control: Control<any>;
    wrapperProps?: FieldWrapperProps;
    inputClassName?: ClassValue;
    invalidInputClassName?: ClassValue;
    onChangeCountry?: (countryCode: string) => any;
    nullOnFieldClear?: boolean;
}

export const phoneValidationSchema = yup
    .string()
    .typeError('Phone Number is required field')
    .test({
        test: function (value, context) {
            const schema = context.schema as StringSchema;
            if (value === null && schema.spec.nullable) return true;
            if (value === undefined && schema.spec.optional === true) return true;

            if (!value) return false;

            const parsed = value.replace(/[\-_]/g, '');
            let regex: RegExp;
            let message: string;
            switch (true) {
                // US number
                case parsed.startsWith('+1'):
                    regex = /^\+[\d]{11}$/;
                    message = 'Valid phone format: +X XXX XXX XXXX';
                    break;
                // Other countries
                default:
                    regex = /^\+[\d]{10,15}$/;
                    message = 'Phone number should contain from 10 to 15 digits';
            }

            if (!regex.test(parsed)) {
                throw this.createError({ message });
            }

            return true;
        },
    })
    .label('Phone Number');

const FieldPhoneInput: React.FunctionComponent<Props> = ({
    control,
    wrapperProps,
    error,
    name,
    inputClassName,
    invalidInputClassName = '',
    onChangeCountry,
    nullOnFieldClear = false,
    ...rest
}: Props) => {
    const id = useId();
    const [counter, setCounter] = useState(0);
    const [country, setCountry] = useState('us');

    return (
        <Controller
            name={name as `${string}`}
            control={control}
            defaultValue=""
            render={({ field: { ref, ...field } }) => (
                <FieldWrapper {...wrapperProps} name={name} error={error}>
                    <PhoneInput
                        key={`${id}-${counter}`} // need this to remount component, so it handles null value correctly
                        disableCountryGuess={true}
                        countryCodeEditable={false}
                        preferredCountries={['us', 'ro']}
                        country={country}
                        {...rest}
                        {...field}
                        inputProps={{ ...rest.inputProps, ref }}
                        containerClass={classNames(styles.container, rest.containerClass)}
                        inputClass={classNames(styles.input, inputClassName, error && invalidInputClassName)}
                        onChange={(value, country: CountryData, e, ...restArgs) => {
                            onChangeCountry && onChangeCountry(country.countryCode);
                            const val = `+${rest.disableCountryCode ? country?.dialCode || 1 : ''}${value}`;

                            if (nullOnFieldClear && value === country?.dialCode) {
                                setCountry(country.countryCode);
                                field.onChange(null, country, e, ...restArgs);
                                // need this to remount component, so it handles null value correctly
                                setCounter((prev) => prev + 1);
                                return;
                            }
                            field.onChange(val, country, e, ...restArgs);
                        }}
                    />
                </FieldWrapper>
            )}
        />
    );
};

export default FieldPhoneInput;
