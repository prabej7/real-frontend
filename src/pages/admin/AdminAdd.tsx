import AdminNav from "@/components/ui/AdminNav";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import url from "@/constant/url";
import { Label } from "@radix-ui/react-label";
import axios from "axios";
import { ChangeEvent, FormEvent, useState } from "react";
import RoomForm from "./Forms/Room";
import HostelForm from "./Forms/Hostel";
import useAdminAuth from "@/hooks/useAdminAuth";
import LandForm from "./Forms/LandForm";
interface CheckBox {
  flat: boolean;
  waterFacility: boolean;
  furnished: boolean;
  balcony: boolean;
  waterTank: boolean;
  wifi: boolean;
}

// interface FormFields {
//   noOfRooms: string;
//   maxPeople: string;
//   paymentmode: string;
//   noticePeriod: string;
//   restrictions: string;
//   securityDeposite: string;
// }

const AdminAdd: React.FC = () => {
  useAdminAuth();
  const [selected, setSelected] = useState<string>("room");

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    setSelected(value);
  };

  return (
    <>
      <div className="h-screen w-screen flex">
        <AdminNav add />
        <div className="mt-12 ml-12 overflow-x-clip overflow-y-auto w-screen pb-24">
          <h1 className="font-bold text-xl">Add Property</h1>
          <select
            className="select select-bordered w-full max-w-xs mt-6 mb-6"
            onChange={handleChange}
          >
            <option selected={selected === "room"} value="room">
              Room
            </option>
            <option selected={selected === "hostel"} value="hostel">
              Hostel
            </option>
            <option selected={selected === "land"} value="land">
              Land
            </option>
          </select>
          <div className="">{selected === "room" && <RoomForm />}</div>
          <div>{selected === "hostel" && <HostelForm />}</div>
          <div>{selected === "land" && <LandForm />}</div>
        </div>
      </div>
    </>
  );
};

export default AdminAdd;
