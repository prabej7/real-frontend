import { useUserContext } from "@/Provider/UserContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface Props {
  route?: string;
}

const Loading: React.FC<Props> = ({ route }) => {
  const user = useUserContext();
  const navigate = useNavigate();
  useEffect(() => {
    navigate(`/${route}`);
  });
  return (
    <>
      <div className="h-screen w-screen flex items-center justify-center">
        <span className="loading loading-infinity loading-lg"></span>
        Loading...
      </div>
    </>
  );
};

export default Loading;
