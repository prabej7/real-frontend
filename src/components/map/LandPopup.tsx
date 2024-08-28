import { Marker, Popup } from "react-leaflet";
import { Button } from "../ui/button";

import { PiPath } from "react-icons/pi";
import { Icon } from "leaflet";
import Hostel from "@/constant/types/Hostels";
import Land from "@/constant/types/land";
import { useNavigate } from "react-router-dom";

interface Props {
  land: Land;
  onRouting: (room: Land) => void;
}
const LandPopup: React.FC<Props> = ({ land, onRouting }) => {
  const navigate = useNavigate();

  const LandIcon = new Icon({
    iconUrl: "/farmhouse.png",
    iconSize: [50, 50],
  });

  return (
    <Marker position={[land.coord.lat, land.coord.lon]} icon={LandIcon}>
      <Popup>
        <div className="flex flex-col gap-3">
          <h2 className="font-bold">{land.address}</h2>
          <div>
            <img className="rounded" src={`${land.img[0]}`} />
          </div>
          <div className="flex gap-3">
            <Button
              className=""
              onClick={() => {
                navigate(`/hostels/${land._id}`);
              }}
            >
              Details
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                onRouting(land);
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

export default LandPopup;
