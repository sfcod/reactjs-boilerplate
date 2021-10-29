import * as yup from 'yup';

export const validateCode = yup.object().shape({
    token: yup.string().required(),
});
