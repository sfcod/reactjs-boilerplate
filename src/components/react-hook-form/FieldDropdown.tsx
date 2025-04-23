import type { PropsWithChildren } from 'react';
import React from 'react';
import type { FieldWrapperProps } from './FieldWrapper';
import FieldWrapper from './FieldWrapper';
import { useFormContext } from 'react-hook-form';
import { Controller } from 'react-hook-form';
import type { Props as DropdownProps } from '../ui/Dropdown';
import Dropdown from '../ui/Dropdown';

type Props<T, M extends boolean> = {
    name: string;
    label?: FieldWrapperProps['label'];
    wrapperProps?: Omit<FieldWrapperProps, 'label'>;
    className?: string;
    errorClassName?: string;
} & DropdownProps<T, M>;

const FieldDropdown = <T = any, M extends boolean = false>({
    children,
    wrapperProps,
    label,
    ...props
}: PropsWithChildren<Props<T, M>>) => {
    const { control, getFieldState } = useFormContext();
    const { error } = getFieldState(props.name);
    const id = props.id || props.name;

    const getValue = (value: any) => {
        return value instanceof Object ? value : props.options?.find((option) => option.value === value);
    };

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
                    <Dropdown
                        getOptionLabel={(item: any) => item.label || item.name}
                        {...props}
                        {...field}
                        value={getValue(field.value)}
                        onChange={(...args) => {
                            props.onChange && props.onChange(...args);
                            field.onChange(...args);
                        }}
                    />
                    {children}
                </FieldWrapper>
            )}
        />
    );
};

export default FieldDropdown;
