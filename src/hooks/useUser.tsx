import User from "@/constant/types/user";
import { UserContextType, useUserContext } from "@/Provider/Context";

const useUser = (): User => {
  const userContext: UserContextType | null = useUserContext();

  const { userData } = userContext;
  return userData;
};

export default useUser;
