import React from 'react';

import { NavItem, NavLink, NavbarBrand } from 'reactstrap';
import { NavLink as Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const BrandIcon = props => (
  <div {...props} className="brand-icon">
    <img src="content/images/logo-jhipster.png" alt="Logo" />
  </div>
);

export const Brand = () => (
  <NavbarBrand tag={Link} to="/" className="brand-logo">
    <BrandIcon />
    <span className="brand-title">ChatApp</span>
    <span className="navbar-version">{VERSION.toLowerCase().startsWith('v') ? VERSION : `v${VERSION}`}</span>
  </NavbarBrand>
);

export const Home = () => (
  <NavItem>
    <NavLink tag={Link} to="/" className="d-flex align-items-center">
      <FontAwesomeIcon icon="home" />
      <span>Trang chủ</span>
    </NavLink>
  </NavItem>
);

export const CreateRoom = ({ setShowModal }: { setShowModal: (show: boolean) => void }) => (
  <NavItem>
    <NavLink tag={Link} to="#room_create" className="d-flex align-items-center" onClick={() => setShowModal(true)}>
      <FontAwesomeIcon icon="plus" />
      <span>Tạo phòng chat</span>
    </NavLink>
  </NavItem>
);
