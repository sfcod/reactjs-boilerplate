import voters from './voters';

type supportedStrategies = 'affirmative' | 'consensus' | 'unanimous';

class Security {
    private readonly strategy: supportedStrategies;

    constructor(strategy: supportedStrategies = 'affirmative') {
        this.strategy = strategy;
    }

    public isGranted = (action: string, subject?: any): boolean => {
        switch (this.strategy) {
            case 'unanimous':
                for (const voter of voters) {
                    if (voter.supports(action, subject) && !voter.vote(action, subject)) {
                        return false;
                    }
                }

                return true;
            case 'consensus':
                let count = 1;
                for (const voter of voters) {
                    if (voter.supports(action, subject)) {
                        count += +voter.vote(action, subject);
                    }
                }

                return count > 0;
            case 'affirmative':
                let result = true;
                for (const voter of voters) {
                    if (voter.supports(action, subject)) {
                        result = voter.vote(action, subject);

                        if (result) {
                            return true;
                        }
                    }
                }

                return result;
            default:
                throw Error('Strategy is not correct.');
        }
    };
}

const securityService = new Security();

export default securityService;
