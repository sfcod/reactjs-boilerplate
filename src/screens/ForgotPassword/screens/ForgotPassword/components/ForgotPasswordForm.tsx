import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import classNames from 'classnames';
import { yupResolver } from '@hookform/resolvers/yup';
import type { GlobalError } from 'src/components/react-hook-form/utils/make-form-errors';
import { withErrors } from 'src/components/react-hook-form/utils/make-form-errors';
import FormError from 'src/components/react-hook-form/FormError';
import { useNavigate } from 'react-router-dom';
import Router from 'src/navigation/router';
import routes from 'src/navigation/routes';
import type { RecoveryRequestFormData } from 'src/types/auth';
import FieldInput from 'src/components/react-hook-form/fields/FieldInput';
import { forgotPasswordSchema } from '../schema/forgor-password';
import { resetPasswordRequest } from 'src/store/thunks/auth-thunks';
import { useDispatch } from 'src/hooks/dispatch';
import { State } from '../../VerifyCodeLink/VerifyCodeLinkScreen.tsx';
import { Form } from 'react-bootstrap';
import Button from 'src/components/ui/Button.tsx';

interface VerifyFormProps {}

const ForgotPasswordForm: React.FunctionComponent<VerifyFormProps> = ({}: VerifyFormProps) => {
    const {
        control,
        handleSubmit,
        setError,
        watch,
        formState: { errors },
        clearErrors,
    } = useForm<RecoveryRequestFormData>({
        resolver: yupResolver(forgotPasswordSchema),
    });

    const navigate = useNavigate();

    const dispatch = useDispatch();
    const onSubmit = async (data: RecoveryRequestFormData) => {
        const res = await withErrors<RecoveryRequestFormData>(dispatch(resetPasswordRequest(data)).unwrap(), setError);
        // TODO: move to if condition
        navigate(
            Router.generate(routes.FORGOT_PASSWORD_VERIFY_CODE_LINK, {
                username: data.username,
                state: State.RESEND_SUCCESS,
            }),
        );
        if (res !== false) {
        }
    };

    const username = watch('username');
    useEffect(() => {
        clearErrors();
    }, [username]);

    return (
        <div className={classNames('d-flex', 'justify-content-center', 'align-items-center', 'h-100')}>
            <Form
                id="forgot"
                onSubmit={handleSubmit(onSubmit)}
                className={classNames('w-50', 'mt-4', 'd-flex', 'flex-column', 'gap-3')}
            >
                <FieldInput
                    name={'username'}
                    control={control}
                    type="username"
                    error={errors?.username?.message}
                    placeholder={'Username'}
                    wrapperProps={{
                        label: 'Username',
                    }}
                    aria-label={'Username'}
                />

                <FormError error={(errors as GlobalError)._error?.message} />

                <Button type={'submit'}>Next</Button>
            </Form>
        </div>
    );
};

export default ForgotPasswordForm;
