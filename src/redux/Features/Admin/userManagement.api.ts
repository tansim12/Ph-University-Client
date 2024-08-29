import {
  TQueryParamAcademicSemester,
  TReduxResponse,
  TStudent,
} from "../../../Types";
import { baseApi } from "../../api/baseApi";

const userManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllStudents: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        if (args) {
          args.forEach((item: TQueryParamAcademicSemester) => {
            params.append(item.name, item.value as string);
          });
        }

        return {
          url: "/students",
          method: "GET",
          params: params,
        };
      },
      transformResponse: (response: TReduxResponse<TStudent[]>) => {       
        return response?.data;
      },
    }),

    createStudent: builder.mutation({
      query: (body) => ({
        url: "/users/create-student",
        method: "POST",
        body: body,
      }),
    }),
  }),
});

export const { useCreateStudentMutation, useGetAllStudentsQuery } =
  userManagementApi;
