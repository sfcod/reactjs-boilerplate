import React from 'react';
import { useParams } from 'react-router';
import MainLayout from '../../../../components/layout/MainLayout';
import ContentHeader from '../../../../components/layout/main/ContentHeader';
import Router from '../../../../navigation/router';
import routes from 'src/navigation/routes';
import Content from '../../../../components/layout/main/Content';
import classNames from 'classnames';
import Actions from './components/Actions';
import Loader from '../../../../components/ui/Loader';
import UserInfo from './components/UserInfo';
import { useGetUserQuery } from 'src/store/api/users';

interface Props {}

const ViewScreen: React.FunctionComponent<Props> = () => {
    const { id } = useParams<'id'>();
    const { data: user, isLoading: loading } = useGetUserQuery(id as string, { skip: !id });

    return (
        <MainLayout>
            <ContentHeader
                title="View User"
                breadcrumbs={[{ title: 'Users', link: Router.generate(routes.USER_LIST) }]}
            />
            <Content>
                {user && (
                    <div className={classNames('card')}>
                        <div className={classNames('card-header')}>
                            {user.firstName} {user.lastName}
                        </div>
                        <div className={classNames('card-body')}>
                            <UserInfo user={user} />
                        </div>
                        <div className={classNames('card-footer')}>
                            <Actions user={user} />
                        </div>
                    </div>
                )}
            </Content>
            {loading && <Loader />}
        </MainLayout>
    );
};

export default ViewScreen;
