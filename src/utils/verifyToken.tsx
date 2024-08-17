import { jwtDecode } from "jwt-decode";

export const verifyToken = (token: string) => {
  const decodedData = jwtDecode(token);
  return decodedData;
};
