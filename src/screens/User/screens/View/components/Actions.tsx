import React, { useCallback } from 'react';
import classNames from 'classnames';
import { Link, useNavigate } from 'react-router-dom';
import Router from 'src/navigation/router';
import routes from 'src/navigation/routes';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faList, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import Button from 'src/components/Button';
import styles from '../assets/actions.module.scss';
import type { User } from 'src/types/user';
import DeleteUserAction from '../../../components/DeleteUserAction';

interface Props {
    user: User | null;
}

const Actions: React.FC<Props> = ({ user }: Props) => {
    const navigate = useNavigate();

    const deleteCallback = useCallback(() => {
        navigate(Router.generate(routes.USER_LIST));
    }, []);

    if (!user) {
        return null;
    }

    return (
        <div className={classNames(styles.actions)}>
            <Link className={classNames('btn', 'btn-primary')} to={Router.generate(routes.USER_LIST)}>
                <FontAwesomeIcon icon={faList} /> Return to list
            </Link>
            <Link className={classNames('btn', 'btn-success')} to={Router.generate(routes.USER_EDIT, { id: user.id })}>
                <FontAwesomeIcon icon={faEdit} /> Edit
            </Link>

            <DeleteUserAction user={user} successCallback={deleteCallback}>
                <Button className={classNames('btn-danger')}>
                    <FontAwesomeIcon icon={faTrashAlt} /> Delete
                </Button>
            </DeleteUserAction>
        </div>
    );
};

export default Actions;
