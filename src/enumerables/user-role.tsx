import { EnumerableAbstract } from './enumerable.abstract';

class UserRole extends EnumerableAbstract<string> {
    public readonly ROLE_CUSTOMER = 'ROLE_CUSTOMER';
    public readonly ROLE_USER = 'ROLE_USER';
    public readonly ROLE_STAFF = 'ROLE_STAFF';
    public readonly ROLE_SYSTEM_ADMIN = 'ROLE_SYSTEM_ADMIN';

    public getName = () => 'UserRole';

    public defaultChoices = () => ({
        [this.ROLE_USER]: 'User',
        [this.ROLE_CUSTOMER]: 'Customer',
        [this.ROLE_SYSTEM_ADMIN]: 'Admin',
        [this.ROLE_STAFF]: 'Staff',
    });
}

const userRole = new UserRole();

export default userRole;
