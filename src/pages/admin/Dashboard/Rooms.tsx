import { Button } from "@/components/ui/button";
import R from "@/constant/types/rooms";
import url from "@/constant/url";
import axios from "axios";
import { useEffect, useState } from "react";
import { FaTrashAlt } from "react-icons/fa";
const Rooms: React.FC = () => {
  const [rooms, setRooms] = useState<R[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [deleting, setDeleting] = useState<boolean>(false);
  const fetchRoom = async () => {
    try {
      const response = await axios.get(`${url}rooms`);
      setRooms(response.data);
    } catch (e) {
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchRoom();
  }, [rooms]);
  const handleDelete = async (id: string) => {
    setDeleting(true);
    try {
      await axios.post(`${url}delete-room`, { id: id });
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
                <th>Flat</th>
                <th>Actions</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {rooms.map((room, index) => {
                return (
                  <tr>
                    <th>{index + 1}</th>
                    <td>{room.address}</td>
                    <td>{room._id}</td>
                    <td>{room.flat ? "True" : "False"}</td>
                    <td>
                      <Button
                        className="bg-red-500"
                        disabled={deleting}
                        onClick={() => handleDelete(room._id)}
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

export default Rooms;
