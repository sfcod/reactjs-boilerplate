import React from 'react';
import classNames from 'classnames';
import { formatPhoneNumber } from 'src/helpers/phone-number';
import { User } from 'src/types/user';

interface Props {
    user: User;
}

const UserInfo: React.FunctionComponent<Props> = ({ user }: Props) => {
    return (
        <div className={classNames('table-responsive')}>
            <table className={classNames('table')}>
                <tbody>
                    <tr>
                        <th>ID:</th>
                        <td>{user.id}</td>
                    </tr>
                    <tr>
                        <th>First Name:</th>
                        <td>{user.firstName}</td>
                    </tr>
                    <tr>
                        <th>Last Name:</th>
                        <td>{user.lastName}</td>
                    </tr>
                    <tr>
                        <th>Email:</th>
                        <td>{user.email}</td>
                    </tr>
                    <tr>
                        <th>Phone Number:</th>
                        <td>{formatPhoneNumber(user.phoneNumber)}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default React.memo(UserInfo);
