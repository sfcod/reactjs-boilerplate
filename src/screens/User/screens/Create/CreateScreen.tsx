import React, { useMemo } from 'react';
import MainLayout from '../../../../components/layout/MainLayout';
import ContentHeader from '../../../../components/layout/main/ContentHeader';
import Router from '../../../../navigation/router';
import routes from 'src/navigation/routes';
import Content from '../../../../components/layout/main/Content';
import userStatus from 'src/enumerables/user-status';
import type { UserFormData } from '../../components/UserForm';
import UserForm from '../../components/UserForm';
import type { AppDispatch } from 'src/store/configure-store';
import { createUser } from 'src/store/thunks/user-thunks';

interface Query {
    clinicId?: string;
}

interface Props {}

const CreateScreen: React.FunctionComponent<Props> = () => {
    const handleSubmit = (data: UserFormData, dispatch: AppDispatch) => dispatch(createUser({ data })).unwrap();

    const defaultValues = useMemo<Partial<UserFormData>>(() => {
        return {
            status: {
                name: userStatus.getLabel(userStatus.INACTIVE),
                value: userStatus.INACTIVE,
            },
        };
    }, []);

    return (
        <MainLayout>
            <ContentHeader
                title="Create user"
                breadcrumbs={[{ title: 'Users', link: Router.generate(routes.USER_LIST) }]}
            />
            <Content>
                <UserForm title="Create" onSubmit={handleSubmit} defaultValues={defaultValues} />
            </Content>
        </MainLayout>
    );
};

export default CreateScreen;
