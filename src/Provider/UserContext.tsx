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

interface ContextType {
  user: User;
  loading: boolean;
  error: boolean;
}

export const UserContext = createContext<ContextType | undefined>(undefined);

interface Props {
  children: ReactNode;
}

const UserContextProvide: React.FC<Props> = ({ children }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [user, setUserData] = useState<User>({
    email: "",
    _id: "",
    verified: false,
  });
  const [cookie] = useCookies(["token"]);
  useEffect(() => {
    if (cookie.token)
      (async () => {
        setLoading(true);
        try {
          const response = await axios.post(`${url}user`, {
            token: cookie.token,
          });
          setUserData(response.data);
        } catch (e) {
          setError(true);
        } finally {
          setLoading(false);
        }
      })();
  }, [cookie.token]);
  return (
    <UserContext.Provider value={{ user, loading, error }}>
      {children}
    </UserContext.Provider>
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
