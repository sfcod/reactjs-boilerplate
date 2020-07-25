import React from 'react';
import styles from './assets/login-screen.module.scss';
import LoginForm from './components/LoginForm';
import classNames from 'classnames';
import MainLayout from 'src/components/layout/MainLayout';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface StateProps {}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface DispatchProps {}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface OwnProps {}

export interface Props extends StateProps, DispatchProps, OwnProps {}

type State = {};

class LoginScreen extends React.Component<Props, State> {
    render() {
        return (
            <MainLayout>
                <div className={classNames(styles.login)}>
                    <div className={classNames('container')}>
                        <div className={classNames('row')}>
                            <div className={classNames('col-lg-6', 'py-2')}>
                                <h1 className={classNames(styles.heading)}>Home page</h1>
                                <h2 className={classNames(styles.subHeading)}>Your login form</h2>
                                <b className={classNames(styles.noteHeading)}>Please note:</b>
                                <p className={classNames(styles.note)}>
                                    <em>
                                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem
                                        Ipsum has been the `${"industry's"}` standard dummy text ever since the 1500s,
                                        when an unknown printer took a galley of type and scrambled it to make a type
                                        specimen book.
                                    </em>
                                </p>
                            </div>
                            <div className={classNames('col-lg-6')}>
                                <LoginForm />
                            </div>
                        </div>
                    </div>
                </div>
            </MainLayout>
        );
    }
}

export default LoginScreen;
