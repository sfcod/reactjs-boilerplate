import { EnumerableAbstract } from './enumerable.abstract';

class UserGender extends EnumerableAbstract<string> {
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
