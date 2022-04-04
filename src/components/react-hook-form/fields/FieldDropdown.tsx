import React, { PropsWithChildren } from 'react';
import FieldWrapper, { FieldWrapperProps } from './FieldWrapper';
import { Controller } from 'react-hook-form';
import { Control } from 'react-hook-form/dist/types/form';
import { DropdownList } from 'react-widgets';
import classNames, { Argument as ClassValue } from 'classnames';
import { CommonFieldProps } from '../types/common';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';

export interface Props<T extends any = any> extends CommonFieldProps {
    control: Control<any>;
    data: T[];
    disabled?: boolean | T[];
    textField?: string | ((dataItem: any) => string);
    valueField?: string;
    placeholder?: string;
    defaultValue?: string;
    busy?: boolean;
    filter?: false | 'startsWith' | 'contains' | ((dataItem: any, str: string) => boolean);
    wrapperProps?: FieldWrapperProps;
    inputClassName?: ClassValue;
    invalidInputClassName?: ClassValue;
    groupBy?: string | ((dataItem: any) => any);
}

const FieldDropdown: React.FunctionComponent<Props> = <T extends any = any>({
    control,
    wrapperProps,
    error,
    name,
    placeholder,
    inputClassName,
    invalidInputClassName = 'border-danger',
    filter = 'contains',
    busy = false,
    data,
    defaultValue,
    disabled,
    textField = 'name',
    valueField = 'value',
    groupBy,
    children,
}: PropsWithChildren<Props<T>>) => (
    <Controller
        name={name as `${string}`}
        control={control}
        defaultValue={defaultValue}
        render={({ field }) => {
            field = {
                ...field,
                selectIcon: <FontAwesomeIcon className={classNames(error && 'text-danger')} icon={faChevronDown} />,
            } as any;

            return (
                <FieldWrapper {...wrapperProps} name={name} error={error}>
                    <DropdownList
                        containerClassName={classNames(inputClassName, error && invalidInputClassName)}
                        placeholder={placeholder}
                        busy={busy}
                        data={data}
                        disabled={disabled}
                        groupBy={groupBy}
                        dataKey={valueField}
                        textField={textField}
                        filter={filter}
                        {...field}
                    />
                    {children}
                </FieldWrapper>
            );
        }}
    />
);

export default FieldDropdown;
