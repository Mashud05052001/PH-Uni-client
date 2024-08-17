import { TSelect } from "../../types";
import { generateUpperCaseWords } from "../../utils/function";
import { academicSemesters, academicSemesterYears } from "../admin.constant";
import { allMonths } from "../globals";

export let academicSemestersOptions: TSelect = [];

if (Object.keys(academicSemesters).length > 0) {
  academicSemestersOptions = Object.keys(academicSemesters).map((item) => ({
    label: typeof item === "string" ? generateUpperCaseWords(item) : item,
    value: item,
  }));
}

export const allMonthsOptions: TSelect = allMonths.map((month) => ({
  label: generateUpperCaseWords(month),
  value: month,
}));

export const allYearsOptions = academicSemesterYears.map((year) => ({
  label: year,
  value: year,
}));
