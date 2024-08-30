import { TAcademicSemester } from "./academicSemesterManage.type";

export interface TRegisteredSemester {
  _id: string;
  academicSemester: TAcademicSemester;
  status: string;
  startDate: string;
  endDate: string;
  minCredit: number;
  maxCredit: number;
  createdAt: string;
  updatedAt: string;
}

export interface TCourses {
  _id: string;
  title: string;
  prefix: string;
  code: number;
  credits: number;
  preRequisiteCourses: TPreRequisiteCourse[] | [];
  isDelete: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface TPreRequisiteCourse {
  course: TCourses;
  isDelete: boolean;
}
