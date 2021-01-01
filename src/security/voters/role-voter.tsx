import { Voter } from '../voter.interface';
import user from '../../services/user-auth';

class RoleVoter implements Voter {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    vote(action: string, subject: AnyObject): boolean {
        return user.isLoggedIn() && user.getRoles().includes(action);
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    supports(action: string, subject: AnyObject): boolean {
        return -1 !== action.indexOf('ROLE_');
    }
}

export default RoleVoter;
