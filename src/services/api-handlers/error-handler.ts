// import NavigationService from "src/navigation/NavigationService";
// import routes from "src/navigation/routes";
import { ResolverApiFailure } from 'src/services/api-handlers/api-resolver';
// import {ToastService} from "src/services/toast";
// import {UserAuthService} from "src/services/user-auth";

class ErrorHandler {
    private static DELAY_5XX = 60000;
    private last5xxError: number;

    constructor() {
        this.last5xxError = 0;
    }

    public handle442Error = (result: ResolverApiFailure, callback?: () => void) => {
        this.handleCallback(callback);

        console.error('Error 442', 'Contact with team.');
    };

    public handlexxxError = (result: ResolverApiFailure, callback?: () => void) => {
        this.handleCallback(callback);

        console.info('Something gone wrong', result.error);
        // Sentry.captureException(result.error, {extra: result.sagaPayload});
    };

    public handle403Error = (result: ResolverApiFailure, callback?: () => void) => {
        this.handleCallback(callback);
    };

    public handle4xxError = (result: ResolverApiFailure, callback?: () => void) => {
        this.handleCallback(callback);
    };

    public handle401Error = (result: ResolverApiFailure, callback?: () => void): void => {
        console.info('ErrorHandler - handle401Error', result);
    };

    public handle5xxError = (result: ResolverApiFailure, callback?: () => void): void => {
        if (new Date().getTime() - this.last5xxError < ErrorHandler.DELAY_5XX) {
            return;
        }

        this.last5xxError = new Date().getTime();

        this.handleCallback(callback);

        if (process.env.NODE_ENV === 'development') {
            console.error('Something gone wrong', result.error);
        }

        if (!(process.env.NODE_ENV === 'development')) {
            // Sentry.captureException(result.error, {
            //     extra: {
            //         ...result.sagaPayload,
            //         response: result.error.response,
            //     },
            // });
        }
    };

    private handleCallback = (callback?: () => void) => {
        if (callback) {
            callback();
        }
    };
}

const ErrorHandlerService = new ErrorHandler();

export default ErrorHandlerService;
