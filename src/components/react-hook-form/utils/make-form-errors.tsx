import isArray from 'lodash/isArray';
import { ErrorOption, FieldErrors, FieldName } from 'react-hook-form';

export type GlobalError = FieldErrors<{ _error: string }>;

export interface FormError<T> {
    field: FieldName<T>;
    error: {
        type: 'manual';
        message: string;
    };
}

export type FormErrors<T> = FormError<T>[];

interface Violation<T> {
    propertyPath: keyof T;
    message: string;
}

interface ErrorResponse<T> {
    detail: string;
    title: string;
    violations: Violation<T>[];
}

export function makeFormErrorsFromResponse<T>(response: ErrorResponse<T>): FormErrors<T> {
    const result: FormErrors<T> = [];

    if (isArray(response.violations)) {
        response.violations.forEach((error: Violation<T>) => {
            result.push({
                field: error.propertyPath as FieldName<T>,
                error: {
                    type: 'manual',
                    message: error.message,
                },
            });
        });
    } else {
        result.push({
            field: '_error' as FieldName<T>,
            error: {
                type: 'manual',
                message: response.detail ?? response.title,
            },
        });
    }

    return result;
}

export function makeFormErrors<T>(
    errors: { [P in keyof T]: string } | { _error: string },
): FormErrors<T | { _error: string }> {
    const result: FormErrors<T | { _error: string }> = [];

    Object.entries(errors).forEach(([field, error]: Array<any>) => {
        result.push({
            field: field,
            error: {
                type: 'manual',
                message: error,
            },
        });
    });

    return result;
}

export function withErrors<T>(
    promise: Promise<any>,
    setError: (name: FieldName<T>, error: ErrorOption) => void,
): Promise<any> {
    return promise.catch((errors: FormErrors<T>) => {
        errors.forEach((item) => setError(item.field, item.error));
    });
}
