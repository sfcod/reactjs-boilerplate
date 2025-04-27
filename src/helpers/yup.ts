import { ObjectSchema, SchemaDescription, AnyObject, ISchema, Reference } from 'yup';

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
