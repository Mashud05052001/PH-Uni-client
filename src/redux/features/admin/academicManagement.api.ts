import { TReduxReponse } from "../../../types";
import {
  TAcademicDepartment,
  TAcademicSemester,
  TAcademiFaculty,
} from "../../../types/academicManagement.type";
import { baseApi } from "../../api/baseApi";

const academicManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllSemesters: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        for (const item in args) {
          params.append(item, args[item]);
        }
        return {
          url: "/academic-semesters",
          method: "GET",
          params,
        };
      },
      providesTags: ["academic-semester"],
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      transformResponse: (res: TReduxReponse<TAcademicSemester[]>) => {
        return {
          data: res.data.data,
          meta: res.data.meta,
        };
      },
    }),
    createAcademicSemester: builder.mutation({
      query: (payload) => {
        return {
          url: "/academic-semesters/create-academic-semester",
          method: "POST",
          body: payload,
        };
      },
      invalidatesTags: ["academic-semester"],
    }),
    getAllAcademicFaculty: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        for (const item in args) {
          params.append(item, args[item]);
        }
        return {
          url: "/academic-faculties",
          method: "GET",
          params,
        };
      },
      providesTags: ["academic-faculty"],
      transformResponse: (res: TReduxReponse<TAcademiFaculty[]>) => {
        return {
          data: res.data.data,
          meta: res.data.meta,
        };
      },
    }),
    createAcademicFaculty: builder.mutation({
      query: (payload) => {
        return {
          url: "/academic-faculties/create-academic-faculty",
          method: "POST",
          body: payload,
        };
      },
      invalidatesTags: ["academic-faculty", "academic-department"],
    }),
    getAllAcademicDepartment: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        for (const item in args) {
          params.append(item, args[item]);
        }
        return {
          url: "/academic-departments",
          method: "GET",
          params,
        };
      },
      providesTags: ["academic-department"],
      transformResponse: (res: TReduxReponse<TAcademicDepartment[]>) => {
        return {
          data: res.data.data,
          meta: res.data.meta,
        };
      },
    }),
    createAcademicDepartment: builder.mutation({
      query: (payload) => {
        return {
          url: "/academic-departments/create-academic-department",
          method: "POST",
          body: payload,
        };
      },
      invalidatesTags: ["academic-department"],
    }),
  }),
});

export const {
  useGetAllSemestersQuery,
  useGetAllAcademicFacultyQuery,
  useGetAllAcademicDepartmentQuery,
  useCreateAcademicFacultyMutation,
  useCreateAcademicSemesterMutation,
  useCreateAcademicDepartmentMutation,
} = academicManagementApi;
