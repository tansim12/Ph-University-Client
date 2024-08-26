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
      transformResponse: (response) => {
        const data =
          response && typeof response === "object" && "data" in response
            ? response.data
            : null;

        // Return the transformed data or a custom value
        return data || [];
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
