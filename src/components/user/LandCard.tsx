import { FaMapMarkedAlt } from "react-icons/fa";
import { Button } from "../ui/button";
import { TbListDetails } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import Location from "@/constant/types/location";

interface Props {
  thumbnail: string;
  title: string;
  description: string;
  id: string;
  coords: Location;
}
const LandCard: React.FC<Props> = ({
  description,
  id,
  thumbnail,
  title,
  coords,
}) => {
  const navigate = useNavigate();
  const handleViewOnMap = (coords: Location) => {
    navigate("/map", { state: coords });
  };
  return (
    <div className="card card-compact bg-base-100 w-80 mt-3 mb-3 shadow-md h-auto">
      <figure className="max-h-72">
        <img src={`${thumbnail}`} alt="Land" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{title}</h2>
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
  );
};

export default LandCard;