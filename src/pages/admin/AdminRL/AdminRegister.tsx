import { Button } from "@/components/ui/button";
import url from "@/constant/url";
import axios from "axios";

const AdminRegister: React.FC = () => {
  const onSubmit = async () => {
    const response = await axios.post(`http://localhost:5000/admin-register`, {
      msg: "",
    });
  };
  return (
    <>
      <Button onClick={onSubmit}>Register</Button>
    </>
  );
};

export default AdminRegister;
