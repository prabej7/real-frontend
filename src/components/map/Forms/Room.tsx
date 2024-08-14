import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import FilteredItems from "@/components/user/FilteredBox";
import Location from "@/constant/types/location";
import Rooms from "@/constant/types/rooms";
import { useRoomContext } from "@/Provider/RoomsContext";
import { ChangeEvent, useState } from "react";

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
  const { error, loading, rooms } = useRoomContext();
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

  const handleSubmit = () => {
    const filteredRoom = rooms.filter((room) => {
      const meetsPriceCriteria =
        room.price >= priceRange.g && room.price <= priceRange.l;
      const meetsOptionCriteria = Object.keys(selectedOptions).every((key) => {
        if (selectedOptions[key as keyof CheckBox]) {
          return room[key as keyof CheckBox];
        }
        return true;
      });

      return meetsPriceCriteria && meetsOptionCriteria;
    });

    if (filteredRoom.length >= 0) {
      onFilter(filteredRoom);
    }
  };

  return (
    <div>
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
      <div className="flex flex-col gap-3 mt-6">
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
    </div>
  );
};

export default RoomForm;
