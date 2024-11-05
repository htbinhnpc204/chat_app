import { IUser } from 'app/shared/model/user.model';

export interface IRoom {
  id?: any;
  name?: string;
  description?: string;
  members?: IUser[];
  createdBy?: string;
  createdDate?: Date | null;
  lastModifiedBy?: string;
  lastModifiedDate?: Date | null;
}

export const defaultValue: Readonly<IRoom> = {
  id: '',
  name: '',
  description: '',
  members: [],
  createdBy: '',
  createdDate: null,
  lastModifiedBy: '',
  lastModifiedDate: null,
};
