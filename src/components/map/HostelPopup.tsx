import { Marker, Popup } from "react-leaflet";
import { Button } from "../ui/button";

import { PiPath } from "react-icons/pi";
import { Icon } from "leaflet";
import { useNavigate } from "react-router-dom";
import Hostel from "@/constant/types/Hostels";

interface Props {
  room: Hostel;
  onRouting: (room: Hostel) => void;
}

const HostelPopup: React.FC<Props> = ({ room, onRouting }) => {
  const roomIcon = new Icon({
    iconUrl: "/hostel.png",
    iconSize: [50, 50],
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
                navigate(`/hostels/${room._id}`);
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

export default HostelPopup;
