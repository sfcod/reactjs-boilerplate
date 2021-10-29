import * as yup from 'yup';

export const loginSchema = yup.object().shape({
    username: yup.string().email().max(180).required(),
    password: yup.string().min(8).max(32).required(),
});
