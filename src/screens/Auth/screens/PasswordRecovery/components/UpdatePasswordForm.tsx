import React, { useEffect } from 'react';
import classNames from 'classnames';
import styles from '../assets/reset-password-form.module.scss';
import { asyncAuthUpdatePassword } from 'src/store/actions/auth-actions';
import { object, ref, string } from 'yup';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { GlobalError, withErrors } from 'src/components/react-hook-form/utils/make-form-errors';
import lodash from 'lodash';
import FieldInput from '../../../../../components/react-hook-form/fields/FieldInput';
import SummaryError from '../../../../../components/react-hook-form/SummaryError';

export interface ResetPasswordFormData {
    password: string;
    passwordRepeat: string;
}

interface ResetPasswordFormProps {
    onSubmitSuccess: () => void;
}

const validationSchema = object().shape({
    password: string().required().min(6).max(6),
    passwordRepeat: string()
        .required()
        .min(6)
        .equals([ref('password')], () => 'Password must match'),
});

const UpdatePasswordForm: React.FunctionComponent<ResetPasswordFormProps> = ({
    onSubmitSuccess,
}: ResetPasswordFormProps) => {
    const dispatch = useDispatch();
    const {
        register,
        handleSubmit,
        errors,
        setError,
        formState: { isSubmitting, isSubmitted, submitCount },
    } = useForm<ResetPasswordFormData>({
        resolver: yupResolver(validationSchema) as any,
    });

    const onSubmit = async (data: ResetPasswordFormData) => {
        await withErrors<ResetPasswordFormData>(asyncAuthUpdatePassword(data, dispatch), setError);
    };

    useEffect(() => {
        if (isSubmitted && lodash.isEmpty(errors)) {
            onSubmitSuccess();
        }
        // eslint-disable-next-line
    }, [submitCount]);

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={classNames(styles.form)}>
            <div className={classNames(styles.content, styles.blueBorder)}>
                <h4 className={classNames('text-center', 'mb-3')}>{'Enter your new password:'}</h4>
                <SummaryError error={(errors as GlobalError)._error?.message} />
                <FieldInput
                    register={register}
                    name="password"
                    type="password"
                    error={errors.password?.message}
                    wrapperProps={{
                        label: 'Password',
                    }}
                />
                <FieldInput
                    register={register}
                    name="passwordRepeat"
                    type="password"
                    error={errors.passwordRepeat?.message}
                    wrapperProps={{
                        label: 'Password confirmation',
                    }}
                />
            </div>
            <div className={classNames('text-center')}>
                <button type="submit" className={classNames('btn', 'btn-primary', 'text-uppercase', 'w-50')}>
                    {isSubmitting ? <span className={classNames('spinner-border')} /> : 'Confirm'}
                </button>
            </div>
        </form>
    );
};

export default UpdatePasswordForm;
