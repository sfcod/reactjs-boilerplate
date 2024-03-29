import React, { useEffect } from 'react';
import classNames from 'classnames';
import styles from '../assets/reset-password-form.module.scss';
import { asyncAuthUpdatePassword } from 'src/store/actions/auth-actions';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { GlobalError, withErrors } from 'src/components/react-hook-form/utils/make-form-errors';
import lodash from 'lodash';
import FieldInput from '../../../../../components/react-hook-form/fields/FieldInput';
import SummaryError from '../../../../../components/react-hook-form/SummaryError';
import { passwordUpdate } from '../schema/password-update';

export interface ResetPasswordFormData {
    password: string;
    passwordRepeat: string;
}

interface ResetPasswordFormProps {
    onSubmitSuccess: () => void;
}

const UpdatePasswordForm: React.FunctionComponent<ResetPasswordFormProps> = ({
    onSubmitSuccess,
}: ResetPasswordFormProps) => {
    const dispatch = useDispatch();
    const {
        control,
        handleSubmit,
        setError,
        formState: { isSubmitting, isSubmitted, submitCount, errors },
    } = useForm({
        resolver: yupResolver(passwordUpdate),
    });

    const onSubmit = async (data: ResetPasswordFormData) => {
        await withErrors<ResetPasswordFormData>(asyncAuthUpdatePassword(data, dispatch), setError);
    };

    useEffect(() => {
        if (isSubmitted && lodash.isEmpty(errors)) {
            onSubmitSuccess();
        }
    }, [submitCount]);

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={classNames(styles.form)}>
            <div className={classNames(styles.content, styles.blueBorder)}>
                <h4 className={classNames('text-center', 'mb-3')}>{'Enter your new password:'}</h4>
                <SummaryError error={(errors as GlobalError)._error?.message} />
                <FieldInput
                    control={control}
                    name={'password'}
                    type="password"
                    wrapperProps={{
                        label: 'Password',
                    }}
                    error={errors.password?.message}
                />
                <FieldInput
                    control={control}
                    name={'passwordRepeat'}
                    type="text"
                    wrapperProps={{
                        label: 'Password confirmation',
                    }}
                    error={errors.password?.message}
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
