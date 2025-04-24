import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Router from 'src/navigation/router';
import routes from 'src/navigation/routes';
import Button from 'src/components/Button';
import classNames from 'classnames';
import { resetPasswordRequest, validateRecoveryCode } from 'src/store/thunks/auth-thunks.ts';
import { useDispatch } from 'src/hooks/dispatch';
import { useQuery } from 'src/hooks/query';
// import Logo from 'src/components/assets/images/2fa-logo.svg?react';
import MainLayout from 'src/components/layout/MainLayout';

interface Props {}

export enum State {
    LOADING,
    EXPIRED,
    RESEND_ERROR,
    RESEND_SUCCESS,
}

const VerifyCodeLinkScreen: React.FC<Props> = () => {
    const { code, username, state: initialState = State.LOADING } = useQuery();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [state, setState] = useState(Number(initialState) || State.LOADING);

    const onResend = useCallback(() => {
        if (!username) return;
        setState(State.LOADING);
        dispatch(resetPasswordRequest({ username }))
            .unwrap()
            .then(() => {
                setState(State.RESEND_SUCCESS);
                navigate({ search: ``, pathname: location.pathname }, { replace: true });
            })
            .catch(() => setState(State.RESEND_ERROR));
    }, []);

    const goToLogin = useCallback(() => {
        navigate(Router.generate(routes.HOME));
    }, []);

    useEffect(() => {
        if (!code) {
            state === State.LOADING && setState(State.EXPIRED);
            return;
        }

        setState(State.LOADING);
        dispatch(validateRecoveryCode({ code }))
            .unwrap()
            .then(() => navigate(Router.generate(routes.PROFILE), { state: { setup: true } }))
            .catch(() => setState(State.EXPIRED));
    }, [code]);

    return (
        <MainLayout>
            <div className={classNames('container', 'mt-4')}>
                {state === State.EXPIRED && (
                    <>
                        <div>
                            Your one-time link has expired.
                            <br />
                            Click the button below to request a new link to set your password.
                        </div>

                        {username && (
                            <div className={classNames('mt-3')}>
                                <Button type={'button'} onClick={onResend}>
                                    Request a new one-time link
                                </Button>
                            </div>
                        )}
                    </>
                )}

                {state === State.RESEND_SUCCESS && (
                    <div>
                        We have sent you a new one-time link. <br />
                        Please check your email.
                        <div className={classNames('mt-3')}>
                            <Button type={'button'} onClick={goToLogin}>
                                Login
                            </Button>
                        </div>
                    </div>
                )}

                {state === State.RESEND_ERROR && (
                    <div>
                        Something went wrong. <br />
                        Please contact us at{' '}
                        <a className="link" href="mailto:hello@example.com">
                            hello@example.com
                        </a>
                        <div className={classNames('mt-3')}>
                            <Button type={'button'} onClick={goToLogin}>
                                Login
                            </Button>
                        </div>
                    </div>
                )}
            </div>
        </MainLayout>
    );
};

export default VerifyCodeLinkScreen;
