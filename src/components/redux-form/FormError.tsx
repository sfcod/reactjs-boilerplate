import React from 'react';
import styles from './assets/form-error.module.scss';
import classNames from 'classnames';

/**
 * Form error props interface
 */
export interface FormErrorProps {
    error: string;
    classes?: {
        errorRow: any;
        errorMessage: any;
    };
}

/**
 * Form error component
 */
export class FormError extends React.Component<FormErrorProps, {}> {
    /**
     * Default props
     *
     * @type {{className: string}}
     */
    public static defaultProps: Partial<FormErrorProps> = {};

    /**
     * Render component
     *
     * @returns {null}
     */
    public render() {
        const { error, classes } = this.props;

        if (error) {
            return (
                <div className={classNames(styles.errorRow, classes ? classes.errorRow : {})}>
                    <p className={classNames(styles.errorMessage, classes ? classes.errorMessage : {})}>{error}</p>
                </div>
            );
        }

        return null;
    }
}
