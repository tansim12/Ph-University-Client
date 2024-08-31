import { ReactNode } from "react";
import useAuthUserInfo from "../../hooks/useAuthUserInfo";
import { Navigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/Features/Auth/authSlice";

type TPrivateRoute = {
  children: ReactNode;
  role: string | undefined;
};

const PrivateRoute = ({ children, role }: TPrivateRoute) => {
  const { token, user } = useAuthUserInfo();
  const dispatch = useDispatch();
  if (role !== user?.role && role !== undefined) {
    dispatch(logout());
    return <Navigate to={"/login"} replace={true} />;
  }

  if (!token && !user?.role) {
    return <Navigate to={"/login"} replace={true} />;
  }
  return children;
};

export default PrivateRoute;
