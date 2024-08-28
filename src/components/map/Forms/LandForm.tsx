import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Alert from "@/components/user/Alert";
import FilteredItems from "@/components/user/FilteredBox";
import apiKey from "@/constant/api";
import Land from "@/constant/types/land";
import Location from "@/constant/types/location";
import Rooms from "@/constant/types/rooms";
import { useLands } from "@/Provider/LandContext";
import { useRoomContext } from "@/Provider/RoomsContext";
import axios from "axios";
import { ChangeEvent, useEffect, useState } from "react";

interface CheckBox {
  parking?: boolean;
  furnished?: boolean;
  balcony?: boolean;
  waterTank?: boolean;
}

interface Props {
  onFilter: (land: Land[]) => void;
}

const LandForm: React.FC<Props> = ({ onFilter }) => {
  const { ToastContainer, notify } = Alert();
  const { lands } = useLands();

  const [locationSelect, setLocation] = useState<string>("Near me");

  const [location, setUserLocation] = useState<Location>({
    lat: 27.7172,
    lon: 85.324,
  });

  const [priceRange, setPriceRange] = useState({
    g: 0,
    l: 0,
  });

  const [selectedOptions, setSelected] = useState<CheckBox>({
    balcony: false,
    parking: false,
    furnished: false,
    waterTank: false,
  });

  useEffect(() => {
    if (navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          });
        },
        (error) => {}
      );
    }
  }, []);
  const handleCheck = (e: ChangeEvent<HTMLInputElement>) => {
    const { name } = e.target;
    setSelected((prev) => ({
      ...prev,
      [name]: !selectedOptions[name],
    }));
  };

  const handlePrice = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setPriceRange((prev) => ({
      ...prev,
      [name]: Number(value),
    }));
  };
  const locationSelectHandle = async (e: ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    if (value == "Near me") {
      const { data } = await axios.get(
        `https://api.geoapify.com/v1/geocode/reverse?lat=${location.lat}&lon=${location.lon}&apiKey=${apiKey}`
      );
      setLocation(data.features[0].properties.city);
    } else {
      setLocation(value);
    }
  };
  const handleSubmit = () => {
    const filteredRooms = lands.filter((land) => {
      const meetsLocationCriteria =
        land.city === locationSelect || locationSelect === "All";

      const meetsPriceCriteria =
        land.price >= priceRange.g && land.price <= priceRange.l;

      const meetsOptionCriteria = Object.keys(selectedOptions).every((key) => {
        if (selectedOptions[key]) {
          return land[key] === selectedOptions[key];
        }
        return true;
      });

      return meetsLocationCriteria && meetsPriceCriteria && meetsOptionCriteria;
    });

    if (filteredRooms.length > 0) {
      return onFilter(filteredRooms);
    } else {
      try {
        return notify.info("No Lands Found!");
      } catch (e) {
        return notify.error("Something went wrong!");
      }
    }
  };

  return (
    <div>
      <p className="font-medium mb-3">Location</p>
      <div className="flex gap-3 mb-3">
        <select
          className="select select-bordered w-full max-w-xs"
          onChange={locationSelectHandle}
        >
          <option selected>Near me</option>
          <option>All</option>
        </select>
      </div>
      <p className="font-medium">Price</p>
      <div className="flex gap-3">
        <div className="flex flex-col gap-3">
          <p className="text-sm">Greater than:</p>
          <Input placeholder="eg. 10000" name="g" onChange={handlePrice} />
        </div>
        <div className="flex flex-col gap-3">
          <p className="text-sm">Less than:</p>
          <Input placeholder="eg. 20000" name="l" onChange={handlePrice} />
        </div>
      </div>
      <div className="flex flex-col mt-3 gap-1">
        <p className="font-medium">Facilities</p>
        <li className=" flex  justify-between">
          Parking
          <input type="checkbox" name="parking" onChange={handleCheck} />
        </li>
        <li className=" flex  justify-between">
          Furnished
          <input type="checkbox" name="furnished" onChange={handleCheck} />
        </li>

        <li className=" flex  justify-between">
          Balcony
          <input type="checkbox" name="balcony" onChange={handleCheck} />
        </li>
        <li className=" flex  justify-between">
          Water Tank
          <input type="checkbox" name="waterTank" onChange={handleCheck} />
        </li>
      </div>
      <Button className="mt-6 w-full" onClick={handleSubmit}>
        Search
      </Button>
      <ToastContainer />
    </div>
  );
};

export default LandForm;
