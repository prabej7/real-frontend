import RoomCard from "@/components/ui/RoomsCard";
import { useEffect } from "react";
import R from "@/constant/types/rooms";
import { useState } from "react";
import axios from "axios";
import url from "@/constant/url";
const Rooms: React.FC = () => {
  const [rooms, setRooms] = useState<R[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const fetchRoom = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${url}rooms`);
      setRooms(response.data);
      setLoading(false);
    } catch (e) {
    } finally {
    }
  };
  useEffect(() => {
    fetchRoom();
  }, []);
  useEffect(() => {});
  if (loading) return <div>Loading...</div>;
  return (
    <>
      <div className="max-h-80 overflow-y-auto w-[1000px] grid grid-cols-2">
        {rooms.map((room, index) => {
          return (
            <RoomCard
              title={room.address}
              description={`Rooms :${room.noOfRooms}`}
              id={room._id}
              thumbnail={room.img[0]}
            />
          );
        })}
      </div>
    </>
  );
};

export default Rooms;
