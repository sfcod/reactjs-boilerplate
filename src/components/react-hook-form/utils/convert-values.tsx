import { isSelectableItem } from 'src/enumerables/enumerable.abstract';
import lodash from 'lodash';
import { DateTime } from 'luxon';

/**
 * Append value to form status
 *
 * @param formData
 * @param name
 * @param value
 */
const appendToFormData = (formData: FormData, name: string, value: any): void => {
    if (isSelectableItem(value)) {
        formData.append(name, value.value);
    } else {
        formData.append(name, value);
    }
};

/**
 * Recursively append values into FormData
 *
 * @param values
 * @param formData
 * @param keyPrefix
 */
const recursiveAppend = (values: { [key: string]: any }, formData: FormData, keyPrefix = ''): FormData => {
    Object.entries(values).forEach(([key, value]) => {
        const fullKey = keyPrefix ? `${keyPrefix}[${key}]` : key;

        if (value === undefined || value === null) {
            // formData.append(fullKey, "");
        } else if (value.constructor === FileList) {
            if ((value as FileList).length > 1) {
                Object.entries(value).forEach(([fileKey, file]) => {
                    appendToFormData(formData, `${fullKey}[${fileKey}]`, file as Blob);
                    // formData.append(`${fullKey}[${fileKey}]`, file as Blob);
                });
            } else if ((value as FileList).length > 0 && value[0].constructor === File) {
                appendToFormData(formData, `${fullKey}`, value[0]);
                // formData.append(`${fullKey}`, value[0]);
            }
        } else if (value.constructor === File) {
            appendToFormData(formData, `${fullKey}`, value);
        } else if (Array.isArray(value)) {
            value.forEach((entry, i) => {
                if (Array.isArray(entry) || (!isSelectableItem(entry) && entry === Object(entry))) {
                    formData = recursiveAppend(entry, formData, `${fullKey}[${i}]`);
                } else {
                    appendToFormData(formData, `${fullKey}[${i}]`, entry);
                    // formData.append(`${fullKey}[${i}]`, entry);
                }
            });
        } else if (!isSelectableItem(value) && value === Object(value)) {
            formData = recursiveAppend(value, formData, `${fullKey}`);
        } else {
            if (false !== value) {
                appendToFormData(formData, fullKey, value);
                // formData.append(fullKey, value);
            }
        }
    });

    return formData;
};

/**
 * Convert redux form values into FormData
 *
 * @param values
 * @param formName
 */
export const convertValuesToFormData = (values: { [key: string]: any }, formName = ''): FormData | null => {
    if (!values) {
        return null;
    }

    return recursiveAppend(formName ? { [formName]: values } : values, new FormData());
};

const convertValue = (value: any): any => {
    if (isSelectableItem(value)) {
        return value.value;
    } else if (value instanceof Date) {
        return DateTime.fromJSDate(new Date(value)).toFormat("yyyy-MM-dd'T'HH:mm:ss.SSS");
    } else if (value instanceof Array) {
        return value.map((element) => convertValue(element));
    } else if (lodash.isObject(value)) {
        return convertValuesToObject(value);
    } else {
        return value;
    }
};

/**
 * Convert redux form values into object
 *
 * @param values
 */
export const convertValuesToObject = (values: { [key: string]: any }): AnyObject | null => {
    if (!values) {
        return null;
    }

    const result: AnyObject = {};

    lodash.forEach(values, (value: any, key: string) => {
        result[key] = convertValue(value);
    });

    return result;
};
