import React from 'react';
import styles from '../assets/signup-form.module.scss';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { signupSchema } from '../schema/signup';
import FormCard from 'src/components/ui/FormCard';
import FieldPassword from 'src/components/react-hook-form/fields/FieldPassword';
import FieldInput from 'src/components/react-hook-form/fields/FieldInput';
import classNames from 'classnames';
import { SignUpData } from 'src/types/sign-up';

type FormData = Pick<SignUpData, 'email' | 'password' | 'phoneNumber'> & {
    repeatEmail: string;
    repeatPassword: string;
};

interface Props {}

const SignupScreen: React.FC<Props> = () => {
    const form = useForm<FormData>({
        resolver: yupResolver(signupSchema),
    });

    const {
        control,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = form;

    const submit = (form: FormData) => {
        console.log(form);
    };

    return (
        <FormProvider {...form}>
            <FormCard>
                <form onSubmit={() => handleSubmit(submit)} className={classNames(styles.formWrap)}>
                    <div className={classNames(styles.content, styles.blueBorder)}>
                        <FormCard.Heading>Sign Up</FormCard.Heading>
                        <FieldInput
                            control={control}
                            name={'email'}
                            placeholder={'Enter Your Email'}
                            error={errors.email?.message}
                            aria-label={'Email'}
                            type={'email'}
                            wrapperProps={{ label: 'Email' }}
                            autoComplete="email"
                        />

                        <FieldPassword
                            control={control}
                            name={'password'}
                            placeholder={'Choose a Password'}
                            error={errors.password?.message}
                            aria-label={'Password'}
                            showHelp={true}
                            wrapperProps={{ label: 'Password' }}
                            autoComplete="new-password"
                        />
                        <FieldPassword
                            control={control}
                            name={'repeatPassword'}
                            placeholder={(signupSchema.fields.repeatPassword as any).spec.label}
                            error={errors.repeatPassword?.message}
                            aria-label={'Repeat Password'}
                            wrapperProps={{ label: 'Repeat Password' }}
                            autoComplete="new-password"
                        />
                    </div>
                    <FormCard.Actions className={classNames('d-flex', 'justify-content-center')}>
                        <button type="submit" className={classNames('btn', 'btn-primary', 'text-uppercase', 'w-50')}>
                            {isSubmitting ? <span className={classNames('spinner-border')} /> : 'Sign up'}
                        </button>
                    </FormCard.Actions>
                </form>
            </FormCard>
        </FormProvider>
    );
};

export default SignupScreen;
