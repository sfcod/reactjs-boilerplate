import * as React from 'react';
import classNames from 'classnames';
import { useForm } from 'react-hook-form';
import FieldInput from '../../../../../components/react-hook-form/fields/FieldInput';
import type { GlobalError } from '../../../../../components/react-hook-form/utils/make-form-errors';
import { withErrors } from '../../../../../components/react-hook-form/utils/make-form-errors';
import { yupResolver } from '@hookform/resolvers/yup';
import SummaryError from '../../../../../components/react-hook-form/SummaryError';
import { loginSchema } from '../schema/login';
import { useDispatch } from 'src/hooks/dispatch';
import { login } from 'src/store/thunks/auth-thunks';
import { Form } from 'react-bootstrap';
import Button from 'src/components/ui/Button';

interface LoginFormData {
    username: string;
    password: string;
}

interface LoginFormProps {
    onSuccess?: () => void;
}

const LoginForm: React.FunctionComponent<LoginFormProps> = ({ onSuccess }) => {
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
                    wrapperProps={{ label: (loginSchema.fields.username as any).spec?.label }}
                />
                <FieldInput
                    name={'password'}
                    control={control}
                    type="password"
                    autoComplete="current-password"
                    error={errors?.password?.message}
                    wrapperProps={{ label: (loginSchema.fields.password as any).spec?.label }}
                />

                <Button type="submit">
                    {isSubmitting ? <span className={classNames('spinner-border')} /> : 'Sign in'}
                </Button>
            </Form>
        </div>
    );
};

export default LoginForm;
