import * as React from 'react';
import styles from '../assets/login-form.module.scss';
import classNames from 'classnames';
import { useForm } from 'react-hook-form';
import FieldInput from '../../../../../components/react-hook-form/fields/FieldInput';
import { GlobalError, withErrors } from '../../../../../components/react-hook-form/utils/make-form-errors';
import { yupResolver } from '@hookform/resolvers/yup';
import { Link } from 'react-router-dom';
import Router from '../../../../../navigation/router';
import { routes } from '../../../../../navigation';
import SummaryError from '../../../../../components/react-hook-form/SummaryError';
import { loginSchema } from '../schema/login';
import { useDispatch } from 'src/hooks/dispatch';
import { login } from 'src/store/thunks/auth-thunks';

export interface LoginFormData {
    username: string;
    password: string;
}

export interface LoginFormProps {}

const LoginForm: React.FunctionComponent<LoginFormProps> = () => {
    const dispatch = useDispatch();
    const {
        control,
        handleSubmit,
        setError,
        formState: { isSubmitting, errors },
    } = useForm<LoginFormData>({
        resolver: yupResolver(loginSchema),
    });

    const onSubmit = async (data: LoginFormData) => {
        await withErrors<LoginFormData>(dispatch(login(data)).unwrap(), setError);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className={classNames(styles.content, styles.blueBorder)}>
                <SummaryError error={(errors as GlobalError)?._error?.message} />

                <FieldInput
                    name={'username'}
                    control={control}
                    type="email"
                    error={errors?.username?.message}
                    wrapperProps={{ label: loginSchema.fields.username.spec.label }}
                />
                <FieldInput
                    name={'password'}
                    control={control}
                    type="password"
                    error={errors?.password?.message}
                    wrapperProps={{ label: loginSchema.fields.password.spec.label }}
                />
                <div className={classNames('text-center', 'my-3')}>
                    <Link to={Router.generate(routes.PASSWORD_RECOVERY)} className={classNames('small')}>
                        {'Forgot password?'}
                    </Link>
                </div>
            </div>
            <div className={classNames('text-center')}>
                <button
                    type="submit"
                    className={classNames(styles.button, 'btn', 'btn-primary', 'text-uppercase', 'w-50')}
                >
                    {isSubmitting ? <span className={classNames('spinner-border')} /> : 'Sign in'}
                </button>
            </div>
        </form>
    );
};

export default LoginForm;
