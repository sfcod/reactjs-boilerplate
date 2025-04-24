import { useForm } from 'react-hook-form';
import type { GlobalError } from 'src/components/react-hook-form/utils/make-form-errors';
import { yupResolver } from '@hookform/resolvers/yup';
import { signupSchema } from '../schema/signup';
import FieldPassword from 'src/components/react-hook-form/fields/FieldPassword';
import FieldInput from 'src/components/react-hook-form/fields/FieldInput';
import classNames from 'classnames';
import { Form } from 'react-bootstrap';
import { useDispatch } from 'src/hooks/dispatch';
import { withErrors } from 'src/components/react-hook-form/utils/make-form-errors';
import { signup } from 'src/store/thunks/auth-thunks';
import Button from 'src/components/Button';
import { SignUpData } from 'src/types/signup';
import SummaryError from 'src/components/react-hook-form/SummaryError';
import { Link } from 'react-router-dom';
import Router from 'src/navigation/router';
import routes from 'src/navigation/routes';

type SignUpFormData = SignUpData;

interface Props {
    onSuccess?: () => void;
}

const SignupScreen = ({ onSuccess }: Props) => {
    const dispatch = useDispatch();
    const {
        control,
        handleSubmit,
        setError,
        formState: { errors, isSubmitting },
    } = useForm<SignUpFormData>({
        resolver: yupResolver(signupSchema),
    });

    const onSubmit = async (data: SignUpFormData) => {
        const res = await withErrors<SignUpFormData>(dispatch(signup(data)).unwrap(), setError);
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
                    control={control}
                    name={'firstName'}
                    placeholder={'Enter Your First Name'}
                    error={errors.firstName?.message}
                    aria-label={'First Name'}
                    type={'text'}
                    wrapperProps={{ label: 'First Name' }}
                    autoComplete="given-name"
                />
                <FieldInput
                    control={control}
                    name={'lastName'}
                    placeholder={'Enter Your Last Name'}
                    error={errors.lastName?.message}
                    aria-label={'Last Name'}
                    type={'text'}
                    wrapperProps={{ label: 'Last Name' }}
                    autoComplete="family-name"
                />

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

                <FieldInput
                    control={control}
                    name={'phoneNumber'}
                    placeholder={'Enter Your Phone'}
                    error={errors.phoneNumber?.message}
                    aria-label={'Phone'}
                    type={'phone'}
                    wrapperProps={{ label: 'Phone Number' }}
                    autoComplete="phone"
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
                    placeholder={'Repeat Password'}
                    error={errors.repeatPassword?.message}
                    aria-label={'Repeat Password'}
                    wrapperProps={{ label: 'Repeat Password' }}
                    autoComplete="new-password"
                />

                <Button type="submit">
                    {isSubmitting ? <span className={classNames('spinner-border')} /> : 'Sign up'}
                </Button>

                <div className={classNames('text-center')}>
                    Already have an account?{' '}
                    <Link to={Router.generate(routes.HOME)} className={classNames('small')}>
                        Sign in
                    </Link>
                </div>
            </Form>
        </div>
    );
};

export default SignupScreen;
