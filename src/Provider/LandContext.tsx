import Land from "@/constant/types/land";
import url from "@/constant/url";
import axios from "axios";
import { createContext, useContext } from "react";
import { useQuery, useQueryClient } from "react-query";

interface ContextType {
  lands: Land[];
  isLoading: boolean;
  isError: boolean;
  refetch: () => void;
}

export const LandContext = createContext<ContextType | undefined>(undefined);

interface ProviderProp {
  children: React.ReactNode;
}

const LandProvider: React.FC<ProviderProp> = ({ children }) => {
  const queryClient = useQueryClient(); 

  const fetchingFn = async () => {
    const { data } = await axios.get(`${url}get-lands`);
    return data;
  };

  const {
    data: lands,
    isLoading,
    isError,
  } = useQuery({
    queryFn: fetchingFn,
    queryKey: ["lands"],
  });

  const refetch = () => {
    queryClient.invalidateQueries(["lands"]);
  };

  return (
    <LandContext.Provider value={{ isError, isLoading, lands, refetch }}>
      {children}
    </LandContext.Provider>
  );
};

export default LandProvider;

export const useLands = () => {
  const context = useContext(LandContext);

  if (context === undefined) {
    return null;
  }
  return context;
};
