import { EnumerableAbstract } from './enumerable.abstract';

class UserRole extends EnumerableAbstract {
    public readonly ROLE_CUSTOMER = 'ROLE_CUSTOMER';
    public readonly ROLE_USER = 'ROLE_USER';
    public readonly ROLE_STAFF = 'ROLE_STAFF';
    public readonly ROLE_ADMIN = 'ROLE_ADMIN';

    public listData = (): { [key: string]: any } => ({
        [this.ROLE_CUSTOMER]: 'Customer',
        [this.ROLE_USER]: 'User',
        [this.ROLE_STAFF]: 'Staff',
        [this.ROLE_ADMIN]: 'Admin',
    });
}

const userRole = new UserRole();

export default userRole;
