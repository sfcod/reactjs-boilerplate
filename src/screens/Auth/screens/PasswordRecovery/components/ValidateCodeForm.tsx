import React, { useMemo } from 'react';
import { InjectedFormProps, reduxForm } from 'redux-form';
import { SummaryError } from '../../../../../components/redux-form/SummaryError';
import { FieldInput } from '../../../../../components/redux-form/fields/FieldInput';
import classNames from 'classnames';
import styles from '../assets/validate-code-form.module.scss';
import { required, Validators } from '../../../../../components/redux-form/utils/validators';
import { asyncAuthValidateRecoveryCode } from '../../../../../store/actions/auth-actions';

export interface ValidateCodeFormData {
    token: string;
}

interface ValidateCodeFormProps {}

type InjectedProps = InjectedFormProps<ValidateCodeFormData, ValidateCodeFormProps>;

const ValidateCodeForm: React.FunctionComponent<InjectedProps & ValidateCodeFormProps> = ({
    handleSubmit,
    submitting,
    error,
}: InjectedProps & ValidateCodeFormProps) => {
    const validators: Validators<ValidateCodeFormData> = useMemo(
        () => ({
            token: [required()],
        }),
        [],
    );

    return (
        <form onSubmit={handleSubmit} className={classNames(styles.form)}>
            <div>
                <h3 className={classNames('text-center', 'mb-5')}>{'Forgot your password?'}</h3>
                <h4 className={classNames('text-center')}>{'Enter the verification code from your mailbox:'}</h4>
                <SummaryError error={error} />
                <FieldInput
                    name="token"
                    type="text"
                    validate={validators.token}
                    wrapperConfig={{
                        label: 'Code',
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

export default reduxForm<ValidateCodeFormData, ValidateCodeFormProps>({
    form: 'password-validate-code',
    onSubmit: asyncAuthValidateRecoveryCode,
})(ValidateCodeForm);
