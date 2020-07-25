import React, { PureComponent, ReactElement, ReactNode } from 'react';
import { WrappedFieldMetaProps } from 'redux-form';
import { FormError } from '../FormError';
import styles from '../assets/wrapper-input.module.scss';
import classNames from 'classnames';

interface ClassesList {
    inputContainer?: object | string;
    inputWrapper?: object | string;
    label?: object | string;
    errorRow?: object | string;
    errorMessage?: object | string;
}

export interface FieldWrapperConfig {
    name?: string;
    label?: string;
    showError?: boolean;
    classes?: ClassesList;
}

/**
 * Input props
 */
interface Props extends FieldWrapperConfig {
    meta: WrappedFieldMetaProps;
    children?: ReactNode;
}

/**
 * Field input for redux form
 */
export class FieldWrapper extends PureComponent<Props> {
    public static defaultProps: Partial<Props> = {
        showError: true,
        classes: {
            inputContainer: '',
            inputWrapper: 'form-group',
            label: '',
            errorRow: '',
            errorMessage: '',
        },
    };

    /**
     * Render component
     *
     * @returns {any}
     */
    public render(): ReactElement {
        const {
            meta: { touched, error, warning },
            name,
            label,
            children,
            showError,
        } = this.props;
        const classes = this.props.classes || {};
        const shouldShowError = showError && touched;

        return (
            <div className={classNames(styles.inputWrapper, classes.inputWrapper)}>
                {label && (
                    <label htmlFor={name} className={classNames(classes.label)}>
                        {label}
                    </label>
                )}
                <div className={classNames(styles.inputContainer, classes.inputContainer)}>{children}</div>
                {shouldShowError && (
                    <FormError
                        classes={{
                            errorMessage: classes.errorMessage,
                            errorRow: classes.errorRow,
                        }}
                        error={error || warning}
                    />
                )}
            </div>
        );
    }
}
