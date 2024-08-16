import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Alert from "@/components/user/Alert";
import FilteredItems from "@/components/user/FilteredBox";
import apiKey from "@/constant/api";
import Location from "@/constant/types/location";
import Rooms from "@/constant/types/rooms";
import { useRoomContext } from "@/Provider/RoomsContext";
import axios from "axios";
import { ChangeEvent, useEffect, useState } from "react";

interface CheckBox {
  flat?: boolean;
  waterFacility?: boolean;
  furnished?: boolean;
  balcony?: boolean;
  waterTank?: boolean;
  wifi?: boolean;
  noOfRooms?: string;
  maxPeople?: string;
  paymentmode?: string;
  noticePeriod?: string;
  restrictions?: string;
  securityDeposite?: string;
}

interface Props {
  onFilter: (rooms: Rooms[]) => void;
}

const RoomForm: React.FC<Props> = ({ onFilter }) => {
  const { ToastContainer, notify } = Alert();
  const { error, loading, rooms } = useRoomContext();
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
    flat: false,
    furnished: false,
    waterFacility: false,
    waterTank: false,
    wifi: false,
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
    const filteredRooms = rooms.filter((room) => {
      const meetsLocationCriteria =
        room.city === locationSelect || locationSelect === "All";

      const meetsPriceCriteria =
        room.price >= priceRange.g && room.price <= priceRange.l;

      const meetsOptionCriteria = Object.keys(selectedOptions).every((key) => {
        if (selectedOptions[key]) {
          return room[key] === selectedOptions[key];
        }
        return true;
      });

      return meetsLocationCriteria && meetsPriceCriteria && meetsOptionCriteria;
    });

    if (filteredRooms.length > 0) {
      return onFilter(filteredRooms);
    } else {
      try {
        return notify.info("No Rooms Found!");
      } catch (e) {
        console.log(e);
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
        <li className=" flex justify-between">
          Flat
          <input type="checkbox" name="flat" onChange={handleCheck} />
        </li>
        <li className=" flex  justify-between">
          Water facilities
          <input type="checkbox" name="waterFacility" onChange={handleCheck} />
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
        <li className=" flex  justify-between">
          Wifi
          <input type="checkbox" name="wifi" onChange={handleCheck} />
        </li>
      </div>
      <Button className="mt-6 w-full" onClick={handleSubmit}>
        Search
      </Button>
      <ToastContainer />
    </div>
  );
};

export default RoomForm;
