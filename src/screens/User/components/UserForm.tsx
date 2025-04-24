import React, { useCallback, useEffect, useMemo } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import classNames from 'classnames';
import * as yup from 'yup';
import styles from '../assets/user-form.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave, faUndoAlt } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'src/hooks/dispatch';
import type { Dispatch } from 'redux';
import { toast } from 'react-toastify';
import type { SelectableItem } from 'src/enumerables/enumerable.abstract';
import FieldInput from '../../../components/react-hook-form/fields/FieldInput';
import { withErrors } from 'src/components/react-hook-form/utils/make-form-errors';
import Button from '../../../components/Button';
import FieldDropdown from 'src/components/react-hook-form/fields/FieldDropdown';
import FieldPhoneInput, { phoneValidationSchema } from 'src/components/react-hook-form/fields/FieldPhoneInput';
import { User } from 'src/types/user';
import userStatus from 'src/enumerables/user-status';
import userGender from 'src/enumerables/user-gender';

export interface UserFormData {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    dob: string;
    phoneNumber: string;
    status: SelectableItem | number;
    gender: SelectableItem | string;
}

interface FormData extends UserFormData {}

interface UserFormProps {
    title: string;
    user?: User | null;
    onSubmit: (data: UserFormData, dispatch: Dispatch) => Promise<any>;
    defaultValues?: Partial<UserFormData>;
}

const transformEmptyString = (value: string): string | undefined => (value === '' ? undefined : value);

const UserForm: React.FunctionComponent<UserFormProps> = ({ title, user, onSubmit, defaultValues }: UserFormProps) => {
    const validationSchema = useMemo(() => {
        let emailSchema = yup.string().email().max(255);

        return yup.object().shape({
            firstName: yup.string().required().max(255).label('First Name'),
            lastName: yup.string().required().max(255).label('Last Name'),
            email: emailSchema.label('Email'),
            password: yup.string().transform(transformEmptyString).notRequired().min(6).max(20).label('Password'),
            dob: yup.string().required().label('Date of Birth'),
            phoneNumber: phoneValidationSchema.required().label('Phone Number'),
            status: yup.mixed().required().label('Status'),
            gender: yup.mixed().required().label('Gender'),
        });
    }, [user]);
    const form = useForm<FormData>({
        resolver: yupResolver(validationSchema),
        defaultValues: {
            status: userStatus.ACTIVE,
            ...user,
            ...defaultValues,
        },
    });
    const {
        control,
        handleSubmit,
        setError,
        formState: { isSubmitting, submitCount, isSubmitSuccessful, errors },
    } = form;
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const navigateBack = useCallback(() => {
        navigate(-1);
    }, []);

    useEffect(() => {
        if (isSubmitSuccessful) {
            toast.success('User data was saved');
            navigateBack();
        }
    }, [submitCount]);

    const submit = async (data: FormData) => {
        await withErrors<UserFormData>(onSubmit(data, dispatch), setError);
        // setError('firstName', { message: 'test' });
        console.log(data);
    };

    return (
        <FormProvider {...form}>
            <form onSubmit={handleSubmit(submit)} className={classNames('card', 'form')}>
                <div className={classNames('card-header')}>{title}</div>
                <div className={classNames('card-body')}>
                    <div className={classNames('row')}>
                        <div className={classNames('col-md-6')}>
                            <FieldInput
                                control={control}
                                name="firstName"
                                wrapperProps={{ label: (validationSchema.fields.firstName as any).spec.label }}
                                error={errors.firstName?.message}
                            />
                            <FieldInput
                                control={control}
                                name="lastName"
                                wrapperProps={{ label: (validationSchema.fields.lastName as any).spec.label }}
                                error={errors.lastName?.message}
                            />
                            <FieldInput
                                control={control}
                                name="email"
                                wrapperProps={{ label: (validationSchema.fields.email as any).spec.label }}
                                error={errors.email?.message}
                            />
                            <FieldInput
                                control={control}
                                name="password"
                                type="password"
                                wrapperProps={{ label: (validationSchema.fields.password as any).spec.label }}
                                error={errors.password?.message}
                            />
                        </div>
                        <div className={classNames('col-md-6')}>
                            <FieldDropdown
                                control={control}
                                data={userStatus.mapData()}
                                name="status"
                                wrapperProps={{ label: (validationSchema.fields.status as any).spec.label }}
                                error={errors.status?.message}
                            />
                            <FieldDropdown
                                control={control}
                                data={userGender.mapData()}
                                name="gender"
                                wrapperProps={{ label: (validationSchema.fields.gender as any).spec.label }}
                                error={errors.gender?.message}
                            />
                            <FieldPhoneInput
                                control={control}
                                name={'phoneNumber'}
                                error={errors.phoneNumber?.message}
                                wrapperProps={{
                                    label: (validationSchema.fields.phoneNumber as any).spec.label,
                                }}
                            />
                            <FieldInput
                                control={control}
                                name="dob"
                                wrapperProps={{ label: (validationSchema.fields.dob as any).spec.label }}
                                error={errors.dob?.message}
                            />
                        </div>
                    </div>
                </div>
                <div className={classNames(styles.actions, 'card-footer')}>
                    <Button type="submit" className={classNames('btn-success')} disabled={isSubmitting}>
                        <FontAwesomeIcon icon={faSave} /> Save
                    </Button>
                    <Button className={classNames('btn', 'btn-danger')} onClick={navigateBack} disabled={isSubmitting}>
                        <FontAwesomeIcon icon={faUndoAlt} /> Cancel
                    </Button>
                </div>
            </form>
        </FormProvider>
    );
};

export default UserForm;
