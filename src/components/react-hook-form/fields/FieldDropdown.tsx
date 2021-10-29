import React, { PropsWithChildren } from 'react';
import FieldWrapper, { FieldWrapperProps } from './FieldWrapper';
import { Controller } from 'react-hook-form';
import { Control } from 'react-hook-form/dist/types/form';
import DropdownList from 'react-widgets/lib/DropdownList';
import classNames, { Argument as ClassValue } from 'classnames';
import { CommonFieldProps } from '../types/common';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';

interface Props extends CommonFieldProps {
    control: Control;
    data: AnyObject[] | any[];
    disabled?: boolean | AnyObject[];
    textField?: string | ((dataItem: any) => string);
    valueField?: string;
    placeholder?: string;
    busy?: boolean;
    filter?: false | 'startsWith' | 'contains' | 'endsWith' | ((dataItem: any, str: string) => boolean);
    wrapperProps?: FieldWrapperProps;
    inputClassName?: ClassValue;
    invalidInputClassName?: ClassValue;
    groupBy?: string | ((dataItem: any) => any);
}

const FieldDropdown: React.FunctionComponent<Props> = ({
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
    disabled,
    textField = 'name',
    valueField = 'value',
    groupBy,
    children,
}: PropsWithChildren<Props>) => (
    <Controller
        name={name as `${string}`}
        control={control}
        defaultValue={null}
        render={(controlledProps) => {
            controlledProps = {
                ...controlledProps,
                selectIcon: <FontAwesomeIcon className={classNames(error && 'text-danger')} icon={faChevronDown} />,
            } as any;

            return (
                <FieldWrapper {...wrapperProps} name={name} error={error}>
                    <DropdownList
                        {...controlledProps}
                        containerClassName={classNames(inputClassName, error && invalidInputClassName)}
                        placeholder={placeholder}
                        filter={filter}
                        busy={busy}
                        data={data}
                        disabled={disabled}
                        textField={textField}
                        valueField={valueField}
                        groupBy={groupBy}
                    />
                    {children}
                </FieldWrapper>
            );
        }}
    />
);

export default FieldDropdown;
