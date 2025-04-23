import React from 'react';
import GuestLayout from '../../../../components/layouts/guest/GuestLayout';
import { useForm } from 'react-hook-form';
import { useLogin } from 'src/react-query/auth';
import type { LoginData } from 'src/types/auth';
import styles from './assets/login-screen.module.scss';
import { yupResolver } from '@hookform/resolvers/yup';
import { loginSchema } from './schema/login';
import FieldInput from '../../../../components/react-hook-form/FieldInput';
import Form from '../../../../components/react-hook-form/Form';
import Button from '../../../../components/ui/Button';
import { fieldLabel } from '../../../../helpers/form';
import Error from '../../../../components/ui/Error';
import { Link, useNavigate } from 'react-router';
import routes from 'src/navigation/routes';
import FieldCheckbox from '../../../../components/react-hook-form/FieldCheckbox';
import { useAuth } from '../../../../hooks/auth';

export interface Props {}

type FormData = LoginData & { remember: boolean | null };

const LoginScreen: React.FC<Props> = () => {
    const navigate = useNavigate();
    const { login } = useAuth();
    const { mutateAsync } = useLogin();
    const form = useForm<FormData>({
        resolver: yupResolver(loginSchema),
    });
    const {
        handleSubmit,
        setError,
        formState: { errors, isSubmitting },
    } = form;

    const onSubmit = async ({ remember, ...data }: FormData) => {
        try {
            const res = await mutateAsync(data);
            await login(res.token, res.refreshToken, remember || false);
            navigate(routes.HOME);
        } catch {
            setError('root', { message: 'Invalid username or password' });
        }
    };

    return (
        <GuestLayout classNameWrapper={'vh-100 d-flex align-items-center justify-content-center'}>
            <Form methods={form} onSubmit={handleSubmit(onSubmit)} className={styles.form}>
                <h2 className={'mb-3'}>Sign In</h2>
                <FieldInput
                    name={'username'}
                    autoComplete={'username'}
                    placeholder={fieldLabel(loginSchema, 'username')}
                />
                <FieldInput
                    type={'password'}
                    name={'password'}
                    autoComplete={'current-password'}
                    placeholder={fieldLabel(loginSchema, 'password')}
                />
                <Error>{errors.root?.message}</Error>
                <FieldCheckbox name={'remember'} label={fieldLabel(loginSchema, 'remember')} />
                <div className={'d-flex mt-3'}>
                    <Button type={'submit'} className={'btn btn-primary'} disabled={isSubmitting}>
                        Submit
                    </Button>

                    <Link to={routes.SIGNUP} className={'ms-auto align-self-center'}>
                        Sign Up
                    </Link>
                </div>
            </Form>
        </GuestLayout>
    );
};

export default LoginScreen;
