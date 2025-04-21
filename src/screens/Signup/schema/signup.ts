import { passwordValidationSchema } from 'src/components/react-hook-form/fields/FieldPassword';
import { transformEmptyString } from 'src/helpers/transform';
import * as yup from 'yup';

export const signupSchema = yup.object().shape({
    email: yup.string().required().email().max(255).label('Email'),
    password: passwordValidationSchema,
    repeatPassword: yup
        .string()
        .when('password', {
            is: (value: any) => !!value,
            then: (schema) =>
                schema
                    .transform(transformEmptyString)
                    .required()
                    .equals([yup.ref('password')], 'Passwords do not match')
                    .label('Repeat Password'),
        })
        .label('Repeat Password'),
});
