import React from 'react';
import { useForm } from 'react-hook-form';
import classNames from 'classnames';
import { yupResolver } from '@hookform/resolvers/yup';
import type { GlobalError } from 'src/components/react-hook-form/utils/make-form-errors';
import { withErrors } from 'src/components/react-hook-form/utils/make-form-errors';
import { useDispatch } from 'src/hooks/dispatch';
import FormError from 'src/components/react-hook-form/FormError';
import { useNavigate } from 'react-router-dom';
import Router from 'src/navigation/router';
import routes from 'src/navigation/routes';
import { updatePassword } from 'src/store/thunks/auth-thunks';
import type { ResetPasswordFormData } from 'src/types/auth';
import { changePasswordSchema } from '../schema/change-password';
import { toast } from 'react-toastify';
import FieldPassword from 'src/components/react-hook-form/fields/FieldPassword';
import { Form } from 'react-bootstrap';
import Button from 'src/components/ui/Button';

interface VerifyFormProps {
    className?: string;
}

const ChangePasswordForm: React.FunctionComponent<VerifyFormProps> = ({}: VerifyFormProps) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {
        control,
        setError,
        handleSubmit,
        formState: { errors },
    } = useForm<ResetPasswordFormData>({
        resolver: yupResolver(changePasswordSchema),
    });

    const onSubmit = async (data: ResetPasswordFormData) => {
        const res = await withErrors<ResetPasswordFormData>(dispatch(updatePassword(data)).unwrap(), setError);

        if (res !== false) {
            navigate(Router.generate(routes.HOME));
            toast.success('Password was changed. Login to continue.');
        }
    };

    return (
        <div className={classNames('d-flex', 'justify-content-center', 'align-items-center', 'h-100')}>
            <Form
                id="changePassword"
                onSubmit={handleSubmit(onSubmit)}
                className={classNames('w-50', 'mt-4', 'd-flex', 'flex-column', 'gap-3')}
            >
                <h2>Change Password</h2>
                <FormError
                    error={(errors as GlobalError)._error?.message}
                    classNames={{ errorContainer: 'text-center mb-2' }}
                />
                <FieldPassword
                    control={control}
                    name={'password'}
                    placeholder={'New password'}
                    error={errors.password?.message}
                    showHelp={true}
                    autoComplete="new-password"
                />
                <FieldPassword
                    control={control}
                    type={'password'}
                    name={'repeatPassword'}
                    placeholder={'Repeat password'}
                    error={errors.repeatPassword?.message}
                    autoComplete="new-password"
                />

                <Button type={'submit'}>Confirm</Button>
            </Form>
        </div>
    );
};

export default ChangePasswordForm;
