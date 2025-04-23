import { EnumerableAbstract } from './enumerable.abstract';
import type { User } from '../types/user';

class UserGender extends EnumerableAbstract<User['gender']> {
    public readonly MALE = 'male';
    public readonly FEMALE = 'female';
    public readonly OTHER = 'other';

    public getName = () => 'UserGender';

    public defaultChoices = () => ({
        [this.MALE]: 'Male',
        [this.FEMALE]: 'Female',
        [this.OTHER]: 'Other',
    });
}

const userGender = new UserGender();

export default userGender;
