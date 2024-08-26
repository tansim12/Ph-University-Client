import { baseApi } from "../../api/baseApi";

const academicSemesterManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllAcademicSemester: builder.query({
      query: () => {
        return {
          url: "/academic-semester",
          method: "GET",
        };
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
