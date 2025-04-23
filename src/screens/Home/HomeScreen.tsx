import React, { useEffect } from 'react';
import DefaultLayout from 'src/components/layouts/default/DefaultLayout';
import { useUsers } from 'src/react-query/user';

interface Props {}

const HomeScreen: React.FC<Props> = () => {
    const { data } = useUsers({ limit: 5, filters: { email: 'doe@mail.com' } });

    useEffect(() => {
        console.log(data);
    }, [data]);

    return <DefaultLayout>Home</DefaultLayout>;
};

export default HomeScreen;
