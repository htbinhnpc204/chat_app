import React from 'react';
import MenuItem from 'app/shared/layout/menus/menu-item';
import { DropdownItem } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NavDropdown } from './menu-components';

const adminMenuItems = () => (
  <>
    <MenuItem icon="users" to="/admin/user-management">
      Quản lý tài khoản
    </MenuItem>
    <MenuItem icon="tachometer-alt" to="/admin/metrics">
      Số liệu
    </MenuItem>
    <MenuItem icon="heart" to="/admin/health">
      Tình trạng
    </MenuItem>
    <MenuItem icon="cogs" to="/admin/configuration">
      Cấu hình
    </MenuItem>
    <MenuItem icon="tasks" to="/admin/logs">
      Ghi logs
    </MenuItem>
    {/* jhipster-needle-add-element-to-admin-menu - JHipster will add entities to the admin menu here */}
  </>
);

const openAPIItem = () => (
  <MenuItem icon="book" to="/admin/docs">
    API
  </MenuItem>
);

const databaseItem = () => (
  <DropdownItem tag="a" href="./h2-console/" target="_tab">
    <FontAwesomeIcon icon="database" fixedWidth /> Cơ sở dữ liệu
  </DropdownItem>
);

export const AdminMenu = ({ showOpenAPI, showDatabase }) => (
  <NavDropdown icon="users-cog" name="Quản trị" id="admin-menu" data-cy="adminMenu">
    {adminMenuItems()}
    {showOpenAPI && openAPIItem()}

    {showDatabase && databaseItem()}
  </NavDropdown>
);

export default AdminMenu;
