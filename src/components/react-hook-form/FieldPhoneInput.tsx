import type { PropsWithChildren } from 'react';
import React from 'react';
import type { FieldWrapperProps } from './FieldWrapper';
import FieldWrapper from './FieldWrapper';
import { useFormContext } from 'react-hook-form';
import { Controller } from 'react-hook-form';
import classNames from 'classnames';
import PhoneInput from '../ui/PhoneInput';

type Props = {
    name: string;
    label?: FieldWrapperProps['label'];
    wrapperProps?: Omit<FieldWrapperProps, 'label'>;
    className?: string;
    errorClassName?: string;
    id?: string;
} & React.ComponentProps<typeof PhoneInput>;

const FieldPhoneInput: React.FC<PropsWithChildren<Props>> = ({ children, wrapperProps, label, ...props }) => {
    const { control, getFieldState } = useFormContext();
    const { invalid, error } = getFieldState(props.name);
    const id = props.id || props.name;

    return (
        <Controller
            name={props.name}
            control={control}
            render={({ field }) => (
                <FieldWrapper
                    {...wrapperProps}
                    label={label}
                    classNames={{
                        ...wrapperProps?.classNames,
                        label: classNames(wrapperProps?.classNames?.label, 'd-block'),
                    }}
                    labelFor={id}
                    error={error?.message}
                >
                    <PhoneInput
                        {...props}
                        initOptions={{ containerClass: 'w-100' }}
                        ref={field.ref}
                        onChangeNumber={(val) => {
                            props.onChangeNumber && props.onChangeNumber(val);
                            field.onChange(val);
                        }}
                        inputProps={{
                            ...(props.inputProps || {}),
                            className: classNames(props.className, invalid ? props.errorClassName || 'is-invalid' : ''),
                        }}
                        initialValue={field.value}
                    />
                    {children}
                </FieldWrapper>
            )}
        />
    );
};

export default FieldPhoneInput;
