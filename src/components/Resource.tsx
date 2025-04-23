import type { ReactNode } from 'react';
import React, { useState } from 'react';
import Error from 'src/components/Error';
import { useEffectOnce } from 'src/hooks/use-effect-once';
import type { ResolverApiFailure } from 'src/services/api-handlers/api-resolver';
import { ResourceCallbacks } from 'src/types/redux';
// import { useEffectOnce } from '../hooks/use-effect-once';

interface Props {
    children: ReactNode;
    action: (callbacks: ResourceCallbacks<any>) => void;
}

const Resource: React.FC<Props> = ({ children, action }: Props) => {
    const [error, setError] = useState<ResolverApiFailure['error']['response'] | null>(null);

    useEffectOnce(() => {
        action({ failure: setError });
    }, [action]);

    return (
        <>
            {error ? (
                <Error code={error.data?.statusCode} message={error.data?.message || error.statusText} />
            ) : (
                children
            )}
        </>
    );
};

export default Resource;
