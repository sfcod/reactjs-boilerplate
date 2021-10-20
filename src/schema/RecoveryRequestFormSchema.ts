import * as yup from 'yup';

export const recoveryRequestFormSchema = yup.object().shape({
    username: yup.string().email().max(180).required(),
});
