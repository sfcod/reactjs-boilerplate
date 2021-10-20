import React, { PropsWithChildren } from 'react';
import { Value } from 'classnames';
import FieldWrapper, { FieldWrapperProps } from './FieldWrapper';
import { Controller } from 'react-hook-form';
import { Control } from 'react-hook-form/dist/types/form';
import { DropdownList } from 'react-widgets';
import classNames from 'classnames';
import { CommonFieldProps } from '../types/common';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';

interface Props extends CommonFieldProps {
    control: Control;
    data: AnyObject[];
    disabled?: boolean | AnyObject[];
    textField?: string;
    valueField?: string;
    placeholder?: string;
    busy?: boolean;
    // filter?: false | 'startsWith' | 'endsWith' | 'contains' | ((dataItem: any, searchTerm: string) => boolean);
    filter?: any;
    wrapperProps?: FieldWrapperProps;
    inputClassName?: Value;
    invalidInputClassName?: Value;
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
        name={name}
        control={control}
        defaultValue={null}
        render={(controlledProps) => {
            // @types lacks "selectIcon" property
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
                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                        // @ts-ignore
                        valueField={valueField as any}
                        groupBy={groupBy}
                    />
                    {children}
                </FieldWrapper>
            );
        }}
    />
);

export default FieldDropdown;
