import React, { useMemo } from 'react';
import { FormErrors, InjectedFormProps, reduxForm } from 'redux-form';
import classNames from 'classnames';
import styles from '../assets/reset-password-form.module.scss';
import { required, Validators } from 'src/components/redux-form/utils/validators';
import { asyncAuthUpdatePassword } from 'src/store/actions/auth-actions';
import { SummaryError } from 'src/components/redux-form/SummaryError';
import { FieldInput } from 'src/components/redux-form/fields/FieldInput';

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
                <h3 className={classNames('text-center', 'mb-5')}>{'Forgot your password?'}</h3>
                <h4 className={classNames('text-center')}>{'Enter your new PIN:'}</h4>
                <SummaryError error={error} />
                <FieldInput
                    name="password"
                    type="password"
                    validate={validators.password}
                    wrapperConfig={{
                        label: 'Password',
                    }}
                />
                <FieldInput
                    name="passwordRepeat"
                    type="password"
                    validate={validators.passwordRepeat}
                    wrapperConfig={{
                        label: 'PIN Confirmation',
                    }}
                />
            </div>
            <div className={classNames('text-center')}>
                <button type="submit" className={classNames('btn', 'btn-primary', 'text-uppercase', 'w-100')}>
                    {submitting ? <span className={classNames('spinner-border')} /> : 'Confirm'}
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
            errors.passwordRepeat = 'PIN must match';
        }

        return errors;
    },
    onSubmit: asyncAuthUpdatePassword,
})(ResetPasswordForm);
