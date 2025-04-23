import React from 'react';
import type { Props as SelectProps } from 'react-select';
import Select from 'react-select';

export interface Props<Option, IsMulti extends boolean> extends SelectProps<Option, IsMulti, any> {}

const Dropdown = <T extends any, M extends boolean>(props: Props<T, M>) => {
    return <Select {...props} />;
};

export default Dropdown;
