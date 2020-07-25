import React from 'react';
import styles from './assets/summary-error.module.scss';
import classNames from 'classnames';

/**
 * Form error props interface
 */
interface Props {
    error?: string;
    style?: {};
}

/**
 * Form error component
 */
export class SummaryError extends React.Component<Props> {
    /**
     * Default props
     *
     * @type {{className: string}}
     */
    public static defaultProps: Partial<Props> = {};

    /**
     * Render component
     *
     * @returns {null}
     */
    public render() {
        const { error, style } = this.props;

        if (error) {
            return <>{error && <p className={classNames(styles.container, style)}>{error}</p>}</>;
        }

        return null;
    }
}
