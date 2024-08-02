import User from "@/constant/types/user";
import url from "@/constant/url";

import axios from "axios";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { useCookies } from "react-cookie";

export const UserContext = createContext<User | undefined>(undefined);

interface Props {
  children: ReactNode;
}

const UserContextProvide: React.FC<Props> = ({ children }) => {
  const [userData, setUserData] = useState<User>({
    email: "",
    _id: "",
    isVerified: false,
  });
  const [cookie] = useCookies(["token"]);
  useEffect(() => {
    (async () => {
      const response = await axios.post(`${url}user`, { token: cookie.token });
      console.log(response.data);
      setUserData(response.data);
    })();
  }, []);
  return (
    <UserContext.Provider value={userData}>{children}</UserContext.Provider>
  );
};

export default UserContextProvide;

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (context) {
    return context;
  }
  return undefined;
};
