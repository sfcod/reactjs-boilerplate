import React, { useEffect } from 'react';
import { useParams } from 'react-router';
import { useSelector } from 'react-redux';
import MainLayout from '../../../../components/layout/MainLayout';
import ContentHeader from '../../../../components/layout/main/ContentHeader';
import Router from '../../../../navigation/router';
import routes from 'src/navigation/routes';
import Content from '../../../../components/layout/main/Content';
import classNames from 'classnames';
import Actions from './components/Actions';
import Loader from '../../../../components/ui/Loader';
import { userCurrentSelector, usersLoadingSelector } from 'src/store/selectors/user-selectors';
import UserInfo from './components/UserInfo';
import { getUser } from 'src/store/thunks/user-thunks';
import { useDispatch } from 'src/hooks/dispatch';

interface Props {}

const ViewScreen: React.FunctionComponent<Props> = () => {
    const { id } = useParams<'id'>();
    const dispatch = useDispatch();
    const user = useSelector(userCurrentSelector);
    const loading = useSelector(usersLoadingSelector);

    useEffect(() => {
        id && dispatch(getUser({ id }));
    }, [id]);

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
            {loading && user?.id !== id && <Loader />}
        </MainLayout>
    );
};

export default ViewScreen;
