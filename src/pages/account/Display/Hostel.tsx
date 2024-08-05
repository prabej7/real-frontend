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
      <div className="max-h-80 overflow-y-auto w-[1000px] grid grid-cols-2 gap-6">
        {hostels.map((hostel) => {
          return <HostelCard />;
        })}
      </div>
    </>
  );
};

export default Hostel;
