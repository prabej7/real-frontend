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

export const RoomContext = createContext<Rooms[] | undefined>(undefined);

const RoomProvider: React.FC<Props> = ({ children }) => {
  const [data, setData] = useState<Rooms[]>();
  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get(`${url}rooms`);
        setData(response.data);
      } catch (e) {
        console.error(e);
      }
    })();
  }, []);
  return <RoomContext.Provider value={data}>{children}</RoomContext.Provider>;
};

export default RoomProvider;

export const useRoomContext = () => {
  const context = useContext(RoomContext);
  if (context) {
    return context;
  }
  return undefined;
};
