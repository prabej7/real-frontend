import AdminNav from "@/components/ui/AdminNav";
import { ChangeEvent, useState } from "react";
import Rooms from "./Dashboard/Rooms";
import Hostels from "./Dashboard/Hostels";
import useAdminAuth from "@/hooks/useAdminAuth";

const Admin: React.FC = () => {
  useAdminAuth();
  const [selected, setSelected] = useState<string>("Rooms");
  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelected(e.target.value);
  };
  return (
    <>
      <div className="h-screen w-screen flex">
        <AdminNav dashboard />
        <div className="mt-12 ml-12">
          <h1 className="font-bold text-xl">Dashboard</h1>
          <div className="mt-6">
            <select
              className="select select-bordered w-full max-w-xs "
              onChange={handleChange}
            >
              <option selected>Rooms</option>
              <option>Hostels</option>
              <option>Lands</option>
            </select>
            <div className="mt-6">
              {selected === "Rooms" && <Rooms />}
              {selected === "Hostels" && <Hostels />}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Admin;
