import { useNavigate } from "react-router-dom";
import { Button } from "./button";
import { TbListDetails } from "react-icons/tb";
import { FaMapMarkedAlt } from "react-icons/fa";
import Location from "@/constant/types/location";
interface Props {
  img?: string;
  id?: string;
  title?: string;
  description?: string;
  coord?: Location;
}
const HostelCard: React.FC<Props> = ({
  description,
  id,
  img,
  title,
  coord,
}) => {
  const navigate = useNavigate();

  const handleViewOnMap = (coords: Location) => {
    navigate("/map", { state: coords });
  };

  return (
    <div className="card card-compact bg-base-100 w-72 shadow-xl">
      <figure>
        <img src={`${img}`} alt="Shoes" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{title}</h2>
        <p>{description}</p>
        <div className="flex justify-between mt-3">
          <Button
            className="flex gap-3"
            onClick={() => navigate(`/hostels/${id}`)}
          >
            <TbListDetails className="text-xl " />
            Details
          </Button>
          <Button
            variant="outline"
            className="flex gap-3"
            onClick={() => handleViewOnMap(coord)}
          >
            <FaMapMarkedAlt className="text-xl " />
            See on map
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HostelCard;
