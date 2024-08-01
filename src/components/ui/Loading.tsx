import { useUserContext } from "@/Provider/UserContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface Props {
  route: string;
}

const Loading: React.FC<Props> = ({ route }) => {
  const user = useUserContext();
  const navigate = useNavigate();
  useEffect(() => {
    if (user.email.length > 0) {
      navigate(`/${route}`);
    }
  }, [user]);
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
