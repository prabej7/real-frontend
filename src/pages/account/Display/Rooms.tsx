import RoomCard from "@/components/ui/RoomsCard";
import { useEffect } from "react";

const Rooms: React.FC = () => {
  useEffect(() => {});
  return (
    <>
      <div className="max-h-80 overflow-y-auto w-[1000px] grid grid-cols-2">
        <RoomCard title="Title" description="1 Room" id="1" thumbnail="1" />
        <RoomCard title="Title" description="1 Room" id="1" thumbnail="1" />
        <RoomCard title="Title" description="1 Room" id="1" thumbnail="1" />
        <RoomCard title="Title" description="1 Room" id="1" thumbnail="1" />
        <RoomCard
          title="Title"
          description="1 Room"
          id="1"
          thumbnail="1"
        />{" "}
        <RoomCard title="Title" description="1 Room" id="1" thumbnail="1" />
      </div>
    </>
  );
};

export default Rooms;
