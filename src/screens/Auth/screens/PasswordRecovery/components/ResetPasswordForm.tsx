import React, { useMemo } from 'react';
import { FormErrors, InjectedFormProps, reduxForm } from 'redux-form';
import { FormAlertError } from '../../../../../components/redux-form/FormAlertError';
import classNames from 'classnames';
import styles from '../assets/reset-password-form.module.scss';
import { useTranslation } from 'react-i18next';
import { required, Validators } from '../../../../../components/redux-form/utils/validators';
import { FieldCodeInput } from '../../../../../components/redux-form/fields/FieldCodeInput';
import i18next from 'i18next';
import { asyncAuthUpdatePassword } from '../../../../../store/actions/auth-actions';

export interface ResetPasswordFormData {
    password: string;
    passwordRepeat: string;
}

interface ResetPasswordFormProps {}

type InjectedProps = InjectedFormProps<ResetPasswordFormData, ResetPasswordFormProps>;

const ResetPasswordForm: React.FunctionComponent<InjectedProps & ResetPasswordFormProps> = ({
    handleSubmit,
    submitting,
    error,
}: InjectedProps & ResetPasswordFormProps) => {
    const { t } = useTranslation();
    const validators: Validators<ResetPasswordFormData> = useMemo(
        () => ({
            password: [required()],
            passwordRepeat: [required()],
        }),
        [],
    );

    return (
        <form onSubmit={handleSubmit} className={classNames(styles.form)}>
            <div>
                <h3 className={classNames('text-center', 'mb-5')}>{t('Forgot your password?')}</h3>
                <h4 className={classNames('text-center')}>{t('Enter your new PIN:')}</h4>
                <FormAlertError error={error} />
                <FieldCodeInput
                    name="password"
                    fields={6}
                    type="password"
                    mode="numeric"
                    validate={validators.password}
                    filterChars={['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']}
                    filterCharsIsWhitelist={true}
                    wrapperConfig={{
                        label: t('PIN'),
                    }}
                />
                <FieldCodeInput
                    name="passwordRepeat"
                    fields={6}
                    type="password"
                    mode="numeric"
                    validate={validators.passwordRepeat}
                    filterChars={['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']}
                    filterCharsIsWhitelist={true}
                    wrapperConfig={{
                        label: t('PIN Confirmation'),
                    }}
                />
            </div>
            <div className={classNames('text-center')}>
                <button type="submit" className={classNames('btn', 'btn-primary', 'text-uppercase', 'w-100')}>
                    {submitting ? <span className={classNames('spinner-border')} /> : t('Confirm')}
                </button>
            </div>
        </form>
    );
};

export default reduxForm<ResetPasswordFormData, ResetPasswordFormProps>({
    form: 'reset-password',
    validate: (values: ResetPasswordFormData): FormErrors<ResetPasswordFormData> => {
        const errors: FormErrors<ResetPasswordFormData> = {};

        if (values.passwordRepeat && values.password !== values.passwordRepeat) {
            errors.passwordRepeat = i18next.t('PIN must match');
        }

        return errors;
    },
    onSubmit: asyncAuthUpdatePassword,
})(ResetPasswordForm);
