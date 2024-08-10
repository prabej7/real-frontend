import { Marker, Popup, Tooltip } from "react-leaflet";
import { Button } from "../ui/button";
import {
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@radix-ui/react-tooltip";
import { PiPath } from "react-icons/pi";
import Rooms from "@/constant/types/rooms";
import { Icon } from "leaflet";
import { useNavigate } from "react-router-dom";

interface Props {
  room: Rooms;
  onRouting: (room: Rooms) => void;
}

const RoomPopUp: React.FC<Props> = ({ room, onRouting }) => {
  const roomIcon = new Icon({
    iconUrl: "/home.png",
    iconSize: [60, 60],
  });
  const navigate = useNavigate();
  return (
    <Marker position={[room.coord.lat, room.coord.lon]} icon={roomIcon}>
      <Popup>
        <div className="flex flex-col gap-3">
          <h2 className="font-bold">{room.address}</h2>
          <div>
            <img className="rounded" src={`${room.img[0]}`} />
          </div>
          <div className="flex gap-3">
            <Button
              className=""
              onClick={() => {
                navigate(`/rooms/${room._id}`);
              }}
            >
              Details
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                onRouting(room);
              }}
            >
              <PiPath />
            </Button>
          </div>
        </div>
      </Popup>
    </Marker>
  );
};

export default RoomPopUp;
