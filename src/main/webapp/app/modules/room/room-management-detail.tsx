import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Badge, Button, Row } from 'reactstrap';
import { TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT } from 'app/config/constants';

import { useAppDispatch, useAppSelector } from 'app/config/store';
import { getRoom } from './room-management.reducer';

export const RoomManagementDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getRoom(id));
  }, []);

  const room = useAppSelector(state => state.roomManagement.room);

  return (
    <div>
      <h2>
        Phòng [<strong>{room.name}</strong>]
      </h2>
      <Row size="md">
        <dl className="jh-entity-details">
          <dt>Tên phòng</dt>
          <dd>
            <span>{room.name}</span>&nbsp;
            <Badge color="success">{room.members.length}</Badge>
          </dd>
          <dt>Mô tả</dt>
          <dd>
            <span>{room.description}</span>
          </dd>
          <dt>Người tạo</dt>
          <dd>{room.createdBy}</dd>
          <dt>Ngày tạo</dt>
          <dd>{room.createdDate ? <TextFormat value={room.createdDate} type="date" format={APP_DATE_FORMAT} blankOnInvalid /> : null}</dd>
          <dt>Người sửa</dt>
          <dd>{room.lastModifiedBy}</dd>
          <dt>Ngày sửa</dt>
          <dd>
            {room.lastModifiedDate ? (
              <TextFormat value={room.lastModifiedDate} type="date" format={APP_DATE_FORMAT} blankOnInvalid />
            ) : null}
          </dd>
        </dl>
      </Row>
      <Button tag={Link} to="/rooms" replace color="info">
        <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Quay lại</span>
      </Button>
    </div>
  );
};

export default RoomManagementDetail;
