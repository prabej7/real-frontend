import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import apiKey from "@/constant/api";
import Hostel from "@/constant/types/Hostels";
import Location from "@/constant/types/location";
import { useHostelContext } from "@/Provider/HostelContext";
import axios from "axios";
import { ChangeEvent, useEffect, useState } from "react";

interface CheckBox {
  food: boolean;
  washroom: boolean;
  ccTv: boolean;
  parking: boolean;
  wifi: boolean;
  laundry: boolean;
  geyser: boolean;
  fan: boolean;
  studyTable: boolean;
  locker: boolean;
  cupboard: boolean;
  doctor: boolean;
  matress: boolean;
  prePayment: boolean;
  postPayment: boolean;
}

interface Props {
  onFilter: (rooms: Hostel[]) => void;
}

const HostelForm: React.FC<Props> = ({ onFilter }) => {
  const { allHostels } = useHostelContext();
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
    ccTv: false,
    cupboard: false,
    doctor: false,
    fan: false,
    food: false,
    geyser: false,
    laundry: false,
    locker: false,
    matress: false,
    parking: false,
    postPayment: false,
    prePayment: false,
    studyTable: false,
    washroom: false,
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
  }, [navigator]);
  const locationSelectHandle = async (e: ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    if (value == "Near me") {
      const { data } = await axios.get(
        `https://api.geoapify.com/v1/geocode/reverse?lat=${location.lat}&lon=${location.lon}&apiKey=${apiKey}`
      );
      console.log(data);
      setLocation(data.features[0].properties.city);
    } else {
      setLocation(value);
    }
  };
  const handlePrice = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setPriceRange((prev) => ({
      ...prev,
      [name]: Number(value),
    }));
  };
  const handleCheck = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setSelected((prev) => ({
      ...prev,
      [name]: !selectedOptions[name],
    }));
  };
  const handleSubmit = () => {
    const filteredHostel = allHostels.filter((hostel) => {
      const meetsLocationCriteria =
        hostel.city === locationSelect || locationSelect === "All";
      const meetsPriceCriteria =
        hostel.price >= priceRange.g && hostel.price <= priceRange.l;
      const meetsOptionCriteria = Object.keys(selectedOptions).every((key) => {
        if (selectedOptions[key as keyof CheckBox]) {
          return hostel[key as keyof CheckBox];
        }
        return true;
      });

      return meetsLocationCriteria && meetsPriceCriteria && meetsOptionCriteria;
    });
    console.log(filteredHostel);
    if (filteredHostel.length > 0) {
      onFilter(filteredHostel);
    }
  };

  return (
    <div className="text-left">
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
      <p className="font-medium ">Price</p>
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
      <div className="flex flex-col gap-3 mt-6 2xl:max-h-96 max-h-44 xl:max-h-40 overflow-x-auto">
        <p className="font-medium">Facilities</p>
        <li className="flex justify-between">
          Food
          <input type="checkbox" name="food" onChange={handleCheck} />
        </li>
        <li className=" flex  justify-between">
          Washroom
          <input type="checkbox" name="washroom" onChange={handleCheck} />
        </li>

        <li className=" flex  justify-between">
          CCTv
          <input type="checkbox" name="ccTv" onChange={handleCheck} />
        </li>

        <li className=" flex  justify-between">
          Parking
          <input type="checkbox" name="parking" onChange={handleCheck} />
        </li>
        <li className=" flex  justify-between">
          Wi-fi
          <input type="checkbox" name="wifi" onChange={handleCheck} />
        </li>
        <li className=" flex  justify-between">
          Laundry
          <input type="checkbox" name="laundry" onChange={handleCheck} />
        </li>
        <li className=" flex  justify-between">
          Geyser
          <input type="checkbox" name="geyser" onChange={handleCheck} />
        </li>
        <li className=" flex  justify-between">
          Fan
          <input type="checkbox" name="fan" onChange={handleCheck} />
        </li>
        <li className=" flex  justify-between">
          Study table
          <input type="checkbox" name="studyTable" onChange={handleCheck} />
        </li>
        <li className=" flex  justify-between">
          Locker
          <input type="checkbox" name="locker" onChange={handleCheck} />
        </li>
        <li className=" flex  justify-between">
          Cupboard
          <input type="checkbox" name="cupboard" onChange={handleCheck} />
        </li>
        <li className=" flex  justify-between">
          Doctor on call
          <input type="checkbox" name="doctor" onChange={handleCheck} />
        </li>
        <li className=" flex  justify-between">
          Matress
          <input type="checkbox" name="matress" onChange={handleCheck} />
        </li>
        <li className=" flex flex-col gap-3">
          <p className="font-medium">Payment</p>
          <div className="flex justify-between">
            <p>Pre</p>
            <input type="checkbox" name="prePayment" onChange={handleCheck} />
          </div>
          <div className="flex justify-between">
            <p>Post</p>
            <input type="checkbox" name="postPayment" onChange={handleCheck} />
          </div>
        </li>
      </div>
      <Button className="mt-6 w-full" onClick={handleSubmit}>
        Search
      </Button>
    </div>
  );
};

export default HostelForm;
