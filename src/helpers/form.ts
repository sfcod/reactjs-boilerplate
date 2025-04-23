import type { ISchema, Reference, SchemaDescription } from 'yup';
import { ObjectSchema } from 'yup';
import isArray from 'lodash/isArray';
import type { FieldErrors, FieldValues, UseFormSetError } from 'react-hook-form';
import type { FieldPath } from 'react-hook-form';
import type { AxiosError } from 'axios';
import { isAxiosError } from 'axios';

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

export function withErrors<T extends AnyObject>(setError: UseFormSetError<T>) {
    return {
        onError: (err: AxiosError<ErrorResponse<T>> | Error) => {
            if (!isAxiosError<ErrorResponse<T>>(err) || err.status !== 400 || !err.response?.data) return;

            makeFormErrorsFromResponse(err.response.data).forEach((item) => {
                setError(item.field, item.error);
            });
        },
    };
}

export function fieldLabel<T extends AnyObject, K extends keyof T>(
    schema: ObjectSchema<T, AnyObject, Record<K, any>> | ISchema<T | undefined, AnyObject> | Reference<any>,
    field: K,
) {
    if (schema instanceof ObjectSchema) {
        const desc = schema.describe();
        const fieldDesc = desc.fields[field] as SchemaDescription;
        return fieldDesc?.label || '';
    }

    const desc = schema.describe();
    return (desc as SchemaDescription).label || '';
}

export const transformEmptyString = (value: string): string | undefined => (value === '' ? undefined : value);
export const transformSelectableItem = (value: any) => (typeof value === 'object' ? value.value : value);
