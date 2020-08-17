import React, { useMemo } from 'react';
import { InjectedFormProps, reduxForm } from 'redux-form';
import { FieldInput } from '../../../../../components/redux-form/fields/FieldInput';
import { maxLength, required, Validators } from '../../../../../components/redux-form/utils/validators';
import { useTranslation } from 'react-i18next';
import classNames from 'classnames';
import styles from '../assets/recovery-request-form.module.scss';
import { FormAlertError } from '../../../../../components/redux-form/FormAlertError';
import { asyncAuthResetPasswordRequest } from '../../../../../store/actions/auth-actions';

export interface RecoveryRequestFormData {
    username: string;
}

interface RecoveryRequestFormProps {}

type InjectedProps = InjectedFormProps<RecoveryRequestFormData, RecoveryRequestFormProps>;

const RecoveryRequestForm: React.FunctionComponent<InjectedProps & RecoveryRequestFormProps> = ({
    handleSubmit,
    submitting,
    error,
}: InjectedProps & RecoveryRequestFormProps) => {
    const { t } = useTranslation();
    const validators: Validators<RecoveryRequestFormData> = useMemo(
        () => ({
            username: [required(), maxLength({ max: 180 })],
        }),
        [],
    );

    return (
        <form onSubmit={handleSubmit} className={classNames(styles.form)}>
            <div>
                <h3 className={classNames('text-center', 'mb-5')}>{t('Forgot your password?')}</h3>
                <h4 className={classNames('text-center')}>{t('To restore it, enter your email:')}</h4>
                <FormAlertError error={error} />
                <FieldInput
                    name="username"
                    type="text"
                    validate={validators.username}
                    wrapperConfig={{
                        label: t('Email address'),
                    }}
                />
            </div>
            <div className={classNames('text-center')}>
                <button type="submit" className={classNames('btn', 'btn-primary', 'text-uppercase', 'w-100')}>
                    {submitting ? <span className={classNames('spinner-border')} /> : t('Restore')}
                </button>
            </div>
        </form>
    );
};

export default reduxForm<RecoveryRequestFormData, RecoveryRequestFormProps>({
    form: 'password-recovery-request',
    onSubmit: asyncAuthResetPasswordRequest,
})(RecoveryRequestForm);
