import { Model } from 'mongoose';

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

export interface UserModel extends Model<IUser> {
  //create methods
  doesUserExistsByCustomID(id: string): Promise<IUser>;
  isPasswordMatching(
    plainPassword: string,
    hashedPassword: string,
  ): Promise<Boolean>;
}
