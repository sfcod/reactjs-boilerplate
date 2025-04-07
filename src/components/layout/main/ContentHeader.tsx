import React from 'react';
import { Link } from 'react-router-dom';

interface Breadcrumb {
    title: string;
    link: string;
}

interface Props {
    title: string;
    breadcrumbs?: Array<Breadcrumb>;
}

const ContentHeader: React.FunctionComponent<Props> = React.memo(({ title, breadcrumbs = [] }: Props) => (
    <div className="content-header">
        <div className="container-fluid">
            <div className="row mb-2">
                <div className="col-sm-6">
                    <h3 className="m-0 text-dark">{title}</h3>
                </div>
                <div className="col-sm-6">
                    {breadcrumbs.length > 0 && (
                        <ol className="breadcrumb float-sm-right">
                            {breadcrumbs.map((item) => (
                                <li key={item.link} className="breadcrumb-item">
                                    <Link to={item.link}>{item.title}</Link>
                                </li>
                            ))}
                            <li className="breadcrumb-item active">{title}</li>
                        </ol>
                    )}
                </div>
            </div>
        </div>
    </div>
));

export default ContentHeader;
