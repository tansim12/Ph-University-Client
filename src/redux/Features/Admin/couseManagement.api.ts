import { TQueryParamAcademicSemester, TReduxResponse } from "../../../Types";
import { TRegisteredSemester } from "../../../Types/couseManagement.type";

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

export const {
  useCreateSemesterRegistrationMutation,
  useGetAllRegisteredSemesterQuery,
} = courseManagementApi;
