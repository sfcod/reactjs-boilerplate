import React, { useCallback } from 'react';
import MainLayout from '../../../../components/layout/MainLayout';
import ContentHeader from '../../../../components/layout/main/ContentHeader';
import Router from '../../../../navigation/router';
import routes from 'src/navigation/routes';
import Content from '../../../../components/layout/main/Content';
import { useParams } from 'react-router';
import { useSelector } from 'react-redux';
import { userCurrentSelector, usersLoadingSelector } from 'src/store/selectors/user-selectors';
import Loader from '../../../../components/Loader';
import { getUser, updateUser } from 'src/store/thunks/user-thunks';
import UserForm, { UserFormData } from '../../components/UserForm';
import { useDispatch } from 'src/hooks/dispatch';
import { AppDispatch } from 'src/store/configure-store';
import Resource from 'src/components/Resource';

interface Props {}

const EditScreen: React.FunctionComponent<Props> = () => {
    const { id } = useParams<'id'>();
    const dispatch = useDispatch();
    const user = useSelector(userCurrentSelector);
    const loading = useSelector(usersLoadingSelector);

    const handleSubmit = async (data: UserFormData, dispatch: AppDispatch) => {
        return id && dispatch(updateUser({ id, data })).unwrap();
    };

    const action = useCallback(() => {
        id && dispatch(getUser({ id }));
    }, [id]);

    return (
        <MainLayout>
            <Resource action={action}>
                <ContentHeader
                    title="Edit user"
                    breadcrumbs={[{ title: 'Users', link: Router.generate(routes.USER_LIST) }]}
                />
                <Content loading={!user || user.id !== id}>
                    <UserForm title="Edit" user={user} onSubmit={handleSubmit} />
                    {loading && <Loader />}
                </Content>
            </Resource>
        </MainLayout>
    );
};

export default EditScreen;
