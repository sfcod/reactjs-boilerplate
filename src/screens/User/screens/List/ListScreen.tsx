import React from 'react';
import Content from 'src/components/layout/main/Content';
import ContentHeader from 'src/components/layout/main/ContentHeader';
import MainLayout from 'src/components/layout/MainLayout';
import UsersGrid from '../../components/UsersGrid';
import ActionsColumn from '../../components/ActionsColumn';

interface Props {}

const ListScreen: React.FunctionComponent<Props> = ({}: Props) => {
    return (
        <MainLayout>
            <ContentHeader title="Users" />
            <Content>
                <UsersGrid
                    actionsColumn={{
                        header: 'Actions',
                        accessorKey: 'id',
                        cell: (props) => <ActionsColumn {...props} actions={['view', 'edit', 'delete']} />,
                        enableSorting: false,
                        enableColumnFilter: false,
                        size: 200,
                    }}
                />
            </Content>
        </MainLayout>
    );
};

export default ListScreen;
