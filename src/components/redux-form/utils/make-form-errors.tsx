import { FormErrors } from 'redux-form';
import isArray from 'lodash/isArray';

/**
 * Error from server
 */
interface Error<T> {
    detail: string;
    title: string;
    violations: ErrorItem<T>[];
}

interface ErrorItem<T> {
    propertyPath: keyof T;
    message: string;
}

/**
 * Apply common errors to form fields
 */
export function makeFormErrors<T>(errors: Error<T>): FormErrors<T> {
    const result: FormErrors<T> | any = {};

    if (isArray(errors.violations)) {
        errors.violations.forEach((error: ErrorItem<T>) => {
            result[error.propertyPath] = error.message;
        });
    }
    if (errors.title) {
        result['_error'] = errors.title;
    }

    return result;
}
