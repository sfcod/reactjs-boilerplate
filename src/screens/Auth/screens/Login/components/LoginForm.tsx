import classNames from 'classnames';
import { useForm } from 'react-hook-form';
import FieldInput from 'src/components/react-hook-form/fields/FieldInput';
import type { GlobalError } from 'src/components/react-hook-form/utils/make-form-errors';
import { withErrors } from 'src/components/react-hook-form/utils/make-form-errors';
import { yupResolver } from '@hookform/resolvers/yup';
import { Link } from 'react-router-dom';
import Router from 'src/navigation/router';
import routes from 'src/navigation/routes';
import SummaryError from 'src/components/react-hook-form/SummaryError';
import { loginSchema } from '../schema/login';
import { useDispatch } from 'src/hooks/dispatch';
import { login } from 'src/store/thunks/auth-thunks';
import FieldPassword from 'src/components/react-hook-form/fields/FieldPassword';
import { Form } from 'react-bootstrap';
import Button from 'src/components/Button';
import { LoginData } from 'src/types/auth';
import { fieldLabel } from 'src/helpers/yup';

type LoginFormData = LoginData;

interface Props {
    onSuccess?: () => void;
}

const LoginForm = ({ onSuccess }: Props) => {
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
        const res = await withErrors<LoginFormData>(dispatch(login(data)).unwrap(), setError);
        if (res !== false) {
            onSuccess && onSuccess();
        }
    };

    return (
        <div className={classNames('d-flex', 'justify-content-center', 'align-items-center', 'h-100')}>
            <Form
                onSubmit={handleSubmit(onSubmit)}
                className={classNames('w-50', 'mt-4', 'd-flex', 'flex-column', 'gap-3')}
            >
                <SummaryError error={(errors as GlobalError)?._error?.message} />

                <FieldInput
                    name={'username'}
                    control={control}
                    type="email"
                    autoComplete="username"
                    error={errors?.username?.message}
                    wrapperProps={{ label: fieldLabel(loginSchema, 'username') }}
                />
                {/* <FieldInput
                    name={'password'}
                    control={control}
                    type="password"
                    autoComplete="current-password"
                    error={errors?.password?.message}
                    wrapperProps={{ label: fieldLabel(loginSchema, 'password') }}
                /> */}

                <FieldPassword
                    control={control}
                    name={'password'}
                    placeholder={'Choose a Password'}
                    error={errors.password?.message}
                    aria-label={'Password'}
                    wrapperProps={{ label: 'Password' }}
                    autoComplete="current-password"
                />

                <Button type="submit">
                    {isSubmitting ? <span className={classNames('spinner-border')} /> : 'Sign in'}
                </Button>

                <div className={classNames('text-center', 'my-3')}>
                    <Link to={Router.generate(routes.FORGOT_PASSWORD)} className={classNames('small')}>
                        {'Forgot password?'}
                    </Link>
                </div>
                <div className={classNames('text-center')}>
                    Don't have an account?{' '}
                    <Link to={Router.generate(routes.SIGNUP)} className={classNames('small')}>
                        Sign up
                    </Link>
                </div>
            </Form>
        </div>
    );
};

export default LoginForm;
