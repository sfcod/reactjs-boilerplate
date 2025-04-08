import isArray from 'lodash/isArray';
import type { ErrorOption, FieldErrors, FieldValues } from 'react-hook-form';
import type { FieldPath } from 'react-hook-form';

export type GlobalError = FieldErrors<{ _error: string }>;

export interface FormError<T extends FieldValues> {
    field: FieldPath<T>;
    error: {
        type: 'manual';
        message: string;
    };
}

export type FormErrors<T extends FieldValues> = FormError<T>[];

interface Violation<T> {
    property: keyof T;
    constraints: {
        [name: string]: string;
    };
}

interface ErrorResponse<T> {
    error: string;
    message: Violation<T>[];
    statusCode: number;
}

export function makeFormErrorsFromResponse<T extends FieldValues>({ error, message }: ErrorResponse<T>): FormErrors<T> {
    const result: FormErrors<T> = [];

    if (isArray(message)) {
        message.forEach((violation: Violation<T>) => {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            for (const [key, value] of Object.entries(violation.constraints)) {
                result.push({
                    field: violation.property as FieldPath<T>,
                    error: {
                        type: 'manual',
                        message: value,
                    },
                });
            }
        });
    } else {
        result.push({
            field: '_error' as FieldPath<T>,
            error: {
                type: 'manual',
                message: message ?? error ?? 'Server error',
            },
        });
    }

    return result;
}

export function makeFormErrors<T extends FieldValues>(
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

export function withErrors<T extends FieldValues>(
    promise: Promise<any>,
    setError: (name: FieldPath<T>, error: ErrorOption) => void,
): Promise<any> {
    return promise.catch((errors: FormErrors<T>) => {
        console.log({ msg: 'withErrors', errors });
        if (errors instanceof Array) {
            errors.forEach((item) => setError(item.field, item.error));
        }

        return false;
    });
}

export function extractFirstError(errors: FormErrors<any | { _error: string }>, defaultError = ''): string | null {
    return errors[0]?.error?.message || defaultError;
}
