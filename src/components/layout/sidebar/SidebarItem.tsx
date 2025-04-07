import type { PropsWithChildren } from 'react';
import React from 'react';
import SidebarItemLink from './SidebarItemLink';
import SidebarItemTree from './SidebarItemTree';
import type { IconProp } from '@fortawesome/fontawesome-svg-core';

interface Props {
    title: string;
    icon: IconProp;
    link?: string;
    items?: Array<{ title: string; to: string }>;
}

const SidebarItem: React.FunctionComponent<Props> = React.memo(
    ({ title, icon, link, items }: PropsWithChildren<Props>) => {
        if (items && items.length > 0) {
            return <SidebarItemTree title={title} icon={icon} items={items} />;
        }

        return <SidebarItemLink title={title} to={link ?? '#'} icon={icon} />;
    },
);

export default SidebarItem;
