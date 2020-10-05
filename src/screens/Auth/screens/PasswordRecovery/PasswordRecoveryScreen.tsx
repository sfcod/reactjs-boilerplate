import React, { ReactElement } from 'react';
import styles from './assets/password-recovery-screen.module.scss';
import classNames from 'classnames';
import RecoveryRequestForm from './components/RecoveryRequestForm';
import ValidateCodeForm from './components/ValidateCodeForm';
import ResetPasswordForm from './components/ResetPasswordForm';
import { RouteComponentProps, withRouter } from 'react-router';
import MainLayout from '../../../../components/layout/MainLayout';

export interface StateProps {}

export interface DispatchProps {}

export interface OwnProps {}

export interface Props extends StateProps, DispatchProps, OwnProps {}

interface State {
    step: number;
}

class PasswordRecoveryScreen extends React.Component<Props & RouteComponentProps, State> {
    state: State = {
        step: 1,
    };

    public render(): ReactElement {
        const { step } = this.state;

        return (
            <MainLayout>
                <div className={classNames(styles.passwordRecovery, 'py-3')}>
                    {step === 1 && <RecoveryRequestForm onSubmitSuccess={this.nextStep} />}
                    {step === 2 && <ValidateCodeForm onSubmitSuccess={this.nextStep} />}
                    {step === 3 && <ResetPasswordForm onSubmitSuccess={() => console.log('success')} />}
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
