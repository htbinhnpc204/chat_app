import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button, Table } from 'reactstrap';
import { getPaginationState, JhiItemCount, JhiPagination, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSort, faSortDown, faSortUp } from '@fortawesome/free-solid-svg-icons';

import { APP_DATE_FORMAT } from 'app/config/constants';
import { ASC, DESC, ITEMS_PER_PAGE, SORT } from 'app/shared/util/pagination.constants';
import { overridePaginationStateWithQueryParams } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';
import { getRoomsAsAdmin } from './room-management.reducer';

export const RoomManagement = () => {
  const dispatch = useAppDispatch();

  const pageLocation = useLocation();
  const navigate = useNavigate();

  const [pagination, setPagination] = useState(
    overridePaginationStateWithQueryParams(getPaginationState(pageLocation, ITEMS_PER_PAGE, 'id'), pageLocation.search),
  );

  const getRoomsFromProps = () => {
    dispatch(
      getRoomsAsAdmin({
        page: pagination.activePage - 1,
        size: pagination.itemsPerPage,
        sort: `${pagination.sort},${pagination.order}`,
      }),
    );
    const endURL = `?page=${pagination.activePage}&sort=${pagination.sort},${pagination.order}`;
    if (pageLocation.search !== endURL) {
      navigate(`${pageLocation.pathname}${endURL}`);
    }
  };

  useEffect(() => {
    getRoomsFromProps();
  }, [pagination.activePage, pagination.order, pagination.sort]);

  useEffect(() => {
    const params = new URLSearchParams(pageLocation.search);
    const page = params.get('page');
    const sortParam = params.get(SORT);
    if (page && sortParam) {
      const sortSplit = sortParam.split(',');
      setPagination({
        ...pagination,
        activePage: +page,
        sort: sortSplit[0],
        order: sortSplit[1],
      });
    }
  }, [pageLocation.search]);

  const sort = p => () =>
    setPagination({
      ...pagination,
      order: pagination.order === ASC ? DESC : ASC,
      sort: p,
    });

  const handlePagination = currentPage =>
    setPagination({
      ...pagination,
      activePage: currentPage,
    });

  const handleSyncList = () => {
    getRoomsFromProps();
  };

  const rooms = useAppSelector(state => state.roomManagement.rooms || []);
  const totalItems = useAppSelector(state => state.roomManagement.totalItems || 0);
  const loading = useAppSelector(state => state.roomManagement.loading || false);
  const account = useAppSelector(state => state.authentication.account);

  const getSortIconByFieldName = (fieldName: string) => {
    const sortFieldName = pagination.sort;
    const order = pagination.order;
    if (sortFieldName !== fieldName) {
      return faSort;
    }
    return order === ASC ? faSortUp : faSortDown;
  };

  return (
    <div>
      <h2 id="room-management-page-heading" data-cy="roomManagementPageHeading">
        Chat room
        <div className="d-flex justify-content-end">
          <Button className="me-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} /> Refresh list
          </Button>
          <Link to="new" className="btn btn-primary jh-create-entity">
            <FontAwesomeIcon icon="plus" /> Tạo phòng mới
          </Link>
        </div>
      </h2>
      <Table responsive striped>
        <thead>
          <tr>
            <th className="hand" onClick={sort('id')}>
              ID <FontAwesomeIcon icon={getSortIconByFieldName('id')} />
            </th>
            <th className="hand" onClick={sort('name')}>
              Tên phòng <FontAwesomeIcon icon={getSortIconByFieldName('login')} />
            </th>
            <th className="hand">Số thành viên</th>
            <th className="hand" onClick={sort('description')}>
              Mô tả <FontAwesomeIcon icon={getSortIconByFieldName('email')} />
            </th>
            <th className="hand" onClick={sort('createdDate')}>
              Ngày tạo <FontAwesomeIcon icon={getSortIconByFieldName('createdDate')} />
            </th>
            <th className="hand" onClick={sort('lastModifiedBy')}>
              Người sửa <FontAwesomeIcon icon={getSortIconByFieldName('lastModifiedBy')} />
            </th>
            <th id="modified-date-sort" className="hand" onClick={sort('lastModifiedDate')}>
              Ngày sửa <FontAwesomeIcon icon={getSortIconByFieldName('lastModifiedDate')} />
            </th>
            <th />
          </tr>
        </thead>
        <tbody>
          {rooms.map((room, i) => (
            <tr id={room.username} key={`user-${i}`}>
              <td>
                <Button tag={Link} to={room.id.toString()} color="link" size="sm">
                  {room.id}
                </Button>
              </td>
              <td>{room.name}</td>
              <td>{room.members?.length}</td>
              <td>{room.description}</td>
              <td>
                {room.createdDate ? <TextFormat value={room.createdDate} type="date" format={APP_DATE_FORMAT} blankOnInvalid /> : null}
              </td>
              <td>{room.lastModifiedBy}</td>
              <td>
                {room.lastModifiedDate ? (
                  <TextFormat value={room.lastModifiedDate} type="date" format={APP_DATE_FORMAT} blankOnInvalid />
                ) : null}
              </td>
              <td className="text-end">
                <div className="btn-group flex-btn-group-container">
                  <Button tag={Link} to={room.id.toString()} color="info" size="sm">
                    <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">Xem</span>
                  </Button>
                  <Button tag={Link} to={`${room.id}/edit`} color="primary" size="sm">
                    <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Sửa</span>
                  </Button>
                  <Button tag={Link} to={`${room.id}/delete`} color="danger" size="sm" disabled={room.createdBy !== account.username}>
                    <FontAwesomeIcon icon="trash" /> <span className="d-none d-md-inline">Xóa</span>
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      {totalItems ? (
        <div className={rooms?.length > 0 ? '' : 'd-none'}>
          <div className="justify-content-center d-flex">
            <JhiItemCount page={pagination.activePage} total={totalItems} itemsPerPage={pagination.itemsPerPage} />
          </div>
          <div className="justify-content-center d-flex">
            <JhiPagination
              activePage={pagination.activePage}
              onSelect={handlePagination}
              maxButtons={5}
              itemsPerPage={pagination.itemsPerPage}
              totalItems={totalItems}
            />
          </div>
        </div>
      ) : (
        ''
      )}
    </div>
  );
};

export default RoomManagement;
