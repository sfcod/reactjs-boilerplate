import * as React from 'react';
import { DropdownList } from 'react-widgets';
import { BaseFieldProps, Field, GenericField, WrappedFieldProps } from 'redux-form';
import { FieldWrapper, FieldWrapperConfig } from './FieldWrapper';
import { ReactNode } from 'react';

interface DropdownComponentProps {
    data: any[];
    disabled?: boolean | any[];
    textField?: string;
    valueField?: string;
    busy?: boolean;
    filter?: false | 'startsWith' | 'endsWith' | 'contains' | ((dataItem: any, searchTerm: string) => boolean);
    wrapperConfig?: FieldWrapperConfig;
    children?: ReactNode;
}

type InputProps = DropdownComponentProps & WrappedFieldProps;

/**
 * InputDropdownComponent which renders wrapped input dropdown list field with label and error
 *
 * @constructor
 */
const InputDropdownComponent: React.FunctionComponent<InputProps> = (props: InputProps) => (
    <FieldWrapper {...props.wrapperConfig} name={props.input.name} meta={props.meta}>
        <DropdownList
            filter={props.filter}
            busy={props.busy}
            data={props.data}
            disabled={props.disabled}
            textField={props.textField}
            valueField={props.valueField}
            onChange={props.input.onChange}
            value={props.input.value}
        />
        {props.children}
    </FieldWrapper>
);

InputDropdownComponent.defaultProps = {
    textField: 'name',
    valueField: 'value',
    busy: false,
    filter: 'contains',
};

const FieldDropdownComponent = Field as new () => GenericField<DropdownComponentProps>;

type FieldProps = BaseFieldProps<DropdownComponentProps> & DropdownComponentProps;

/**
 * FieldDropdown component which extends GenericField from redux form and renders DropdownList input field
 * (InputDropdownComponent) with all needed props
 *
 * @param props
 * @constructor
 */
export const FieldDropdown: React.FunctionComponent<FieldProps> = (props: FieldProps) => (
    <FieldDropdownComponent {...props} component={InputDropdownComponent} />
);
