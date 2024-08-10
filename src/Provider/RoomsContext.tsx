import Rooms from "@/constant/types/rooms";
import url from "@/constant/url";
import axios from "axios";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

interface Props {
  children: ReactNode;
}

interface ContextType {
  rooms: Rooms[];
  loading: boolean;
  error: boolean;
}

export const RoomContext = createContext<ContextType | undefined>(undefined);

const RoomProvider: React.FC<Props> = ({ children }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [rooms, setData] = useState<Rooms[]>();
  useEffect(() => {
    (async () => {
      setError(false);
      setLoading(true);
      try {
        const response = await axios.get(`${url}rooms`);
        setData(response.data);
      } catch (e) {
        setError(true);
      } finally {
        setLoading(false);
      }
    })();
  }, []);
  return (
    <RoomContext.Provider value={{ error, loading, rooms }}>
      {children}
    </RoomContext.Provider>
  );
};

export default RoomProvider;

export const useRoomContext = () => {
  const context = useContext(RoomContext);
  if (context) {
    return context;
  }
  return undefined;
};
