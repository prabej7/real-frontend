import { Button } from "@/components/ui/button";
import Hostel from "@/constant/types/Hostels";
import url from "@/constant/url";
import axios from "axios";
import { useEffect, useState } from "react";
import { FaTrashAlt } from "react-icons/fa";

const Hostels: React.FC = () => {
  const [hostels, setHostels] = useState<Hostel[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [deleting, setDeleting] = useState<boolean>(false);
  const fetchHostels = async () => {
    try {
      const response = await axios.get(`${url}get-hostels`);
      setHostels(response.data);
    } catch (e) {}
  };
  useEffect(() => {
    fetchHostels();
  }, [hostels]);
  const handleDelete = async (id: string) => {
    setDeleting(true);
    try {
      await axios.post(`${url}delete-hostel`, { id: id });
    } catch (e) {
      console.log(e);
    } finally {
      setDeleting(false);
    }
  };
  return (
    <div>
      <div className="overflow-x-auto">
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th></th>
                <th>Address</th>
                <th>Id</th>

                <th>Actions</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {hostels.map((hostel, index) => {
                return (
                  <tr>
                    <th>{index + 1}</th>
                    <td>{hostel.address}</td>
                    <td>{hostel._id}</td>

                    <td>
                      <Button
                        className="bg-red-500"
                        onClick={() => handleDelete(hostel._id)}
                      >
                        <FaTrashAlt />
                      </Button>
                    </td>
                    <td className=" font-medium">See details</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Hostels;
