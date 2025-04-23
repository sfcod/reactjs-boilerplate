import React from 'react';
import IntlTelInput from 'intl-tel-input/reactWithUtils';
import 'intl-tel-input/styles';
import classNames from 'classnames';

type Props = {} & React.ComponentProps<typeof IntlTelInput>;

const PhoneInput = React.forwardRef<React.ComponentRef<typeof IntlTelInput>, Props>((props, ref) => {
    return (
        <IntlTelInput
            ref={ref}
            {...props}
            inputProps={{
                ...props.inputProps,
                className: classNames('form-control', (props.inputProps as any)?.className),
            }}
        />
    );
});

export default PhoneInput;
