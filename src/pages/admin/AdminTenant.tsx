import AdminNav from "@/components/ui/AdminNav";
import { useUserContext } from "@/Provider/UserContext";
import axios from "axios";
import url from "@/constant/url";
import { useEffect } from "react";

const AdminTenant: React.FC = () => {
  useEffect(() => {
    axios.get(`${url}get-admin`).then((data) => {
      console.log(data);
    });
  }, []);
  return (
    <>
      <div className="h-screen w-screen flex">
        <AdminNav tenant />
      </div>
    </>
  );
};

export default AdminTenant;
