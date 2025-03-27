import { passwordValidationSchema } from 'src/components/react-hook-form/fields/FieldPassword';
import { transformEmptyString } from 'src/helpers/transform';
import * as yup from 'yup';

export const signupSchema = yup.object().shape({
    email: yup.string().required().email().max(255).label('Email'),
    repeatEmail: yup
        .string()
        .when('email', {
            is: (value: any) => !!value,
            then: (schema) =>
                schema
                    .required()
                    .email()
                    .max(255)
                    .test('repeatEmail', 'Emails do not match', (value: string | undefined, ctx) => {
                        return value?.toLowerCase() === ctx.parent.email?.toLowerCase();
                    })
                    .label('Repeat Email'),
        })
        .label('Repeat Email'),
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
