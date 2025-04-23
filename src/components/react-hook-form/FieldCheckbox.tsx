import type { PropsWithChildren } from 'react';
import React from 'react';
import type { FieldWrapperProps } from './FieldWrapper';
import FieldWrapper from './FieldWrapper';
import { useFormContext } from 'react-hook-form';
import { Controller } from 'react-hook-form';
import classNames from 'classnames';
import Checkbox from '../ui/Checkbox';

type Props = {
    name: string;
    label?: FieldWrapperProps['label'];
    wrapperProps?: Omit<FieldWrapperProps, 'label'>;
    className?: string;
    errorClassName?: string;
} & React.ComponentProps<typeof Checkbox>;

const FieldCheckbox: React.FC<PropsWithChildren<Props>> = ({ children, wrapperProps, label, ...props }) => {
    const { control, getFieldState } = useFormContext();
    const { invalid, error } = getFieldState(props.name);
    const id = props.id || props.name;

    return (
        <Controller
            name={props.name}
            control={control}
            defaultValue={props.defaultValue ?? false}
            render={({ field }) => (
                <FieldWrapper
                    {...wrapperProps}
                    classNames={wrapperProps?.classNames}
                    labelFor={id}
                    error={error?.message}
                >
                    <Checkbox
                        aria-label={typeof label === 'string' ? label : (props.placeholder ?? '')}
                        aria-invalid={invalid}
                        id={id}
                        label={label}
                        {...props}
                        {...field}
                        className={classNames(props.className, invalid ? props.errorClassName || 'is-invalid' : '')}
                    />
                    {children}
                </FieldWrapper>
            )}
        />
    );
};

export default FieldCheckbox;
