import { Link, useNavigate } from "react-router-dom";

interface Props {
  title: string;
  description: string;
  thumbnail: string;
  id: string;
}
const RoomCard: React.FC<Props> = ({ title, description, thumbnail, id }) => {
  const navigate = useNavigate();
  return (
    <>
      <div className="card card-compact bg-base-100 w-80 mt-3 mb-3 shadow-md h-auto">
        <figure className="max-h-72">
          <img src={`${thumbnail}`} alt="Shoes" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{title}</h2>
          <p>{description}</p>
          <div className="card-actions justify-end">
            <Link className="btn btn-primary" to={`/rooms/${id}`}>
              Take a tour!
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default RoomCard;
