import React from 'react';
import GuestLayout from '../../../../components/layouts/guest/GuestLayout';
import Form from '../../../../components/react-hook-form/Form';
import styles from './assets/signup-screen.module.scss';
import FieldInput from '../../../../components/react-hook-form/FieldInput';
import { fieldLabel, withErrors } from '../../../../helpers/form';
import Error from '../../../../components/ui/Error';
import Button from '../../../../components/ui/Button';
import { Link, useNavigate } from 'react-router';
import routes from '../../../../navigation/routes';
import { useForm } from 'react-hook-form';
import type { SignupData } from 'src/types/auth';
import { yupResolver } from '@hookform/resolvers/yup';
import { signupSchema } from './schema/signup';
import { useSignup } from 'src/react-query/auth';
import { toast } from 'react-toastify';

interface Props {}

const SignupScreen: React.FC<Props> = () => {
    const navigate = useNavigate();
    const { mutateAsync } = useSignup();
    const form = useForm<SignupData>({
        resolver: yupResolver(signupSchema),
    });
    const {
        handleSubmit,
        setError,
        formState: { isSubmitting, errors },
    } = form;

    const onSubmit = async (data: SignupData) => {
        try {
            await mutateAsync(data, withErrors(setError));
            toast.success('Account created successfully');
            navigate(routes.LOGIN);
        } catch {}
    };

    return (
        <GuestLayout classNameWrapper={'vh-100 d-flex align-items-center justify-content-center'}>
            <Form methods={form} onSubmit={handleSubmit(onSubmit)} className={styles.form}>
                <h2 className={'mb-3'}>Sign Up</h2>
                <FieldInput name={'email'} placeholder={fieldLabel(signupSchema, 'email')} />
                <FieldInput name={'firstName'} placeholder={fieldLabel(signupSchema, 'firstName')} />
                <FieldInput name={'lastName'} placeholder={fieldLabel(signupSchema, 'lastName')} />
                <FieldInput name={'phoneNumber'} placeholder={fieldLabel(signupSchema, 'phoneNumber')} />
                <FieldInput type={'password'} name={'password'} placeholder={fieldLabel(signupSchema, 'password')} />
                <FieldInput
                    type={'password'}
                    name={'repeatPassword'}
                    placeholder={fieldLabel(signupSchema, 'repeatPassword')}
                />

                <Error>{errors.root?.message}</Error>
                <div className={'d-flex mt-3'}>
                    <Button type={'submit'} className={'btn btn-primary'} disabled={isSubmitting}>
                        Submit
                    </Button>

                    <Link to={routes.LOGIN} className={'ms-auto align-self-center'}>
                        Back to Login
                    </Link>
                </div>
            </Form>
        </GuestLayout>
    );
};

export default SignupScreen;
