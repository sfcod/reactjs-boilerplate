import { EnumerableAbstract } from './enumerable.abstract';

class UserStatus extends EnumerableAbstract {
    public readonly INACTIVE = 0;
    public readonly ACTIVE = 1;
    public readonly PENDING_EMAIL_VERIFICATION = 2;
    public readonly PENDING_PHONE_VERIFICATION = 3;
    public readonly LOCKED = 4;

    public getName = () => 'UserStatus';

    public defaultChoices = () => ({
        [this.INACTIVE]: 'Inactive',
        [this.ACTIVE]: 'Active',
        [this.PENDING_EMAIL_VERIFICATION]: 'Pending Email Verification',
        [this.PENDING_PHONE_VERIFICATION]: 'Pending Phone Verification',
        [this.LOCKED]: 'Locked',
    });
}

const userStatus = new UserStatus();

export default userStatus;
