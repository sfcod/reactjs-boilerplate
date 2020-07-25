import { FormErrors } from 'redux-form';
import isArray from 'lodash/isArray';

/**
 * Error from server
 */
interface Error<T> {
    property: keyof T;
    constraints: { [key: string]: string };
}

/**
 * Error from server
 */
interface ErrorMessage {
    errorMessage: string;
}

/**
 * Apply common errors to form fields
 */
export function makeFormErrors<T>(errors: Error<T>[] | ErrorMessage): FormErrors<T> {
    const result: FormErrors<T> | any = {};

    if (isArray(errors)) {
        errors.forEach((error: Error<T>) => {
            const firstError = Object.keys(error.constraints)[0];

            result[error.property] = error.constraints[firstError];
        });
    }
    if ((errors as ErrorMessage).errorMessage) {
        result['_error'] = (errors as ErrorMessage).errorMessage;
    }

    return result;
}
