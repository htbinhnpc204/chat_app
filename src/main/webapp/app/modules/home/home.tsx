import './home.scss';

import React from 'react';
import { Link } from 'react-router-dom';

import { Alert, Col, Row } from 'reactstrap';

import { useAppSelector } from 'app/config/store';

export const Home = () => {
  const account = useAppSelector(state => state.authentication.account);

  return (
    <Row>
      <Col md="3" className="pad">
        <span className="hipster rounded" />
      </Col>
      <Col md="9">
        <h1 className="display-4">Welcome to my chat app!</h1>

        {/* Log the user.authorities if user is logged */}

        {account?.authorities ? (
          <div>
            <Alert color="success">Your authorities are: {account.authorities.join(', ')}</Alert>
          </div>
        ) : null}

        {/* If user's authorities contain ROLE_MODERATOR display the room action (Create, modify, delete) */}

        {account?.authorities?.includes('ROLE_MODERATOR') ? (
          <div>
            <Alert color="success">You can manage rooms</Alert>
            <Link to="/rooms" className="btn btn-primary">
              Manage rooms
            </Link>

            <Link to="/rooms/new" className="btn btn-primary">
              Create new room
            </Link>
          </div>
        ) : null}

        <p className="lead">Đây là trang chủ của bạn</p>
        {account?.login ? (
          <div>
            <Alert color="success">Bạn đang đăng nhập bằng tài khoản &quot;{account.username}&quot;.</Alert>
          </div>
        ) : (
          <div>
            <Alert color="warning">
              Nếu bạn muốn
              <span>&nbsp;</span>
              <Link to="/login" className="alert-link">
                đăng nhập
              </Link>
              , bạn có thể thử với tài khoản mặc định:
              <br />- Quản trị viên (tài khoản=&quot;admin&quot; và mật khẩu=&quot;admin&quot;) <br />- Người dùng (tài
              khoản=&quot;user&quot; và mật khẩu=&quot;user&quot;).
            </Alert>

            <Alert color="warning">
              Bạn vẫn chưa có tài khoản?&nbsp;
              <Link to="/account/register" className="alert-link">
                Đăng ký tài khoản mới
              </Link>
            </Alert>
          </div>
        )}
        <p>Nếu bạn có bất kỳ câu hỏi nào về JHipster vui lòng truy cập:</p>

        <ul>
          <li>
            <a href="https://www.jhipster.tech/" target="_blank" rel="noopener noreferrer">
              Trang chủ JHipster
            </a>
          </li>
          <li>
            <a href="https://stackoverflow.com/tags/jhipster/info" target="_blank" rel="noopener noreferrer">
              JHipster trên Stack Overflow
            </a>
          </li>
          <li>
            <a href="https://github.com/jhipster/generator-jhipster/issues?state=open" target="_blank" rel="noopener noreferrer">
              Theo dõi các lỗi JHipster
            </a>
          </li>
          <li>
            <a href="https://gitter.im/jhipster/generator-jhipster" target="_blank" rel="noopener noreferrer">
              Phòng chat công cộng JHipster
            </a>
          </li>
          <li>
            <a href="https://twitter.com/jhipster" target="_blank" rel="noopener noreferrer">
              Theo dõi @jhipster trên Twitter
            </a>
          </li>
        </ul>

        <p>
          Nếu bạn thích JHipster, đừng quên cho chúng tôi thêm một ngôi sao trên{' '}
          <a href="https://github.com/jhipster/generator-jhipster" target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
          !
        </p>
      </Col>
    </Row>
  );
};

export default Home;
