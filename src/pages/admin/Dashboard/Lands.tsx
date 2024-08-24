import { Button } from "@/components/ui/button";
import Loading from "@/components/ui/Loading";
import url from "@/constant/url";
import { useLands } from "@/Provider/LandContext";
import axios from "axios";
import { useState } from "react";
import { useCookies } from "react-cookie";
import { FaTrashAlt } from "react-icons/fa";

const Lands: React.FC = () => {
  const { isLoading, lands, refetch } = useLands();
  const [deletingIds, setDeletingIds] = useState<string[]>([]);
  const [cookie] = useCookies(["token"]);

  const handleDelete = async (id: string) => {
    setDeletingIds((prev) => [...prev, id]);
    try {
      await axios.post(`${url}delete-land`, { id: id, token: cookie.token });
    } catch (e) {
      console.log(e);
    } finally {
      setDeletingIds((prev) => prev.filter((deletingId) => deletingId !== id));
      refetch();
    }
  };

  if (isLoading) return <Loading />;

  if (!lands || lands.length === 0) {
    return <div>No lands available.</div>;
  }

  return (
    <div>
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th></th>
              <th>Address</th>
              <th>Id</th>
              <th>Actions</th>
              <th>Details</th>
            </tr>
          </thead>
          <tbody>
            {lands.map((land, index) => (
              <tr key={land._id}>
                <th>{index + 1}</th>
                <td>{land.address}</td>
                <td>{land._id}</td>
                <td>
                  <Button
                    className="bg-red-500"
                    disabled={deletingIds.includes(land._id)}
                    onClick={() => handleDelete(land._id)}
                  >
                    <FaTrashAlt aria-label="Delete land" />
                  </Button>
                </td>
                <td className="font-medium">See details</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Lands;
