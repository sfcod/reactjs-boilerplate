import React from 'react';
import type { FieldValues, UseFormReturn } from 'react-hook-form';
import { FormProvider } from 'react-hook-form';

type Props<TFieldValues extends FieldValues, TContext = any, TTransformedValues = TFieldValues> = {
    methods: UseFormReturn<TFieldValues, TContext, TTransformedValues>;
} & React.HTMLAttributes<HTMLFormElement>;

const Form = <TFieldValues extends FieldValues, TContext = any, TTransformedValues = TFieldValues>({
    children,
    methods,
    ...props
}: Props<TFieldValues, TContext, TTransformedValues>) => {
    return (
        <FormProvider {...methods}>
            <form {...props}>{children}</form>
        </FormProvider>
    );
};

export default Form;
