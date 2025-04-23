import * as yup from 'yup';
import { transformEmptyString } from 'src/helpers/form';

export const signupSchema = yup.object().shape({
    email: yup.string().email().max(180).required().label('Email'),
    phoneNumber: yup.string().max(180).required().label('Phone'),
    firstName: yup.string().max(180).required().label('First Name'),
    lastName: yup.string().max(180).required().label('Last Name'),
    password: yup.string().min(6).max(32).required().label('Password'),
    repeatPassword: yup
        .string()
        .when('password', {
            is: (value: string) => !!value,
            then: (schema) =>
                schema
                    .transform(transformEmptyString)
                    .required()
                    .equals([yup.ref('password')], 'Passwords do not match')
                    .label('Repeat Password'),
        })
        .label('Repeat Password'),
});
