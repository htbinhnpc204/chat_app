import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useAppDispatch, useAppSelector } from 'app/config/store';
import { deleteRoom, getRoom } from './room-management.reducer';

export const RoomManagementDeleteDialog = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();
  const { id: id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getRoom(id));
  }, []);

  const handleClose = event => {
    event.stopPropagation();
    navigate('/rooms');
  };

  const room = useAppSelector(state => state.roomManagement.room);

  const confirmDelete = event => {
    dispatch(deleteRoom(room.id));
    handleClose(event);
  };

  return (
    <Modal isOpen toggle={handleClose}>
      <ModalHeader toggle={handleClose}>Xác nhận hành động xóa</ModalHeader>
      <ModalBody>Bạn có chắc chắn muốn xóa phòng {room.name}?</ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={handleClose}>
          <FontAwesomeIcon icon="ban" />
          &nbsp; Hủy
        </Button>
        <Button color="danger" onClick={confirmDelete}>
          <FontAwesomeIcon icon="trash" />
          &nbsp; Xóa
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default RoomManagementDeleteDialog;
