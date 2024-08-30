
import { baseApi } from "../../api/baseApi";

const offerCourseManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    //   getAllStudents: builder.query({
    //     query: (args) => {
    //       const params = new URLSearchParams();
    //       if (args) {
    //         args.forEach((item: TQueryParamAcademicSemester) => {
    //           params.append(item.name, item.value as string);
    //         });
    //       }

    //       return {
    //         url: "/students",
    //         method: "GET",
    //         params: params,
    //       };
    //     },
    //     transformResponse: (response: TReduxResponse<TStudent[]>) => {
    //       return response?.data;
    //     },
    //   }),

    createOfferCourse: builder.mutation({
      query: (body) => ({
        url: "/offered-course/create-offered-course",
        method: "POST",
        body: body,
      }),
    }),
  }),
});

export const {useCreateOfferCourseMutation} = offerCourseManagementApi;
