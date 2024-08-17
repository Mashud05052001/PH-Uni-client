// academic semester
export type TMonth =
  | "january"
  | "february"
  | "march"
  | "april"
  | "may"
  | "june"
  | "july"
  | "august"
  | "september"
  | "october"
  | "november"
  | "december";

export type TAcademicSemesterName = "autumn" | "summer" | "winter";
export type TAcademicSemesterCode = "01" | "02" | "03";

export type TAcademicSemester = {
  _id: string;
  name: TAcademicSemesterName;
  code: TAcademicSemesterCode;
  year: string;
  startMonth: TMonth;
  endMonth: TMonth;
  createdAt: string;
  updatedAt: string;
};

export type TAcademiFaculty = {
  _id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
};

export type TAcademicDepartment = {
  _id: string;
  name: string;
  academicFaculty: TAcademiFaculty;
  createdAt: string;
  updatedAt: string;
};
