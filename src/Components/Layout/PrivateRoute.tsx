import { ReactNode } from "react";
import useAuthUserInfo from "../../hooks/useAuthUserInfo";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }: { children: ReactNode }) => {
  const { token, user } = useAuthUserInfo();

  if (!token && !user?.role) {
    console.log(5655);

    return <Navigate to={"/login"} replace={true} />;
  }
  return children;
};

export default PrivateRoute;
