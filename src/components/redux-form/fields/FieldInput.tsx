import * as React from 'react';
import { InputHTMLAttributes, ReactNode } from 'react';
import { BaseFieldProps, Field, GenericField, WrappedFieldProps } from 'redux-form';
import { FieldWrapper, FieldWrapperConfig } from './FieldWrapper';
import classNames from 'classnames';

/**
 * Input props
 */
export interface InputComponentProps extends InputHTMLAttributes<HTMLInputElement> {
    inputStyle?: AnyObject | string;
    inputErrorStyle?: AnyObject | string;
    wrapperConfig?: FieldWrapperConfig;
    children?: ReactNode;
}

type InputProps = InputComponentProps & WrappedFieldProps;

/**
 * InputComponent which renders wrapped input field with label and error
 *
 * @constructor
 */
const InputComponent: React.FunctionComponent<InputProps> = (props: InputProps) => {
    const hasError = !props.meta.valid && props.meta.touched;

    return (
        <FieldWrapper
            {...props.wrapperConfig}
            classes={props.wrapperConfig?.classes || {}}
            name={props.input.name}
            meta={props.meta}
        >
            <input
                id={props.id || undefined}
                {...props.input}
                className={classNames(props.inputStyle, hasError && props.inputErrorStyle)}
                placeholder={props.placeholder}
                type={props.type}
                min={props.min}
                max={props.max}
                step={props.step}
                accept={props.accept}
                value={props.type === 'file' ? undefined : props.input.value}
            />
            {props.children}
        </FieldWrapper>
    );
};

InputComponent.defaultProps = {
    inputStyle: 'form-control',
    inputErrorStyle: 'border-danger',
};

const FieldInputComponent = Field as new () => GenericField<InputComponentProps>;

type FieldProps = BaseFieldProps<InputComponentProps> & InputComponentProps;

/**
 * FieldInput component which extends GenericField from redux form and renders input field
 * (InputComponent) with all needed props
 *
 * @param props
 * @constructor
 */
export const FieldInput: React.FunctionComponent<FieldProps> = (props: FieldProps) => (
    <FieldInputComponent {...props} component={InputComponent} />
);
