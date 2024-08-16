import RoomCard from "@/components/ui/RoomsCard";
import { useEffect } from "react";
import R from "@/constant/types/rooms";
import { useState } from "react";
import axios from "axios";
import url from "@/constant/url";

interface Props {
  filteredRooms?: R[];
}

const Rooms: React.FC<Props> = ({ filteredRooms }) => {
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
      <div className="lg:max-h-[365px] xs:bg-black overflow-y-auto xl:w-[120%] 2xl:w-[170%] 2xl:max-h-[650px]">
        <div className="xl:grid grid-cols-3  2xl:grid-cols-4">
          {rooms.map((room) => {
            return (
              <RoomCard
                title={room.noOfRooms}
                description={`Location : ${room.address}, ${room.city}`}
                id={room._id}
                thumbnail={room.img[0]}
                coords={room.coord}
              />
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Rooms;
