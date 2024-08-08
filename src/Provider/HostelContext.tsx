import Hostel from "@/constant/types/Hostels";
import axios from "axios";
import url from "@/constant/url";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

interface ProviderProps {
  children: ReactNode;
}

interface ContextType {
  allHostels: Hostel[];
  loading: boolean;
  error: boolean;
}

export const HostelContext = createContext<ContextType | undefined>(undefined);

const HostelProvider: React.FC<ProviderProps> = ({ children }) => {
  const [allHostels, setHostels] = useState<Hostel[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const { data } = await axios.get(`${url}get-hostels`);
        
        setHostels(data);
      } catch (e) {
        setError(true);
      } finally {
        setLoading(false);
      }
    })();
  }, []);
  return (
    <HostelContext.Provider value={{ allHostels, error, loading }}>
      {children}
    </HostelContext.Provider>
  );
};

export default HostelProvider;

export const useHostelContext = () => {
  const context = useContext(HostelContext);
  if (context) return context;
  return undefined;
};
