import React from 'react';
import { Route } from 'react-router-dom';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';
import RoomManagement from 'app/modules/room/room-management';
import RoomManagementUpdate from 'app/modules/room/room-management-update';
import RoomManagementDetail from 'app/modules/room/room-management-detail';
import RoomManagementDeleteDialog from 'app/modules/room/room-management-delete-dialog';

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
