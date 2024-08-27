import { z } from "zod";

export const academicSemesterSchema = z.object({
  name: z.string({ required_error: "Name is required" }),
  code: z.string({ required_error: "Code is required" }).optional(),
  year: z.string({ required_error: "Year is required" }),
  startMonth: z.string({ required_error: "Start month is required" }),
  endMonth: z.string({ required_error: "End month is required" }),
});
export const academicFacultySchema = z.object({
  name: z.string({ required_error: "Name is required" }),
});
export const academicDepartmentSchema = z.object({
  name: z.string({ required_error: "Name is required" }),
  academicFaculty: z.string({ required_error: "AcademicFaculty is required" }),
});
