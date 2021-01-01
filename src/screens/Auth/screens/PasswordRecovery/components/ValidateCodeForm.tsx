import React, { useEffect } from 'react';
import classNames from 'classnames';
import styles from '../assets/validate-code-form.module.scss';
import { asyncAuthValidateRecoveryCode } from 'src/store/actions/auth-actions';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { GlobalError, withErrors } from 'src/components/react-hook-form/utils/make-form-errors';
import { object, string } from 'yup';
import FieldInput from 'src/components/react-hook-form/fields/FieldInput';
import lodash from 'lodash';
import SummaryError from '../../../../../components/react-hook-form/SummaryError';

export interface ValidateCodeFormData {
    token: string;
}

interface ValidateCodeFormProps {
    onSubmitSuccess: () => void;
}

const validationSchema = object().shape({
    token: string().required(),
});

const ValidateCodeForm: React.FunctionComponent<ValidateCodeFormProps> = ({
    onSubmitSuccess,
}: ValidateCodeFormProps) => {
    const dispatch = useDispatch();
    const {
        register,
        handleSubmit,
        errors,
        setError,
        formState: { isSubmitting, isSubmitted, submitCount },
    } = useForm<ValidateCodeFormData>({
        resolver: yupResolver(validationSchema) as any,
    });

    const onSubmit = async (data: ValidateCodeFormData) => {
        await withErrors<ValidateCodeFormData>(asyncAuthValidateRecoveryCode(data, dispatch), setError);
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
                <h4 className={classNames('text-center', 'mb-3')}>{'Enter the verification code from your mailbox:'}</h4>
                <SummaryError error={(errors as GlobalError)._error?.message} />
                <FieldInput
                    register={register}
                    name="token"
                    type="text"
                    wrapperProps={{
                        label: 'Code',
                    }}
                />
            </div>
            <div className={classNames('text-center')}>
                <button type='submit' className={classNames('btn', 'btn-primary', 'text-uppercase', 'w-50')}>
                    {isSubmitting ? <span className={classNames('spinner-border')} /> : 'Confirm'}
                </button>
            </div>
        </form>
    );
};

export default ValidateCodeForm;
