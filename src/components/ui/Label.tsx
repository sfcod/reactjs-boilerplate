import React from 'react';
import classNames from 'classnames';

type Props = {} & React.LabelHTMLAttributes<HTMLLabelElement>;

const Label: React.FC<Props> = ({ children, ...props }) => {
    return (
        <label {...props} className={classNames('form-label', props.className)}>
            {children}
        </label>
    );
};

export default Label;
