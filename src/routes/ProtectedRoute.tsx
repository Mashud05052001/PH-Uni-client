import { ReactNode } from "react";
import { selectCurrentToken } from "../redux/features/auth/authSlice";
import { useAppSelector } from "../redux/hooks";
import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  //   const { user, token } = useAppSelector((state:Root) => state.auth);
  const token = useAppSelector(selectCurrentToken);
  const location = useLocation();
  if (!token) {
    return <Navigate to={"/login"} replace={true} state={{ from: location }} />;
  }

  return children;
};

export default ProtectedRoute;
