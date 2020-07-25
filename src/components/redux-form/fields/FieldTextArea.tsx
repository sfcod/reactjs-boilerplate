import * as React from 'react';
import { BaseFieldProps, Field, GenericField, WrappedFieldProps } from 'redux-form';
import { FieldWrapper, FieldWrapperConfig } from './FieldWrapper';
import classNames from 'classnames';
import { ReactNode } from 'react';

/**
 * TextArea props
 */
export interface TextAreaComponentProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    inputStyle?: object | string;
    inputErrorStyle?: object | string;
    wrapperConfig?: FieldWrapperConfig;
    children?: ReactNode;
}

type TextAreaProps = TextAreaComponentProps & WrappedFieldProps;

/**
 * TextAreaComponent which renders wrapped input field with label and error
 *
 * @constructor
 */
const TextAreaComponent: React.FunctionComponent<TextAreaProps> = (props: TextAreaProps) => {
    const hasError = !props.meta.valid && props.meta.touched;

    return (
        <FieldWrapper {...props.wrapperConfig} name={props.input.name} meta={props.meta}>
            <textarea
                id={props.input.name}
                {...props.input}
                className={classNames(props.inputStyle, hasError && props.inputErrorStyle)}
                placeholder={props.placeholder}
                disabled={props.disabled}
            >
                {props.input.value}
            </textarea>
            {props.children}
        </FieldWrapper>
    );
};

TextAreaComponent.defaultProps = {
    inputStyle: 'form-control',
    inputErrorStyle: 'border-danger',
};

const FieldTextAreaComponent = Field as new () => GenericField<TextAreaComponentProps>;

type FieldProps = BaseFieldProps<TextAreaComponentProps> & TextAreaComponentProps;

/**
 * FieldTextArea component which extends GenericField from redux form and renders textarea field
 * (TextAreaComponent) with all needed props
 *
 * @param props
 * @constructor
 */
export const FieldTextArea: React.FunctionComponent<FieldProps> = (props: FieldProps) => (
    <FieldTextAreaComponent {...props} component={TextAreaComponent} />
);
