export interface IUser {
  id: string;
  password: string;
  needsPasswordChange: boolean;
  role: 'admin' | 'user' | 'faculty';
  status: string;
  isDeleted: boolean;
}

export interface INewUser {
  password: string;
  role: string;
  id: string;
}
