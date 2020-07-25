import { Voter } from '../voter.interface';
import user from '../../services/user-auth';

class RoleVoter implements Voter {
    vote(action: string, subject: any): boolean {
        return user.isLoggedIn() && user.getRoles().includes(action);
    }

    supports(action: string, subject: any) {
        return -1 !== action.indexOf('ROLE_');
    }
}

export default RoleVoter;
