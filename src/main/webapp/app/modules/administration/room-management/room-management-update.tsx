import React, { useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Col, Row } from 'reactstrap';
import { ValidatedField, ValidatedForm } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useAppDispatch, useAppSelector } from 'app/config/store';
import { createRoom, getRoom, reset, updateRoom } from './room-management.reducer';

export const RoomManagementUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id: id } = useParams<'id'>();
  const isNew = id === undefined;

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getRoom(id));
    }
    return () => {
      dispatch(reset());
    };
  }, [id]);

  const handleClose = () => {
    navigate('/rooms');
  };

  const saveRoom = values => {
    if (isNew) {
      dispatch(createRoom(values));
    } else {
      dispatch(updateRoom(values));
    }
    handleClose();
  };

  const isInvalid = false;
  const room = useAppSelector(state => state.roomManagement.room);
  const loading = useAppSelector(state => state.roomManagement.loading);
  const updating = useAppSelector(state => state.roomManagement.updating);

  // ignore unexpected console statement
  // eslint-disable-next-line no-console
  console.log(id);
  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2>{id ? 'Chỉnh sửa thông tin phòng' : 'Tạo phòng mới'}</h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <ValidatedForm onSubmit={saveRoom} defaultValues={room}>
              {room.id ? <ValidatedField type="text" name="id" required readOnly label="ID" validate={{ required: true }} /> : null}
              <ValidatedField
                type="text"
                name="name"
                label="Tên phòng"
                validate={{
                  required: {
                    value: true,
                    message: 'Bạn phải nhập tên phòng.',
                  },
                  minLength: {
                    value: 1,
                    message: 'Tên phòng phải có ít nhất 1 ký tự.',
                  },
                  maxLength: {
                    value: 50,
                    message: 'Tên phòng không được vượt quá 50 ký tự.',
                  },
                }}
              />
              <ValidatedField
                type="text"
                name="description"
                label="Mô tả"
                validate={{
                  maxLength: {
                    value: 250,
                    message: 'Mô tả không được vượt quá 250 ký tự.',
                  },
                }}
              />
              <Button tag={Link} to="/rooms" replace color="info">
                <FontAwesomeIcon icon="arrow-left" />
                &nbsp;
                <span className="d-none d-md-inline">Quay lại</span>
              </Button>
              &nbsp;
              <Button color="primary" type="submit" disabled={isInvalid || updating}>
                <FontAwesomeIcon icon="save" />
                &nbsp; Lưu
              </Button>
            </ValidatedForm>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default RoomManagementUpdate;
