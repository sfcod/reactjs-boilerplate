import React from 'react';
import MainLayout from '../../../../components/layout/MainLayout';
import ContentHeader from '../../../../components/layout/main/ContentHeader';
import Router from '../../../../navigation/router';
import routes from 'src/navigation/routes';
import Content from '../../../../components/layout/main/Content';
import { useParams } from 'react-router';
import Loader from '../../../../components/ui/Loader';
import { useGetUserQuery, useUpdateUserMutation } from 'src/store/api/users';
import type { UserFormData } from '../../components/UserForm';
import UserForm from '../../components/UserForm';

interface Props {}

const EditScreen: React.FunctionComponent<Props> = () => {
    const { id } = useParams<'id'>();
    const { data: user } = useGetUserQuery(id as string, { skip: !id });
    const [updateUser, { isLoading }] = useUpdateUserMutation();

    const handleSubmit = async (data: UserFormData) => {
        const status = (data as any)?.status?.value ?? data.status;
        return id && updateUser({ id, data: { ...data, status } }).unwrap();
    };

    return (
        <MainLayout>
            <ContentHeader
                title="Edit user"
                breadcrumbs={[{ title: 'Users', link: Router.generate(routes.USER_LIST) }]}
            />
            <Content loading={!user || user.id !== id}>
                <UserForm title="Edit" user={user} onSubmit={handleSubmit} />
                {isLoading && <Loader />}
            </Content>
        </MainLayout>
    );
};

export default EditScreen;
