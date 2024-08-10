import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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

const RoomForm: React.FC = () => {
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
    console.log({
      ...priceRange,
      ...selectedOptions,
    });
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
