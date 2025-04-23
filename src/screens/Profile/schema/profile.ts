import { transformSelectableItem } from 'src/helpers/form';
import * as yup from 'yup';

export const profileSchema = yup.object().shape({
    phoneNumber: yup.string().max(180).required().label('Phone'),
    firstName: yup.string().max(180).required().label('First Name'),
    lastName: yup.string().max(180).required().label('Last Name'),
    gender: yup.mixed().optional().nullable().label('Gender').transform(transformSelectableItem),
});
