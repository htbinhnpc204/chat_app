import React, { useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Col, FormText, Row } from 'reactstrap';
import { isEmail, ValidatedField, ValidatedForm } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useAppDispatch, useAppSelector } from 'app/config/store';
import { createUser, getRoles, getUser, reset, updateUser } from './user-management.reducer';

export const UserManagementUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { login: username } = useParams<'login'>();
  const isNew = username === undefined;

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getUser(username));
    }
    dispatch(getRoles());
    return () => {
      dispatch(reset());
    };
  }, [username]);

  const handleClose = () => {
    navigate('/admin/user-management');
  };

  const saveUser = values => {
    if (isNew) {
      dispatch(createUser(values));
    } else {
      dispatch(updateUser(values));
    }
    handleClose();
  };

  const isInvalid = false;
  const user = useAppSelector(state => state.userManagement.user);
  const loading = useAppSelector(state => state.userManagement.loading);
  const updating = useAppSelector(state => state.userManagement.updating);
  const authorities = useAppSelector(state => state.userManagement.authorities);

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h1>Tạo hoặc sửa tài khoản</h1>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <ValidatedForm onSubmit={saveUser} defaultValues={user}>
              {user.id ? <ValidatedField type="text" name="id" required readOnly label="ID" validate={{ required: true }} /> : null}
              <ValidatedField
                type="text"
                name="username"
                label="Tên đăng nhập"
                validate={{
                  required: {
                    value: true,
                    message: 'Bạn phải nhập tên tài khoản.',
                  },
                  pattern: {
                    value: /^[a-zA-Z0-9!$&*+=?^_`{|}~.-]+@[a-zA-Z0-9-]+(?:\\.[a-zA-Z0-9-]+)*$|^[_.@A-Za-z0-9-]+$/,
                    message: 'Your username is invalid.',
                  },
                  minLength: {
                    value: 1,
                    message: 'Tên tài khoản phải có ít nhất 1 ký tự.',
                  },
                  maxLength: {
                    value: 50,
                    message: 'Tên tài khoản không được vượt quá 50 ký tự.',
                  },
                }}
              />
              <ValidatedField
                type="text"
                name="firstName"
                label="Tên"
                validate={{
                  maxLength: {
                    value: 50,
                    message: 'Trường này không được vượt quá 50 ký tự.',
                  },
                }}
              />
              <ValidatedField
                type="text"
                name="lastName"
                label="Họ"
                validate={{
                  maxLength: {
                    value: 50,
                    message: 'Trường này không được vượt quá 50 ký tự.',
                  },
                }}
              />
              <FormText>This field cannot be longer than 50 characters.</FormText>
              <ValidatedField
                name="email"
                label="Email"
                placeholder="Nhập email của bạn"
                type="email"
                validate={{
                  required: {
                    value: true,
                    message: 'Bạn phải nhập email.',
                  },
                  minLength: {
                    value: 5,
                    message: 'Email phải có ít nhất 5 ký tự.',
                  },
                  maxLength: {
                    value: 254,
                    message: 'Email không được vượt quá 50 ký tự.',
                  },
                  validate: v => isEmail(v) || 'Email bạn nhập không hợp lệ.',
                }}
              />
              <ValidatedField type="checkbox" name="activated" check value={true} disabled={!user.id} label="Kích hoạt" />
              <ValidatedField type="select" name="authorities" multiple label="Các quyền">
                {authorities.map(role => (
                  <option value={role} key={role}>
                    {role}
                  </option>
                ))}
              </ValidatedField>
              <Button tag={Link} to="/admin/user-management" replace color="info">
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

export default UserManagementUpdate;
