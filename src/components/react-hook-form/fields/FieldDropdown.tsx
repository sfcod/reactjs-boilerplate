import type { PropsWithChildren } from 'react';
import React from 'react';
import type { FieldWrapperProps } from './FieldWrapper';
import FieldWrapper from './FieldWrapper';
import { Controller } from 'react-hook-form';
import type { Control } from 'react-hook-form';
import { DropdownList } from 'react-widgets';
import type { Argument as ClassValue } from 'classnames';
import classNames from 'classnames';
import type { CommonFieldProps } from '../types/common';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';

export interface Props<T extends any = any> extends CommonFieldProps {
    control: Control<any>;
    data: T[];
    disabled?: boolean | T[];
    textField?: string | ((dataItem: any) => string);
    valueField?: string;
    placeholder?: string;
    defaultValue?: string | number; // Allow number as defaultValue
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
        render={({ field: { onChange, value, ...restField } }) => {
            const selectedItem = data.find((item) => (item as Record<string, any>)[valueField] === value) || null;

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
                        value={selectedItem || value}
                        onChange={(selected) => {
                            const newValue = selected ? (selected as Record<string, any>)[valueField] : null;
                            onChange(newValue);
                        }}
                        selectIcon={
                            <FontAwesomeIcon className={classNames(error && 'text-danger')} icon={faChevronDown} />
                        }
                        {...restField}
                    />
                    {children}
                </FieldWrapper>
            );
        }}
    />
);

export default FieldDropdown;
