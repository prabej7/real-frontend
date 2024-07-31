import User from "@/constant/types/user";
import useGetUser from "@/hooks/useGetUser";
import { createContext, useContext, useEffect, useState } from "react";

export interface UserContextType {
  userData: User | undefined;
}

interface Props {
  children: React.ReactNode;
}

export const UserContext = createContext<UserContextType | undefined>(
  undefined
);

export const UserProvider: React.FC<Props> = ({ children }) => {
  const [userData, setUserData] = useState<User | undefined>(undefined);
  const { get } = useGetUser();

  useEffect(() => {
    (async () => {
      const user = await get();
      setUserData(user);
    })();
  }, [get]);

  return (
    <UserContext.Provider value={{ userData }}>{children}</UserContext.Provider>
  );
};

export const useUserContext = (): UserContextType | null => {
  const context = useContext(UserContext);
  if (context === undefined) {
    return null;
  }
  return context;
};
