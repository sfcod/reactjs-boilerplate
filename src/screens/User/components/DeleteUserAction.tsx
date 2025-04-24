import type { PropsWithChildren } from 'react';
import React, { useCallback, useState } from 'react';
import { Modal } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import classNames from 'classnames';
import { usersLoadingSelector } from 'src/store/selectors/user-selectors';
import { deleteUser } from 'src/store/thunks/user-thunks';
import Button from 'src/components/ui/Button';
import { toast } from 'react-toastify';
import type { User } from 'src/types/user';
import { useDispatch } from 'src/hooks/dispatch';

interface Props {
    user: User;
    successCallback?: () => void;
}

const DeleteUserAction: React.FunctionComponent<PropsWithChildren<Props>> = ({ user, children, successCallback }) => {
    const dispatch = useDispatch();
    const loading = useSelector(usersLoadingSelector);
    const [show, setShow] = useState<boolean>(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleDelete = useCallback(async () => {
        try {
            await dispatch(deleteUser({ id: user.id })).unwrap();
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
