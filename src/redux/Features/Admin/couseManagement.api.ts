import { TQueryParamAcademicSemester, TReduxResponse } from "../../../Types";
import {
  TCourses,
  TRegisteredSemester,
} from "../../../Types/couseManagement.type";

import { baseApi } from "../../api/baseApi";

const courseManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllRegisteredSemester: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        if (args) {
          args.forEach((item: TQueryParamAcademicSemester) => {
            params.append(item.name, item.value as string);
          });
        }

        return {
          url: "/semester-registrations",
          method: "GET",
          params: params,
        };
      },
      transformResponse: (response: TReduxResponse<TRegisteredSemester[]>) => {
        return response?.data;
      },
      providesTags: ["CourseManage"],
    }),
    createSemesterRegistration: builder.mutation({
      query: (body) => ({
        url: "/semester-registrations/create-semester-registration",
        method: "POST",
        body: body,
      }),
      invalidatesTags: ["CourseManage"],
    }),
    statusUpdateSemesterRegistration: builder.mutation({
      query: (payload) => {
        console.log(payload);

        return {
          url: `/semester-registrations/${payload?._id}`,
          method: "PATCH",
          body: payload?.body,
        };
      },
      invalidatesTags: ["CourseManage"],
    }),

    // course
    getAllCourses: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        if (args) {
          args.forEach((item: TQueryParamAcademicSemester) => {
            params.append(item.name, item.value as string);
          });
        }

        return {
          url: "/courses",
          method: "GET",
          params: params,
        };
      },
      transformResponse: (response: TReduxResponse<TCourses[]>) => {
        return response?.data;
      },
      providesTags: ["AllCourse"],
    }),
    createCourses: builder.mutation({
      query: (body) => ({
        url: "/courses/create-course",
        method: "POST",
        body: body,
      }),
      invalidatesTags: ["AllCourse"],
    }),
  }),
});

export const {
  useCreateSemesterRegistrationMutation,
  useGetAllRegisteredSemesterQuery,
  useStatusUpdateSemesterRegistrationMutation,
  useGetAllCoursesQuery,
  useCreateCoursesMutation,
} = courseManagementApi;
