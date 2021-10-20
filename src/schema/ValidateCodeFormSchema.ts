import * as yup from 'yup';

export const validateCodeFormSchema = yup.object().shape({
    token: yup.string().required(),
});
