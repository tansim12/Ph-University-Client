import {
  TAcademicDepartment,
  TAcademicSemester,
} from "./academicSemesterManage.type";

export interface TStudent {
  _id: string;
  id: string;
  user: string;
  admissionSemester: TAcademicSemester;
  academicDepartment: TAcademicDepartment;
  name: TName;
  age: number;
  email: string;
  gender: string;
  address: TAddress;
  profileImg: string;
  guardian: TGuardian;
  blood: string;
  dateOfBirth: string;
  contactNo: string;
  isActive: string;
  isDelete: boolean;
  __v: number;
}

export interface TName {
  firstName: string;
  middleName: string;
  lastName: string;
  _id: string;
}

export interface TAddress {
  currentAddress: string;
  permanentAddress: string;
  zip: number;
  district: string;
  _id: string;
}

export interface TGuardian {
  fatherName: string;
  motherName: string;
  fatherMobNo: string;
  motherMobNo: string;
  fatherOccupation: string;
  motherOccupation: string;
  _id: string;
}
