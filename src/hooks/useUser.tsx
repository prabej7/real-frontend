import User from "@/constant/types/user";
import { UserContextType, useUserContext } from "@/Provider/Context";
import { useAppDispatch } from "@/Store/hook";
import { setUser } from "@/Store/slices/user";

const useUser = (): User => {
  const dispatch = useAppDispatch();
  const userContext: UserContextType | null = useUserContext();

  const { userData } = userContext;
  if (userData) {
    dispatch(setUser(userData));
  }
  return userData;
};

export default useUser;
