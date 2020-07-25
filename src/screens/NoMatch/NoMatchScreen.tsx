import React from 'react';
import MainLayout from '../../components/layout/MainLayout';
import classNames from 'classnames';

interface Props {
    code?: number;
    message?: string;
}

const NoMatchScreen: React.FunctionComponent<Props> = ({ code, message }: Props) => (
    <MainLayout>
        <div className={classNames('container')}>
            <div className={classNames('text-center', 'my-5', 'py-5')}>
                <h1 className={classNames('display-1')}>{code}</h1>
                <p>{message}</p>
            </div>
        </div>
    </MainLayout>
);

NoMatchScreen.defaultProps = {
    code: 404,
    message: 'Page Not found',
};

export default NoMatchScreen;
