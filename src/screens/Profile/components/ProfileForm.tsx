import React from 'react';
import styles from '../assets/profile-form.module.scss';
import FieldInput from 'src/components/react-hook-form/FieldInput';
import { fieldLabel, withErrors } from 'src/helpers/form';
import Error from 'src/components/ui/Error';
import Button from 'src/components/ui/Button';
import Form from 'src/components/react-hook-form/Form';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { toast } from 'react-toastify';
import { useAuth } from 'src/hooks/auth';
import { profileSchema } from '../schema/profile';
import type { UpdateUserData } from 'src/types/user';
// import { useUpdateUser } from 'src/react-query/user';
import Input from '../../../components/ui/Input';
import FieldWrapper from '../../../components/react-hook-form/FieldWrapper';
import FieldDropdown from '../../../components/react-hook-form/FieldDropdown';
// import { useEnums } from 'src/react-query/enum';
import FieldPhoneInput from '../../../components/react-hook-form/FieldPhoneInput';
import { Link } from 'react-router';
import routes from '../../../navigation/routes';
import { useEditUserMutation } from '../../../store/api/user';
import { useEnumsQuery } from '../../../store/api/enum';

interface Props {}

const ProfileForm: React.FC<Props> = () => {
    const { user } = useAuth();
    // const { mutateAsync } = useUpdateUser();
    const [updateUser] = useEditUserMutation();

    // const { data: genders } = useEnums('UserGender');
    const { data } = useEnumsQuery();
    const genders = data?.UserGender || [];
    const form = useForm<UpdateUserData>({
        resolver: yupResolver(profileSchema) as any,
        defaultValues: {
            firstName: user!.firstName,
            lastName: user!.lastName,
            phoneNumber: user!.phoneNumber,
            gender: user!.gender,
        },
    });
    const {
        handleSubmit,
        setError,
        formState: { isSubmitting, errors },
    } = form;

    const onSubmit = async (data: UpdateUserData) => {
        try {
            await withErrors(updateUser({ id: user!.id, ...data }).unwrap(), setError);
            // await mutateAsync({ id: user!.id, ...data }, withErrors(setError));
            toast.success('Profile updated successfully');
        } catch {
            alert(123);
        }
    };

    return (
        <Form methods={form} onSubmit={handleSubmit(onSubmit)} className={styles.form}>
            <h2 className={'mb-3'}>Profile</h2>
            <FieldWrapper label={'Email'}>
                <Input name={'email'} disabled={true} defaultValue={user?.email} />
            </FieldWrapper>
            <FieldInput name={'firstName'} label={fieldLabel(profileSchema, 'firstName')} />
            <FieldInput name={'lastName'} label={fieldLabel(profileSchema, 'lastName')} />
            <FieldDropdown name={'gender'} label={fieldLabel(profileSchema, 'gender')} options={genders} />
            <FieldPhoneInput name={'phoneNumber'} label={fieldLabel(profileSchema, 'phoneNumber')} />
            <Error>{errors.root?.message}</Error>
            <div className={'d-flex justify-content-between mt-3'}>
                <Button type={'submit'} className={'btn btn-primary'} disabled={isSubmitting}>
                    Save
                </Button>

                <Link to={routes.HOME}>Home</Link>
            </div>
        </Form>
    );
};

export default ProfileForm;
