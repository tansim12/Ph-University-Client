import { useAppSelector } from "../redux/hooks";
import { IAuthUserData } from "../Types/authUserDataType";

const useAuthUserInfo = () => {
  const { role, id } = useAppSelector(
    (state) => state?.auth.user
  ) as IAuthUserData;
  return { id, role };
};

export default useAuthUserInfo;
