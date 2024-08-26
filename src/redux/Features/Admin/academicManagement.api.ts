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
  }),
});

export const {
  useCreateAcademicSemesterMutation,
  useGetAllAcademicSemesterQuery,
} = academicSemesterManagementApi;
