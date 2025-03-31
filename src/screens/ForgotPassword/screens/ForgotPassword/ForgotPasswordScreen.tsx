import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Router from '../../../../navigation/router';
import routes from 'src/navigation/routes';
// import BackButton from '../../../../components/ui/BackButton';
import ForgotPasswordForm from './components/ForgotPasswordForm';
// import { useSelector } from 'react-redux';
// import { authLoadingSelector } from 'src/store/selectors/auth-selectors';
// import Logo from 'src/components/assets/images/logo.svg?react';
import Button from 'src/components/Button';
import classNames from 'classnames';
import MainLayout from 'src/components/layout/MainLayout';
import NotAuthenticated from 'src/components/auth/NotAuthenticated';

export interface Props {}

const ForgotPasswordScreen: React.FC<Props> = () => {
    // const navigate = useNavigate();
    // const goBack = useCallback(() => {
    //     navigate(Router.generate(routes.HOME));
    // }, []);
    // const loading = useSelector(authLoadingSelector);

    return (
        <MainLayout>
            <ForgotPasswordForm />
            {/* <a href={'/'}>
                    <Logo className={classNames(styles.logo)} />
                </a> */}

            {/* <BackButton onClick={goBack}>Back</BackButton> */}
            {/* <Button
                    form={'forgot'}
                    type={'submit'}
                    // loading={loading} disabled={loading}
                >
                    Next
                </Button> */}

            {/*<Content className={classNames('d-flex-col', 'pt-5', 'pb-5')}>*/}
            {/*    <div className={'row'}>*/}
            {/*        <div className={classNames('col-md-6', 'd-flex')}></div>*/}
            {/*    </div>*/}
            {/*    <div className={classNames('row', 'mt-5', 'mt-md-auto')}>*/}
            {/*        <div className={classNames('col-md-6', 'col-sm-4', 'd-none', 'd-md-block')}>*/}
            {/*            <BackButton onClick={goBack} />*/}
            {/*        </div>*/}
            {/*        <div className={classNames('col-md-6', 'col-sm-8', 'd-flex-col')}>*/}
            {/*            <NextButton form={'forgot'} type={'submit'} loading={loading} />*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*</Content>*/}
        </MainLayout>
    );
};

export default ForgotPasswordScreen;
