import * as React from 'react';
import { SelectList } from 'react-widgets';
import { BaseFieldProps, Field, GenericField, WrappedFieldProps } from 'redux-form';
import { FieldWrapper, FieldWrapperConfig } from './FieldWrapper';
import { ReactNode } from 'react';

interface SelectListComponentProps {
    data: AnyObject[];
    disabled?: boolean | AnyObject[];
    textField?: string;
    valueField?: string;
    busy?: boolean;
    multiple?: boolean;
    wrapperConfig?: FieldWrapperConfig;
    children?: ReactNode;
}

type InputProps = SelectListComponentProps & WrappedFieldProps;

/**
 * InputSelectListComponent which renders wrapped input SelectList field with label and error
 *
 * @constructor
 */
const InputSelectListComponent: React.FunctionComponent<InputProps> = (props: InputProps) => (
    <FieldWrapper {...props.wrapperConfig} name={props.input.name} meta={props.meta}>
        <SelectList
            multiple={props.multiple}
            busy={props.busy}
            data={props.data}
            disabled={props.disabled}
            textField={props.textField}
            valueField={props.valueField}
            onChange={props.input.onChange}
            value={props.input.value || []}
        />
        {props.children}
    </FieldWrapper>
);

InputSelectListComponent.defaultProps = {
    textField: 'name',
    valueField: 'value',
    busy: false,
    multiple: false,
};

const FieldSelectListComponent = Field as new () => GenericField<SelectListComponentProps>;

type FieldProps = BaseFieldProps<SelectListComponentProps> & SelectListComponentProps;

/**
 * FieldMultiSelect component which extends GenericField from redux form and renders SelectList input field
 * (InputSelectListComponent) with all needed props
 *
 * @param props
 * @constructor
 */
export const FieldSelectList: React.FunctionComponent<FieldProps> = (props: FieldProps) => (
    <FieldSelectListComponent {...props} component={InputSelectListComponent} />
);
