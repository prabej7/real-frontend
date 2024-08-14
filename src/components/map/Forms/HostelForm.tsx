import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChangeEvent, useState } from "react";

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

const HostelForm: React.FC = () => {
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
  const handlePrice = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    console.log(e);
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
    console.log({
      ...selectedOptions,
      ...priceRange,
    });
  };

  return (
    <div className="text-left">
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
      <div className="flex flex-col gap-3 mt-6 2xl:max-h-full max-h-64 xl:max-h-64 overflow-x-auto">
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
