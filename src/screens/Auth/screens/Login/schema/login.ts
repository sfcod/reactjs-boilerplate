import * as yup from 'yup';

export const loginSchema = yup.object().shape({
    username: yup.string().email().max(180).required().label('Username'),
    password: yup.string().min(6).max(32).required().label('Password'),
});
