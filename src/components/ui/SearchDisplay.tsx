import Hostel from "@/constant/types/Hostels";
import Rooms from "@/constant/types/rooms";
import url from "@/constant/url";
import axios, { all } from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface Props {
  query: string;
  entity?: string;
}

const SearchDisplay: React.FC<Props> = ({ query, entity }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [allData, setData] = useState<Rooms[] | Hostel[]>([]);
  useEffect(() => {
    setData([]);
    const getData = setTimeout(() => {
      if (query.length > 0)
        (async () => {
          setLoading(true);
          setData([]);
          try {
            const response = await axios.post(
              `${url}query-${entity.toLocaleLowerCase()}`,
              {
                query: query,
              }
            );
            setData(response.data);
          } catch (e) {
          } finally {
            setLoading(false);
          }
        })();
    }, 2000);

    return () => {
      clearTimeout(getData);
    };
  }, [query]);
  const navigate = useNavigate();
  if (allData.length > 0)
    return (
      <>
        <div className="bg-slate-100 mt-3 ml-3 w-[310px] rounded">
          {query.length > 0 && (
            <ul className={`${allData.length > 0 && "px-3 py-3"}`}>
              {allData.map((data) => {
                return (
                  <li
                    className="cursor-pointer hover:pl-3 transition-all"
                    onClick={() => {
                      navigate(`/rooms/${data._id}`);
                    }}
                  >
                    {data.address}
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </>
    );
};

export default SearchDisplay;
