import { Schema, model, connect, Model } from 'mongoose';
// 1. Create an interface representing a document in MongoDB.

export interface IGuardian {
  fatherName: string;
  fathersOccupation: string;
  fatherContactNo: string;
  motherName: string;
  mothersOccupation: string;
  motherContactNo: string;
}
export interface ILocalGuardian {
  name: string;
  occupation: string;
  contactNo: string;
  address: string;
}
export interface IUserName {
  firstName: string;
  middleName?: string;
  lastName: string;
}
export interface IStudent {
  id: string;
  password:string;
  name: IUserName;
  gender: 'Male' | 'Female' | 'Other';
  dateOfBirth?: string;
  email: string;
  contactNo: string;
  emergencyContactNo: string;
  bloodGroup?: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
  presentAddress: string;
  permanentAddress: string;
  guardian: IGuardian;
  localGuardian: ILocalGuardian;
  profileImg?: string;
  isActive: 'active' | 'blocked';
  isDeleted: boolean
}




//for creating static methods
export interface StudentModel extends Model<IStudent>{
  isUserExists(id:string): Promise<IStudent | null> 
}


//for creating instance methods
// export type StudentMethod = {
//   isUserExists(id: string) : Promise<IStudent | null>;
// }

// export type StudentModel = Model<IStudent, Record<string, never>, StudentMethod>;