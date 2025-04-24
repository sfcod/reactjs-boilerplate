import React, { useCallback } from 'react';
import { useSelector } from 'react-redux';
import Content from 'src/components/layout/main/Content';
import ContentHeader from 'src/components/layout/main/ContentHeader';
import MainLayout from 'src/components/layout/MainLayout';
import Loader from 'src/components/ui/Loader';
import { useDispatch } from 'src/hooks/dispatch';
import type { Paginated } from 'src/services/api-handlers/pagination';
import { usersLoadingSelector, usersSelector } from 'src/store/selectors/user-selectors';
import { listUsers } from 'src/store/thunks/user-thunks';
import type { QueryParams } from 'src/types/grid';
import type { User } from 'src/types/user';
import UsersGrid from '../../components/UsersGrid';
import ActionsColumn from '../../components/ActionsColumn';

interface Props {}

const ListScreen: React.FunctionComponent<Props> = ({}: Props) => {
    const dispatch = useDispatch();
    const loading: boolean = useSelector(usersLoadingSelector);
    const data: Paginated<User> = useSelector(usersSelector);

    const getData = useCallback((params: QueryParams) => {
        dispatch(listUsers(params));
    }, []);

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
                    data={data}
                    getData={getData}
                    // title={<ListHeading />}
                />
                {loading && <Loader />}
            </Content>
        </MainLayout>
    );
};

export default ListScreen;
