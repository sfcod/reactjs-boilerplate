import React from 'react';
import type { CellContext } from '@tanstack/react-table';
import { faEdit, faEye, faPlus, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import routes from 'src/navigation/routes';
import Router from '../../../navigation/router';
import classNames from 'classnames';
import styles from '../assets/actions-column.module.scss';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import DeleteUserAction from './DeleteUserAction';
import { User } from 'src/types/user';

interface Props extends CellContext<User, any> {
    actions: Array<'view' | 'create' | 'edit' | 'delete'>;
}

const ActionsColumn: React.FunctionComponent<Props> = React.memo(
    ({
        cell: {
            row: { original },
            getValue,
        },
        actions,
    }: Props) => {
        const value = getValue();

        return (
            <div className={classNames(styles.container, 'btn-group')}>
                {actions.includes('view') && (
                    <OverlayTrigger placement="top" overlay={<Tooltip id="tooltip-patient-view">View</Tooltip>}>
                        <Link to={Router.generate(routes.USER_VIEW, { id: value })}>
                            <FontAwesomeIcon icon={faEye} />
                        </Link>
                    </OverlayTrigger>
                )}
                {actions.includes('create') && (
                    <OverlayTrigger placement="top" overlay={<Tooltip id="tooltip-patient-view">Create</Tooltip>}>
                        <Link to={Router.generate(routes.USER_CREATE)}>
                            <FontAwesomeIcon icon={faPlus} />
                        </Link>
                    </OverlayTrigger>
                )}
                {actions.includes('edit') && (
                    <OverlayTrigger placement="top" overlay={<Tooltip id="tooltip-patient-edit">Edit</Tooltip>}>
                        <Link to={Router.generate(routes.USER_EDIT, { id: value })}>
                            <FontAwesomeIcon icon={faEdit} />
                        </Link>
                    </OverlayTrigger>
                )}
                {actions.includes('delete') && (
                    <OverlayTrigger placement="top" overlay={<Tooltip id="tooltip-patient-delete">Delete</Tooltip>}>
                        <div>
                            <DeleteUserAction user={original}>
                                <FontAwesomeIcon icon={faTrashAlt} />
                            </DeleteUserAction>
                        </div>
                    </OverlayTrigger>
                )}
            </div>
        );
    },
);

export default ActionsColumn;
