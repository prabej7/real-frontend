import { useNavigate } from "react-router-dom";

interface Props {
  img?: string;
  id?: string;
  title?: string;
  description?: string;
}
const HostelCard: React.FC<Props> = ({ description, id, img, title }) => {
  const navigate = useNavigate();
  return (
    <div className="card card-compact bg-base-100 w-72 shadow-xl">
      <figure>
        <img src={`${img}`} alt="Shoes" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{title}</h2>
        <p>{description}</p>
        <div className="card-actions justify-end">
          <button
            className="btn btn-primary"
            onClick={() => navigate(`/hostels/${id}`)}
          >
            Take a tour
          </button>
        </div>
      </div>
    </div>
  );
};

export default HostelCard;
