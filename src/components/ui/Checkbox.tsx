import type { DetailedHTMLProps, InputHTMLAttributes, PropsWithChildren, ReactNode } from 'react';
import React, { useState } from 'react';
import { uniqueId } from 'lodash';
import classNames from 'classnames';

interface CheckboxProps {
    label?: ReactNode;
    wrapperClassName?: string;
}

type Props = PropsWithChildren<CheckboxProps> &
    DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

const Checkbox = React.forwardRef<any, Props>(({ wrapperClassName, label, ...props }, ref) => {
    const [id] = useState(props.id || uniqueId('checkbox-'));

    return (
        <div className={classNames('form-check', wrapperClassName)}>
            <input
                ref={ref}
                id={id}
                {...props}
                className={classNames('form-check-input', props.className)}
                type="checkbox"
            />
            {label && (
                <label className="form-check-label" htmlFor={id}>
                    {label}
                </label>
            )}
        </div>
    );
});

export default Checkbox;
