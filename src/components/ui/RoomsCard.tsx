import { Link, useNavigate } from "react-router-dom";
import { TbListDetails } from "react-icons/tb";
import { FaMapMarkedAlt } from "react-icons/fa";
import { Button } from "./button";
import Location from "@/constant/types/location";
interface Props {
  title: string;
  description: string;
  thumbnail: string;
  id: string;
  coords?: Location;
}
const RoomCard: React.FC<Props> = ({
  title,
  description,
  thumbnail,
  id,
  coords,
}) => {
  const navigate = useNavigate();
  
  const handleViewOnMap = (coords: Location) => {
    navigate("/map", { state: coords });
  };

  return (
    <>
      <div className="card card-compact bg-base-100 w-80 mt-3 mb-3 shadow-md h-auto">
        <figure className="max-h-72">
          <img src={`${thumbnail}`} alt="Shoes" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">Rooms : {title}</h2>
          <p>{description}</p>
          <div className="card-actions justify-between mt-3">
            <Button
              className="flex gap-3"
              onClick={() => navigate(`/rooms/${id}`)}
            >
              <TbListDetails className="text-xl " />
              Details
            </Button>
            <Button
              variant="outline"
              className="flex gap-3"
              onClick={() => handleViewOnMap(coords)}
            >
              <FaMapMarkedAlt className="text-xl " />
              See on map
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default RoomCard;
