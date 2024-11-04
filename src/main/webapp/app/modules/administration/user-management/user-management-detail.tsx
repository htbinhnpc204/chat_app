import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Badge, Button, Row } from 'reactstrap';
import { TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT } from 'app/config/constants';

import { useAppDispatch, useAppSelector } from 'app/config/store';
import { getUser } from './user-management.reducer';

export const UserManagementDetail = () => {
  const dispatch = useAppDispatch();

  const { login } = useParams<'login'>();

  useEffect(() => {
    dispatch(getUser(login));
  }, []);

  const user = useAppSelector(state => state.userManagement.user);

  return (
    <div>
      <h2>
        Tài khoản [<strong>{user.username}</strong>]
      </h2>
      <Row size="md">
        <dl className="jh-entity-details">
          <dt>Tên đăng nhập</dt>
          <dd>
            <span>{user.username}</span>&nbsp;
            {user.activated ? <Badge color="success">Kích hoạt</Badge> : <Badge color="danger">Khóa</Badge>}
          </dd>
          <dt>Tên</dt>
          <dd>{user.firstName}</dd>
          <dt>Họ</dt>
          <dd>{user.lastName}</dd>
          <dt>Email</dt>
          <dd>{user.email}</dd>
          <dt>Người tạo</dt>
          <dd>{user.createdBy}</dd>
          <dt>Ngày tạo</dt>
          <dd>{user.createdDate ? <TextFormat value={user.createdDate} type="date" format={APP_DATE_FORMAT} blankOnInvalid /> : null}</dd>
          <dt>Người sửa</dt>
          <dd>{user.lastModifiedBy}</dd>
          <dt>Ngày sửa</dt>
          <dd>
            {user.lastModifiedDate ? (
              <TextFormat value={user.lastModifiedDate} type="date" format={APP_DATE_FORMAT} blankOnInvalid />
            ) : null}
          </dd>
          <dt>Các quyền</dt>
          <dd>
            <ul className="list-unstyled">
              {user.authorities
                ? user.authorities.map((authority, i) => (
                    <li key={`user-auth-${i}`}>
                      <Badge color="info">{authority}</Badge>
                    </li>
                  ))
                : null}
            </ul>
          </dd>
        </dl>
      </Row>
      <Button tag={Link} to="/admin/user-management" replace color="info">
        <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Quay lại</span>
      </Button>
    </div>
  );
};

export default UserManagementDetail;
