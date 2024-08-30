import { TQueryParamAcademicSemester, TReduxResponse } from "../../../Types";
import { baseApi } from "../../api/baseApi";

const courseManagementApi = baseApi.injectEndpoints({
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

    createSemesterRegistration: builder.mutation({
      query: (body) => ({
        url: "/semester-registrations/create-semester-registration",
        method: "POST",
        body: body,
      }),
    }),
  }),
});

export const { useCreateSemesterRegistrationMutation } = courseManagementApi;
