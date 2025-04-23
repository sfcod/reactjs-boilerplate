import type { PropsWithChildren } from 'react';
import React from 'react';
import type { FieldWrapperProps } from './FieldWrapper';
import FieldWrapper from './FieldWrapper';
import Input from '../ui/Input';
import { useFormContext } from 'react-hook-form';
import { Controller } from 'react-hook-form';
import classNames from 'classnames';

type Props = {
    name: string;
    label?: FieldWrapperProps['label'];
    wrapperProps?: Omit<FieldWrapperProps, 'label'>;
    className?: string;
    errorClassName?: string;
} & React.ComponentProps<typeof Input>;

const FieldInput: React.FC<PropsWithChildren<Props>> = ({ children, wrapperProps, label, ...props }) => {
    const { control, getFieldState } = useFormContext();
    const { invalid, error } = getFieldState(props.name);
    const id = props.id || props.name;

    return (
        <Controller
            name={props.name}
            control={control}
            defaultValue={props.defaultValue || ''}
            render={({ field }) => (
                <FieldWrapper
                    {...wrapperProps}
                    label={label}
                    classNames={wrapperProps?.classNames}
                    labelFor={id}
                    error={error?.message}
                >
                    <Input
                        aria-label={typeof label === 'string' ? label : (props.placeholder ?? '')}
                        aria-invalid={invalid}
                        id={id}
                        {...props}
                        {...field}
                        className={classNames(props.className, invalid ? props.errorClassName || 'is-invalid' : '')}
                        placeholder={props.placeholder}
                    />
                    {children}
                </FieldWrapper>
            )}
        />
    );
};

export default FieldInput;
