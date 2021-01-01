import React from 'react';
import styles from './assets/summary-error.module.scss';
import classNames from 'classnames';
import { ClassValue } from 'classnames/types';

interface Props {
    error?: string;
    classNames?: {
        errorContainer?: ClassValue;
        errorMessage?: ClassValue;
    };
}

const FormError: React.FunctionComponent<Props> = React.memo(({ error, classNames: classes }: Props) => {
    if (!error) {
        return null;
    }

    return (
        <div className={classNames(styles.errorRow, classes?.errorContainer)} role="alert">
            <span className={classNames('text-danger', classes?.errorMessage)}>{error}</span>
        </div>
    );
});

export default FormError;
