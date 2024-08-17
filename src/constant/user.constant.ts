import { TUserRoles } from "../types";

export const userRoles = {
  ADMIN: "admin" as TUserRoles,
  FACULTY: "faculty" as TUserRoles,
  STUDENT: "student" as TUserRoles,
} as const;
