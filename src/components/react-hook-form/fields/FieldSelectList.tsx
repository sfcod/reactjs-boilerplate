import React, { PropsWithChildren } from 'react';
import FieldWrapper, { FieldWrapperProps } from './FieldWrapper';
import { Controller } from 'react-hook-form';
import { Control } from 'react-hook-form/dist/types/form';
import { CommonFieldProps } from '../types/common';
import SelectList from 'react-widgets/lib/SelectList';

interface Props extends CommonFieldProps {
    control: Control;
    data: AnyObject[];
    disabled?: boolean | AnyObject[];
    textField?: string;
    valueField?: string;
    busy?: boolean;
    multiple?: boolean;
    wrapperProps?: FieldWrapperProps;
}

const FieldSelectList: React.FunctionComponent<Props> = ({
    control,
    wrapperProps,
    error,
    name,
    busy = false,
    data,
    disabled,
    textField = 'name',
    valueField = 'value',
    multiple = false,
    children,
}: PropsWithChildren<Props>) => (
    <Controller
        name={name}
        control={control}
        defaultValue={[]}
        render={(controlledProps) => (
            <FieldWrapper {...wrapperProps} name={name} error={error}>
                <SelectList
                    {...controlledProps}
                    multiple={multiple}
                    busy={busy}
                    data={data}
                    disabled={disabled}
                    textField={textField}
                    valueField={valueField}
                />
                {children}
            </FieldWrapper>
        )}
    />
);

export default FieldSelectList;
