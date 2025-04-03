import React from 'react';
import userStatus from 'src/enumerables/user-status';

interface Props {
    value: number;
}

const UserStatusColumn: React.FC<Props> = React.memo(({ value }) => <span>{userStatus.getLabel(value)}</span>);

export default UserStatusColumn;
