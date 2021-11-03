import * as yup from 'yup';

export const recoveryRequest = yup.object().shape({
    username: yup.string().email().max(180).required(),
});
