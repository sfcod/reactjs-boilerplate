import type { Voter } from '../voter.interface';
import user from '../../services/user-auth';

class RoleVoter implements Voter {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    vote(action: string, subject: any): boolean {
        const userRoles = user.getRoles();
        return user.isLoggedIn() && user.getRoles().includes(action);
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    supports(action: string, subject: any) {
        const actionIndexRole = action.indexOf('ROLE_');
        const supports = actionIndexRole !== -1;
        return -1 !== action.indexOf('ROLE_');
    }
}

export default RoleVoter;
