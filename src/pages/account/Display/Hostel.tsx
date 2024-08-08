import HostelCard from "@/components/ui/HostelCard";
import H from "@/constant/types/Hostels";
import url from "@/constant/url";
import axios from "axios";
import { useState, useEffect } from "react";
const Hostel: React.FC = () => {
  const [hostels, setHostels] = useState<H[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const fetchHostels = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${url}get-hostels`);
      setHostels(response.data);
    } catch (e) {
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchHostels();
  }, []);
  if (loading) return <div>Loading...</div>;
  return (
    <>
      <div className="xl:max-h-80 overflow-y-auto xl:w-[120%] 2xl:w-[170%] 2xl:max-h-[650px]">
        <div className="xl:grid grid-cols-3  2xl:grid-cols-4">
          {hostels.map((hostel) => {
            return (
              <HostelCard
                title={hostel.address}
                img={hostel.img[0]}
                description={hostel.address}
                id={hostel._id}
              />
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Hostel;
