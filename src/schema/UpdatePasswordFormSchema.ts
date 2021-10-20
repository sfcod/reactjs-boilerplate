import * as yup from 'yup';

export const updatePasswordFormSchema = yup.object().shape({
    password: yup.string().min(6).max(6).required(),
    passwordRepeat: yup
        .string()
        .min(6)
        .equals([yup.ref('password')], () => 'Password must match')
        .required(),
});
