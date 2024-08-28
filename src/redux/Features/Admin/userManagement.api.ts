import { baseApi } from "../../api/baseApi";


const userManagementApi = baseApi.injectEndpoints({
    endpoints:(builder)=>({
        // getAllAcademicSemester: builder.query({
        //     query: (args) => {
        //       const params = new URLSearchParams();
        //       if (args) {
        //         args.forEach((item: TQueryParamAcademicSemester) => {
        //           params.append(item.name, item.value as string);
        //         });
        //       }
      
        //       return {
        //         url: "/academic-semester",
        //         method: "GET",
        //         params: params,
        //       };
        //     },
        //     transformResponse: (response: TReduxResponse<TAcademicSemester[]>) => {
        //       return response?.data;
        //     },
        //   }),

        createStudent: builder.mutation({
            query: (body) => ({
              url: "/users/create-student",
              method: "POST",
              body: body,
            }),
          }),
    })
})

export const {useCreateStudentMutation} = userManagementApi 