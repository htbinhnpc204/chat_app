import './header.scss';

import React, { useState } from 'react';

import { Button, Collapse, Nav, Navbar, NavbarToggler } from 'reactstrap';
import LoadingBar from 'react-redux-loading-bar';

import { AccountMenu, AdminMenu, EntitiesMenu } from '../menus';
import { Brand, Home, CreateRoom } from './header-components';
import RoomCreateModal from 'app/modules/administration/room-management/room-create-modal';

export interface IHeaderProps {
  isAuthenticated: boolean;
  isAdmin: boolean;
  isModerator: boolean;
  ribbonEnv: string;
  isInProduction: boolean;
  isOpenAPIEnabled: boolean;
}

const Header = (props: IHeaderProps) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const renderDevRibbon = () =>
    props.isInProduction === false ? (
      <div className="ribbon dev">
        <a href="">Development</a>
      </div>
    ) : null;

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const handleCreateRoom = (name: string, description: string) => {
    // Handle room creation logic here
  };

  /* jhipster-needle-add-element-to-menu - JHipster will add new menu items here */

  return (
    <div id="app-header">
      {/* {renderDevRibbon()} */}
      <LoadingBar className="loading-bar" />
      <Navbar data-cy="navbar" dark expand="md" fixed="top" className="jh-navbar">
        <NavbarToggler aria-label="Menu" onClick={toggleMenu} />
        <Brand />
        <Collapse isOpen={menuOpen} navbar>
          <Nav id="header-tabs" className="ms-auto" navbar>
            <Home />
            {props.isAuthenticated && props.isModerator && (
              <>
                <CreateRoom setShowModal={setShowModal} />
                <RoomCreateModal show={showModal} onHide={() => setShowModal(false)} onSubmit={handleCreateRoom} />
              </>
            )}
            {props.isAuthenticated && props.isAdmin && (
              <AdminMenu showOpenAPI={props.isOpenAPIEnabled} showDatabase={!props.isInProduction} />
            )}
            <AccountMenu isAuthenticated={props.isAuthenticated} />
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
};

export default Header;
