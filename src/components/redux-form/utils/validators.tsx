/**
 * Type for validators array
 */
// tslint:disable-next-line:max-line-length
export type Validators<FormData> = {
    [key in keyof Partial<FormData>]: Array<(config: { [key: string]: any }) => string | undefined>;
};

/**
 * Check if value is alphanumeric
 *
 * @param {{message?: string}} config
 * @returns {(value: string) => string}
 */
export const alphaNumeric = (config: { message?: string } = {}) => (value: any): string | undefined => {
    const { message } = {
        message: 'Only alphanumeric characters',
        ...config,
    };

    return value && /[^a-zA-Z0-9 ]/i.test(value) ? message : undefined;
};

/**
 * Check if value is numeric
 *
 * @param {{message?: string}} config
 * @returns {(value: (string | number)) => string}
 */
export const numeric = (config: { message?: string } = {}) => (value: any): string | undefined => {
    const { message } = {
        message: 'Must be a number',
        ...config,
    };

    return value && isNaN(Number(value)) ? message : undefined;
};

/**
 * Check value's max length
 *
 * @param {{max?: number; message?: string}} config
 * @returns {(value: string) => string}
 */
export const maxLength = (config: { max?: number; message?: string } = {}) => (value: any): string | undefined => {
    const { max, message } = {
        max: 10,
        message: 'Must be {max} characters or less',
        ...config,
    };

    return value && value.length > max ? message.replace('{max}', max.toString()) : undefined;
};

/**
 * Check value's min length
 *
 * @param {{min?: number; message?: string}} config
 * @returns {(value: string) => string}
 */
export const minLength = (config: { min?: number; message?: string } = {}) => (value: any): string | undefined => {
    const { min, message } = {
        min: 6,
        message: 'Must be {min} characters or more',
        ...config,
    };

    return value && value.length < min ? message.replace('{min}', min.toString()) : undefined;
};

/**
 * Check if value less then maximum one
 *
 * @param {{max?: number; message?: string}} config
 * @returns {(value: number) => string}
 */
export const maxValue = (config: { max?: number; message?: string } = {}) => (value: any): string | undefined => {
    const { max, message } = {
        max: 5,
        message: 'Must be lower then {max}',
        ...config,
    };

    return value && value > max ? message.replace('{max}', max.toString()) : undefined;
};

/**
 * Check if value greater than minimal one
 *
 * @param {{min?: number; message?: string}} config
 * @returns {(value: number) => string}
 */
export const minValue = (config: { min?: number; message?: string } = {}) => (value: any): string | undefined => {
    const { min, message } = {
        min: 1,
        message: 'Must be at least {min}',
        ...config,
    };

    return value && value < min ? message.replace('{min}', min.toString()) : undefined;
};

/**
 * Check if value not empty
 *
 * @param {{message?: string}} config
 * @returns {(value: any) => string}
 */
export const required = (config: { message?: string } = {}) => (value: any): string | undefined => {
    const { message } = {
        message: 'Field is required',
        ...config,
    };

    return !value && 0 !== value ? message : undefined;
};

/**
 * Check if value is email address
 *
 * @param {{message?: string}} config
 * @returns {(value: any) => string}
 */
export const email = (config: { message?: string } = {}) => (value: any): string | undefined => {
    const { message } = {
        message: 'Invalid email address',
        ...config,
    };

    return value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ? message : undefined;
};

/**
 * Check if value is email address
 *
 * @param {{message?: string}} config
 * @returns {(value: any) => string}
 */
export const calendar = (config: { message?: string }) => (value: any = {}) => {
    const { message } = {
        message: 'Your should choose correct dates range',
        ...config,
    };

    const { year, week } = value;

    return year && week ? undefined : message;
};
