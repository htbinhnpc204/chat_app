import React from 'react';
import { Route } from 'react-router-dom';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';
import RoomManagement from './room-management';
import RoomManagementUpdate from './room-management-update';
import RoomManagementDetail from './room-management-detail';
import RoomManagementDeleteDialog from './room-management-delete-dialog';

const RoomManagementRoutes = () => (
  <div>
    <ErrorBoundaryRoutes>
      <Route index element={<RoomManagement />} />
      <Route path="new" element={<RoomManagementUpdate />} />
      <Route path=":id">
        <Route index element={<RoomManagementDetail />} />
        <Route path="edit" element={<RoomManagementUpdate />} />
        <Route path="delete" element={<RoomManagementDeleteDialog />} />
      </Route>
    </ErrorBoundaryRoutes>
  </div>
);

export default RoomManagementRoutes;
