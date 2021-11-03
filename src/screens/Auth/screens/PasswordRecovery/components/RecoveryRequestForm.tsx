import React, { useEffect } from 'react';
import classNames from 'classnames';
import styles from '../assets/recovery-request-form.module.scss';
import { asyncAuthResetPasswordRequest } from 'src/store/actions/auth-actions';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { GlobalError, withErrors } from 'src/components/react-hook-form/utils/make-form-errors';
import FieldInput from 'src/components/react-hook-form/fields/FieldInput';
import lodash from 'lodash';
import SummaryError from '../../../../../components/react-hook-form/SummaryError';
import { recoveryRequest } from '../schema/recovery-request';

export interface RecoveryRequestFormData {
    username: string;
}

interface RecoveryRequestFormProps {
    onSubmitSuccess: () => void;
}

const RecoveryRequestForm: React.FunctionComponent<RecoveryRequestFormProps> = ({
    onSubmitSuccess,
}: RecoveryRequestFormProps) => {
    const dispatch = useDispatch();
    const {
        control,
        handleSubmit,
        setError,
        formState: { isSubmitting, isSubmitted, submitCount, errors },
    } = useForm({
        resolver: yupResolver(recoveryRequest),
    });

    const onSubmit = async (data: RecoveryRequestFormData) => {
        await withErrors<RecoveryRequestFormData>(asyncAuthResetPasswordRequest(data, dispatch), setError);
    };

    useEffect(() => {
        if (isSubmitted && lodash.isEmpty(errors)) {
            onSubmitSuccess();
        }
    }, [submitCount]);

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={classNames(styles.form)}>
            <div className={classNames(styles.content, styles.blueBorder)}>
                <h4 className={classNames('text-center', 'mb-3')}>{'To restore it, enter your email:'}</h4>
                <SummaryError error={(errors as GlobalError)._error?.message} />
                <FieldInput
                    control={control}
                    name={'username'}
                    type="text"
                    wrapperProps={{
                        label: 'Email address',
                    }}
                    error={errors.username?.message}
                />
            </div>
            <div className={classNames('text-center')}>
                <button type="submit" className={classNames('btn', 'btn-primary', 'text-uppercase', 'w-50')}>
                    {isSubmitting ? <span className={classNames('spinner-border')} /> : 'Restore'}
                </button>
            </div>
        </form>
    );
};

export default RecoveryRequestForm;
