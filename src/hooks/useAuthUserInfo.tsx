import { useAppSelector } from "../redux/hooks";
const useAuthUserInfo = () => {
  const { user, token} = useAppSelector(
    (state) => state?.auth 
  ) ;
  return { user, token };
};

export default useAuthUserInfo;
