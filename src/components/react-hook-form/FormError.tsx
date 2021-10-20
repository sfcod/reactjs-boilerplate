import React from 'react';
import styles from './assets/form-error.module.scss';
import classNames from 'classnames';

interface Props {
    error?: string;
    classNames?: {
        errorContainer?: any;
        errorMessage?: any;
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
