import React, { ReactElement } from 'react';
import styles from './assets/password-recovery-screen.module.scss';
import classNames from 'classnames';
import RecoveryRequestForm from './components/RecoveryRequestForm';
import ValidateCodeForm from './components/ValidateCodeForm';
import ResetPasswordForm from './components/UpdatePasswordForm';
import { RouteComponentProps, withRouter } from 'react-router';
import MainLayout from '../../../../components/layout/MainLayout';

export interface StateProps {
}

export interface DispatchProps {
    redirectToDefault: () => void;
}

export interface OwnProps {
}

export interface Props extends StateProps, DispatchProps, OwnProps {
}

interface State {
    step: number;
}

class PasswordRecoveryScreen extends React.Component<Props & RouteComponentProps, State> {
    state: State = {
        step: 1,
    };

    public render(): ReactElement {
        const { redirectToDefault } = this.props;
        const { step } = this.state;

        return (
            <MainLayout>
                <div className={classNames('container')}>
                    <div className={classNames('row')}>
                        <div className={classNames('col-lg-12')}>
                            <h1 className={classNames(styles.heading)}>Password recovery</h1>
                            <div className={classNames(styles.passwordRecovery, 'col-lg-6 offset-lg-3 py-3')}>
                                {step === 1 && <RecoveryRequestForm onSubmitSuccess={this.nextStep} />}
                                {step === 2 && <ValidateCodeForm onSubmitSuccess={this.nextStep} />}
                                {step === 3 && <ResetPasswordForm onSubmitSuccess={redirectToDefault} />}
                            </div>
                        </div>
                    </div>
                </div>
            </MainLayout>
        );
    }

    private nextStep = () => {
        this.setState((state: State) => ({
            step: state.step + 1,
        }));
    };
}

export default withRouter(PasswordRecoveryScreen);
