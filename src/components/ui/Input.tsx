import React from 'react';
import classNames from 'classnames';

type Props = {} & React.InputHTMLAttributes<HTMLInputElement>;

const Input: React.FC<Props> = React.forwardRef<HTMLInputElement, Props>((props, ref) => {
    return <input {...props} ref={ref} className={classNames('form-control', props.className)} />;
});

export default Input;
