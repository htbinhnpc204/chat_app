import { configureStore } from '@reduxjs/toolkit';
import axios from 'axios';
import * as sinon from 'sinon';

import { defaultValue } from 'app/shared/model/room.model';
import roomManagement, { createRoom, deleteRoom, getRoom, getRooms, getRoomsAsAdmin, reset, updateRoom } from './room-management.reducer';

describe('Room management reducer tests', () => {
  const username = process.env.E2E_USERNAME ?? 'admin';

  function isEmpty(element): boolean {
    if (element instanceof Array) {
      return element.length === 0;
    }
    return Object.keys(element).length === 0;
  }

  function testInitialState(state) {
    expect(state).toMatchObject({
      loading: false,
      errorMessage: null,
      updating: false,
      updateSuccess: false,
      totalItems: 0,
    });
    expect(isEmpty(state.rooms));
    expect(isEmpty(state.authorities));
    expect(isEmpty(state.room));
  }

  function testMultipleTypes(types, payload, testFunction, error?) {
    types.forEach(e => {
      testFunction(roomManagement(undefined, { type: e, payload, error }));
    });
  }

  describe('Common', () => {
    it('should return the initial state', () => {
      testInitialState(roomManagement(undefined, { type: 'unknown' }));
    });
  });

  describe('Requests', () => {
    it('should set state to loading', () => {
      testMultipleTypes([getRooms.pending.type, getRoomsAsAdmin.pending.type, getRoom.pending.type], {}, state => {
        expect(state).toMatchObject({
          errorMessage: null,
          updateSuccess: false,
          loading: true,
        });
      });
    });

    it('should set state to updating', () => {
      testMultipleTypes([createRoom.pending.type, updateRoom.pending.type, deleteRoom.pending.type], {}, state => {
        expect(state).toMatchObject({
          errorMessage: null,
          updateSuccess: false,
          updating: true,
        });
      });
    });
  });

  describe('Failures', () => {
    it('should set state to failed and put an error message in errorMessage', () => {
      testMultipleTypes(
        [
          getRoomsAsAdmin.rejected.type,
          getRooms.rejected.type,
          getRoom.rejected.type,
          createRoom.rejected.type,
          updateRoom.rejected.type,
          deleteRoom.rejected.type,
        ],
        { message: 'something happened' },
        state => {
          expect(state).toMatchObject({
            loading: false,
            updating: false,
            updateSuccess: false,
            errorMessage: 'error happened',
          });
        },
        { message: 'error happened' },
      );
    });
  });

  describe('Success', () => {
    it('should update state according to a successful fetch users request', () => {
      const headers = { 'x-total-count': 42 };
      const payload = { data: 'some handsome users', headers };
      const toTest = roomManagement(undefined, { type: getRooms.fulfilled.type, payload });

      expect(toTest).toMatchObject({
        loading: false,
        users: payload.data,
        totalItems: headers['x-total-count'],
      });
    });

    it('should update state according to a successful fetch user request', () => {
      const payload = { data: 'some handsome user' };
      const toTest = roomManagement(undefined, { type: getRoom.fulfilled.type, payload });

      expect(toTest).toMatchObject({
        loading: false,
        user: payload.data,
      });
    });

    it('should set state to successful update', () => {
      testMultipleTypes([createRoom.fulfilled.type, updateRoom.fulfilled.type], { data: 'some handsome user' }, types => {
        expect(types).toMatchObject({
          updating: false,
          updateSuccess: true,
          user: 'some handsome user',
        });
      });
    });

    it('should set state to successful update with an empty user', () => {
      const toTest = roomManagement(undefined, { type: deleteRoom.fulfilled.type });

      expect(toTest).toMatchObject({
        updating: false,
        updateSuccess: true,
      });
      expect(isEmpty(toTest.room));
    });
  });

  describe('Reset', () => {
    it('should reset the state', () => {
      const initialState = {
        loading: false,
        errorMessage: null,
        users: [],
        authorities: [] as any[],
        user: defaultValue,
        updating: false,
        updateSuccess: false,
        totalItems: 0,
      };
      const initialStateNew = {
        ...initialState,
        loading: true,
      };
      expect(roomManagement(initialStateNew, reset)).toEqual(initialState);
    });
  });

  describe('Actions', () => {
    let store;

    const resolvedObject = { value: 'whatever' };
    const getState = jest.fn();
    const dispatch = jest.fn();
    const extra = {};
    beforeEach(() => {
      store = configureStore({
        reducer: (state = [], action) => [...state, action],
      });
      axios.get = sinon.stub().returns(Promise.resolve(resolvedObject));
      axios.put = sinon.stub().returns(Promise.resolve(resolvedObject));
      axios.post = sinon.stub().returns(Promise.resolve(resolvedObject));
      axios.delete = sinon.stub().returns(Promise.resolve(resolvedObject));
    });

    it('dispatches FETCH_USERS_AS_ADMIN_PENDING and FETCH_USERS_AS_ADMIN_FULFILLED actions', async () => {
      const arg = {};

      const result = await getRoomsAsAdmin(arg)(dispatch, getState, extra);

      const pendingAction = dispatch.mock.calls[0][0];
      expect(pendingAction.meta.requestStatus).toBe('pending');
      expect(getRoomsAsAdmin.fulfilled.match(result)).toBe(true);
    });

    it('dispatches FETCH_USERS_AS_ADMIN_PENDING and FETCH_USERS_AS_ADMIN_FULFILLED actions with pagination options', async () => {
      const arg = { page: 1, size: 20, sort: 'id,desc' };

      const result = await getRoomsAsAdmin(arg)(dispatch, getState, extra);

      const pendingAction = dispatch.mock.calls[0][0];
      expect(pendingAction.meta.requestStatus).toBe('pending');
      expect(getRoomsAsAdmin.fulfilled.match(result)).toBe(true);
    });

    it('dispatches FETCH_USERS_PENDING and FETCH_USERS_FULFILLED actions', async () => {
      const arg = {};

      const result = await getRooms(arg)(dispatch, getState, extra);

      const pendingAction = dispatch.mock.calls[0][0];
      expect(pendingAction.meta.requestStatus).toBe('pending');
      expect(getRooms.fulfilled.match(result)).toBe(true);
    });

    it('dispatches FETCH_USERS_PENDING and FETCH_USERS_FULFILLED actions with pagination options', async () => {
      const arg = { page: 1, size: 20, sort: 'id,desc' };

      const result = await getRooms(arg)(dispatch, getState, extra);

      const pendingAction = dispatch.mock.calls[0][0];
      expect(pendingAction.meta.requestStatus).toBe('pending');
      expect(getRooms.fulfilled.match(result)).toBe(true);
    });

    it('dispatches FETCH_USER_PENDING and FETCH_USER_FULFILLED actions', async () => {
      const result = await getRoom(username)(dispatch, getState, extra);

      const pendingAction = dispatch.mock.calls[0][0];
      expect(pendingAction.meta.requestStatus).toBe('pending');
      expect(getRoom.fulfilled.match(result)).toBe(true);
    });

    it('dispatches CREATE_USER_PENDING and CREATE_USER_FULFILLED actions', async () => {
      const arg = {};

      const result = await createRoom(arg)(dispatch, getState, extra);

      const pendingAction = dispatch.mock.calls[0][0];
      expect(pendingAction.meta.requestStatus).toBe('pending');
      expect(createRoom.fulfilled.match(result)).toBe(true);
    });

    it('dispatches UPDATE_USER_PENDING and UPDATE_USER_FULFILLED actions', async () => {
      const arg = { login: username };

      const result = await updateRoom(arg)(dispatch, getState, extra);

      const pendingAction = dispatch.mock.calls[0][0];
      expect(pendingAction.meta.requestStatus).toBe('pending');
      expect(updateRoom.fulfilled.match(result)).toBe(true);
    });

    it('dispatches DELETE_USER_PENDING and DELETE_USER_FULFILLED actions', async () => {
      const result = await deleteRoom(username)(dispatch, getState, extra);

      const pendingAction = dispatch.mock.calls[0][0];
      expect(pendingAction.meta.requestStatus).toBe('pending');
      expect(deleteRoom.fulfilled.match(result)).toBe(true);
    });

    it('dispatches RESET actions', async () => {
      await store.dispatch(reset());
      expect(store.getState()).toEqual([expect.any(Object), expect.objectContaining(reset())]);
    });
  });
});
