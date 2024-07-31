import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Home: React.FC = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="section flex flex-col justify-center items-center">
        <div>
          <h1 className="font-bold text-4xl">Real Renting</h1>
          <p className="text-center">"Find your dream home."</p>
        </div>
        <div className="flex gap-3 mt-3">
          <Button onClick={() => navigate("/register")}>Register</Button>
          <Button onClick={() => navigate("/login")}>Login</Button>
        </div>
      </div>
    </>
  );
};

export default Home;
