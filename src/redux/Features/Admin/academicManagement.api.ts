import { TAcademicSemester } from "../../../Types/academicSemesterManage.type";
import { TQueryParamAcademicSemester } from "../../../Types/global.type";
import { TReduxResponse } from "../../../Types/response.type";
import { baseApi } from "../../api/baseApi";

const academicSemesterManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllAcademicSemester: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        if (args) {
          args.forEach((item: TQueryParamAcademicSemester) => {
            params.append(item.name, item.value as string);
          });
        }

        return {
          url: "/academic-semester",
          method: "GET",
          params: params,
        };
      },
      transformResponse: (response: TReduxResponse<TAcademicSemester[]>) => {
        return response?.data;
      },
    }),
    createAcademicSemester: builder.mutation({
      query: (body) => ({
        url: "/academic-semester/create-academic-semester",
        method: "POST",
        body: body,
      }),
    }),
    createAcademicFaculty: builder.mutation({
      query: (body) => ({
        url: "/faculty/create-faculty",
        method: "POST",
        body: body,
      }),
    }),
    getAllAcademicFaculty: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        if (args) {
          args.forEach((item: TQueryParamAcademicSemester) => {
            params.append(item.name, item.value as string);
          });
        }

        return {
          url: "/faculty",
          method: "GET",
          params: params,
        };
      },
      transformResponse: (response: TReduxResponse<TAcademicSemester[]>) => {
        return response?.data;
      },
    }),
    createAcademicDepartment: builder.mutation({
      query: (body) => ({
        url: "/academic-department/academic-department-create",
        method: "POST",
        body: body,
      }),
    }),
    getAllAcademicDepartment: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        if (args) {
          args.forEach((item: TQueryParamAcademicSemester) => {
            params.append(item.name, item.value as string);
          });
        }

        return {
          url: "/academic-department",
          method: "GET",
          params: params,
        };
      },
      transformResponse: (response: TReduxResponse<TAcademicSemester[]>) => {
        return response?.data;
      },
    }),
  }),
});

export const {
  useCreateAcademicSemesterMutation,
  useGetAllAcademicSemesterQuery,
  useCreateAcademicFacultyMutation,
  useGetAllAcademicFacultyQuery,
  useCreateAcademicDepartmentMutation,
  useGetAllAcademicDepartmentQuery,
} = academicSemesterManagementApi;
