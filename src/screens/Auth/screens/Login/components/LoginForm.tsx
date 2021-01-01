import * as React from 'react';
import styles from '../assets/login-form.module.scss';
import classNames from 'classnames';
import { object, string } from 'yup';
import { useForm } from 'react-hook-form';
import FieldInput from '../../../../../components/react-hook-form/fields/FieldInput';
import { asyncAuthLogin } from 'src/store/actions/auth-actions';
import { useDispatch } from 'react-redux';
import { GlobalError, withErrors } from '../../../../../components/react-hook-form/utils/make-form-errors';
import { yupResolver } from '@hookform/resolvers/yup';
import { Link } from 'react-router-dom';
import Router from '../../../../../navigation/router';
import { routes } from '../../../../../navigation';
import SummaryError from '../../../../../components/react-hook-form/SummaryError';

export interface LoginFormData {
    username: string;
    password: string;
}

export interface LoginFormProps {}

const validationSchema = object().shape({
    username: string().required().email().max(180),
    password: string().required(),
});

const LoginForm: React.FunctionComponent<LoginFormProps> = () => {
    const dispatch = useDispatch();
    const {
        register,
        handleSubmit,
        errors,
        setError,
        formState: { isSubmitting },
    } = useForm<LoginFormData>({
        resolver: yupResolver(validationSchema) as any,
    });

    const onSubmit = async (data: LoginFormData) => {
        await withErrors<LoginFormData>(asyncAuthLogin(data, dispatch), setError);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className={classNames(styles.content, styles.blueBorder)}>
                <SummaryError error={(errors as GlobalError)._error?.message} />
                <FieldInput
                    name="username"
                    type="email"
                    register={register}
                    error={errors.username?.message}
                    wrapperProps={{ label: 'Email address' }}
                />
                <FieldInput
                    register={register}
                    name="password"
                    type="password"
                    error={errors.password?.message}
                    wrapperProps={{ label: 'Password' }}
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
