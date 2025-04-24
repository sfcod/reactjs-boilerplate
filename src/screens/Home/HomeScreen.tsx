import React, { useEffect } from 'react';
import DefaultLayout from 'src/components/layouts/default/DefaultLayout';
import { useGetUsersQuery } from 'src/store/api/user';

interface Props {}

const HomeScreen: React.FC<Props> = () => {
    // const { data } = useUsers({ limit: 5, filters: { email: 'doe@mail.com' } });
    const { data } = useGetUsersQuery({ limit: 5, filters: { email: 'doe@mail.com' } });

    useEffect(() => {
        console.log(data);
    }, [data]);

    return <DefaultLayout>Home</DefaultLayout>;
};

export default HomeScreen;
