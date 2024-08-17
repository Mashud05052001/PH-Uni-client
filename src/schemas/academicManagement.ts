import { z } from "zod";

export const academicSemesterSchema = z.object({
  name: z.string({ required_error: "Please select a Name" }),
  year: z.string({ required_error: "Please select a Year" }),
  startMonth: z.string({ required_error: "Please select a Starting month" }),
  endMonth: z.string({ required_error: "Please select a Ending month" }),
});

export const academicFacultySchema = z.object({
  name: z.string({ required_error: "Please write a Academic Faculty Name" }),
});

export const academicDepartmentSchema = z.object({
  name: z.string({ required_error: "Please write a Academic Department Name" }),
  academicFaculty: z.string({
    required_error: "Please select an academic faculty",
  }),
});
