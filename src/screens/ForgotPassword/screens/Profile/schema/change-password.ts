import * as yup from 'yup';
import { transformEmptyString } from '../../../../../helpers/transform';
import { passwordValidationSchema } from 'src/components/react-hook-form/fields/FieldPassword';

export const changePasswordSchema = yup.object().shape({
    password: passwordValidationSchema.label('New password'),
    repeatPassword: yup
        .string()
        .when('password', {
            is: (value: any) => !!value,
            then: (schema) =>
                schema
                    .transform(transformEmptyString)
                    .required()
                    .min(6)
                    .max(255)
                    .equals([yup.ref('password')], 'Passwords do not match')
                    .label('Repeat New Password'),
        })
        .label('Repeat Password'),
});
