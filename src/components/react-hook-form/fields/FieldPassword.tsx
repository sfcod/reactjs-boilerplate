import React, { useCallback, useState } from 'react';
import type { Props as FieldInputProps } from './FieldInput';
import FieldInput from './FieldInput';
import classNames from 'classnames';
import styles from '../assets/field-password.module.scss';
import Icon from 'src/components/ui/Icon';
import * as yup from 'yup';
import { transformEmptyString } from 'src/helpers/transform';
import type { Control } from 'react-hook-form';
import { useWatch } from 'react-hook-form';

export const passwordValidationSchema = yup
    .string()
    .transform(transformEmptyString)
    .required()
    .min(8)
    .max(20)
    .matches(/[A-Z]/, 'Password should contain at least one uppercase letter')
    .matches(/[a-z]/, 'Password should contain at least one lowercase letter')
    .matches(/[0-9]/, 'Password should contain at least one number')
    .matches(/[^A-Za-z0-9]/, 'Password should contain at least one special character')
    .label('Password');

type Props<C extends Control<any>> = FieldInputProps<C> & {
    showHelp?: boolean;
};

const FieldPassword = <C extends Control<any>>({ type = 'password', showHelp = false, ...props }: Props<C>) => {
    const value = useWatch({ control: props.control, name: props.name });
    const [hidden, setHidden] = useState(true);
    const handleHiddenClick = useCallback((e: any) => {
        e.stopPropagation();
        setHidden((value) => !value);
    }, []);
    const isValid = passwordValidationSchema.isValidSync(value);

    return (
        <FieldInput
            {...props}
            type={hidden ? type : 'text'}
            wrapperProps={{
                ...props.wrapperProps,
                classNames: {
                    ...props.wrapperProps?.classNames,
                    inputContainer: classNames(props.wrapperProps?.classNames?.inputContainer, styles.container),
                },
            }}
        >
            <span className={classNames(styles.toggle)}>
                <span onClick={handleHiddenClick} className={classNames(styles.toggleIcon)}>
                    <Icon name={hidden ? 'eyeSlash' : 'eye'} width={22} height={20} color={'var(--input-icon-color)'} />
                </span>
            </span>
            {!!showHelp && (
                <p className={classNames(styles.help)}>
                    <Icon
                        name={'checkMarkSimple'}
                        width={10}
                        height={11}
                        color={isValid ? 'var(--accent-color)' : 'var(--input-help-color)'}
                    />
                    Password must be at least 8 characters, maximum 20 characters, contain upper and lower case, number
                    and special character
                </p>
            )}
        </FieldInput>
    );
};

export default FieldPassword;
