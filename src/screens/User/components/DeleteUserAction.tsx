import type { PropsWithChildren } from 'react';
import React, { useCallback, useState } from 'react';
import { Modal } from 'react-bootstrap';
import classNames from 'classnames';
import { useDeleteUserMutation } from 'src/store/api/users';
import Button from 'src/components/ui/Button';
import { toast } from 'react-toastify';
import type { User } from 'src/types/user';

interface Props {
    user: User;
    successCallback?: () => void;
}

const DeleteUserAction: React.FunctionComponent<PropsWithChildren<Props>> = ({ user, children }) => {
    const [deleteUser] = useDeleteUserMutation();
    const loading = !!user;
    const [show, setShow] = useState<boolean>(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleDelete = useCallback(async () => {
        try {
            await deleteUser(user.id).unwrap();
            toast.success('User was removed');
        } catch (e) {
            toast.error('Something went wrong');
        }
    }, [user.id]);

    return (
        <>
            <a href="#" onClick={handleShow}>
                {children}
            </a>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirmation</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Are you sure you want to delete this user?</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button className={classNames('btn-default')} onClick={handleClose} disabled={loading}>
                        Cancel
                    </Button>
                    <Button
                        className={classNames('btn-danger')}
                        onClick={handleDelete}
                        disabled={loading}
                        loading={loading}
                    >
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default DeleteUserAction;
