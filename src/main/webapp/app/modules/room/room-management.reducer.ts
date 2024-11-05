import axios from 'axios';
import { createAsyncThunk, createSlice, isFulfilled, isPending, isRejected } from '@reduxjs/toolkit';

import { defaultValue, IRoom } from 'app/shared/model/room.model';
import { IQueryParams, serializeAxiosError } from 'app/shared/reducers/reducer.utils';

const initialState = {
  loading: false,
  errorMessage: null,
  rooms: [] as ReadonlyArray<IRoom>,
  room: defaultValue,
  updating: false,
  updateSuccess: false,
  totalItems: 0,
};

const apiUrl = 'api/rooms';
const adminUrl = 'api/rooms';

// Async Actions

export const getRooms = createAsyncThunk('roomManagement/fetch_rooms', async ({ page, size, sort }: IQueryParams) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return axios.get<IRoom[]>(requestUrl);
});

export const getRoomsAsAdmin = createAsyncThunk('roomManagement/fetch_rooms_as_admin', async ({ page, size, sort }: IQueryParams) => {
  const requestUrl = `${adminUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return axios.get<IRoom[]>(requestUrl);
});

export const getRoom = createAsyncThunk(
  'roomManagement/fetch_room',
  async (id: string) => {
    const requestUrl = `${adminUrl}/${id}`;
    return axios.get<IRoom>(requestUrl);
  },
  { serializeError: serializeAxiosError },
);

export const createRoom = createAsyncThunk(
  'roomManagement/create_room',
  async (user: IRoom, thunkAPI) => {
    const result = await axios.post<IRoom>(adminUrl, user);
    thunkAPI.dispatch(getRoomsAsAdmin({}));
    return result;
  },
  { serializeError: serializeAxiosError },
);

export const updateRoom = createAsyncThunk(
  'roomManagement/update_room',
  async (room: IRoom, thunkAPI) => {
    const path = `${adminUrl}/${room.id}`;
    const result = await axios.put<IRoom>(path, room);
    thunkAPI.dispatch(getRoomsAsAdmin({}));
    return result;
  },
  { serializeError: serializeAxiosError },
);

export const deleteRoom = createAsyncThunk(
  'roomManagement/delete_room',
  async (id: string, thunkAPI) => {
    const requestUrl = `${adminUrl}/${id}`;
    const result = await axios.delete<IRoom>(requestUrl);
    thunkAPI.dispatch(getRoomsAsAdmin({}));
    return result;
  },
  { serializeError: serializeAxiosError },
);

export type RoomManagementState = Readonly<typeof initialState>;

export const RoomManagementSlice = createSlice({
  name: 'roomManagement',
  initialState: initialState as RoomManagementState,
  reducers: {
    reset() {
      return initialState;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getRoom.fulfilled, (state, action) => {
        state.loading = false;
        state.room = action.payload.data;
      })
      .addCase(deleteRoom.fulfilled, state => {
        state.updating = false;
        state.updateSuccess = true;
        state.room = defaultValue;
      })
      .addMatcher(isFulfilled(getRooms, getRoomsAsAdmin), (state, action) => {
        state.loading = false;
        state.rooms = action.payload.data;
        state.totalItems = parseInt(action.payload.headers['x-total-count'], 10);
      })
      .addMatcher(isFulfilled(createRoom, updateRoom), (state, action) => {
        state.updating = false;
        state.loading = false;
        state.updateSuccess = true;
        state.room = action.payload.data;
      })
      .addMatcher(isPending(getRooms, getRoomsAsAdmin, getRoom), state => {
        state.errorMessage = null;
        state.updateSuccess = false;
        state.loading = true;
      })
      .addMatcher(isPending(createRoom, updateRoom, deleteRoom), state => {
        state.errorMessage = null;
        state.updateSuccess = false;
        state.updating = true;
      })
      .addMatcher(isRejected(getRooms, getRoomsAsAdmin, getRoom, createRoom, updateRoom, deleteRoom), (state, action) => {
        state.loading = false;
        state.updating = false;
        state.updateSuccess = false;
        state.errorMessage = action.error.message;
      });
  },
});

export const { reset } = RoomManagementSlice.actions;

// Reducer
export default RoomManagementSlice.reducer;
