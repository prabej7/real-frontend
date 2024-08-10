import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ChangeEvent, FormEvent, useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import axios, { AxiosError } from "axios";
import url from "@/constant/url";
import { useCookies } from "react-cookie";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MapDrawer from "@/components/ui/Map";
import Location from "@/constant/types/location";
const schema = z.object({
  address: z.string(),
  lat: z.number(),
  lon: z.number(),
});
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
type formField = z.infer<typeof schema>;

const HostelForm: React.FC = () => {
  const notify = {
    success: (text: string) => toast.success(text),
    error: (text: string) => toast.error(text),
  };
  const { register, handleSubmit, reset, setValue } = useForm<formField>({
    resolver: zodResolver(schema),
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [cookie] = useCookies(["token"]);
  const [file, setFile] = useState<FileList>();
  const [checkBox, setCheck] = useState<CheckBox>({
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

  const onSubmit = async (formData: formField) => {
    setLoading(true);
    try {
      const mergedForm = {
        ...checkBox,
        ...formData,
        token: cookie.token,
      };
      const form = new FormData();
      form.append("form", JSON.stringify(mergedForm));
      try {
        form.append("file", file[0]);
        form.append("file", file[1]);
        form.append("file", file[2]);
        form.append("file", file[3]);
        form.append("file", file[4]);
      } catch (e) {
        return notify.error("Please provide atleast 5 photos.");
      }
      const { status } = await axios.post(`${url}add-hostel`, form);
      if (status == 200) {
        reset();
        setCheck({
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
        return notify.success("Hostel added successfully!");
      }
      notify.error("Something went wrong!");
    } catch (e) {
      console.log(e);
      const error = e as AxiosError;
      notify.error(error.response.statusText);
    } finally {
      setLoading(false);
    }
  };

  const handleCheck = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files);
    }
    const { name } = e.target;
    if (name == "prePayment" && checkBox.postPayment) {
      setCheck((prev) => ({
        ...prev,
        postPayment: false,
      }));
    } else if (name == "postPayment" && checkBox.prePayment) {
      setCheck((prev) => ({
        ...prev,
        prePayment: false,
      }));
    }
    setCheck((prev) => ({
      ...prev,
      [name]: !checkBox[name],
    }));
  };

  const getSelectedLocation = (location: Location) => {
    const { lat, lon } = location;
    setValue("lat", lat);
    setValue("lon", lon);
  };

  return (
    <>
      <div className="">
        <h1 className="font-semibold">Hostel Form : </h1>
        <form className=" flex gap-24" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <ul className="flex flex-col gap-6">
              <li className=" flex  gap-2">
                Food
                <input type="checkbox" name="food" onChange={handleCheck} />
              </li>
              <li className=" flex  gap-2">
                Washroom
                <input type="checkbox" name="washroom" onChange={handleCheck} />
              </li>

              <li className=" flex  gap-2">
                CCTv
                <input type="checkbox" name="ccTv" onChange={handleCheck} />
              </li>

              <li className=" flex  gap-2">
                Parking
                <input type="checkbox" name="parking" onChange={handleCheck} />
              </li>
              <li className=" flex  gap-2">
                Wi-fi
                <input type="checkbox" name="wifi" onChange={handleCheck} />
              </li>
              <li className=" flex  gap-2">
                Laundry
                <input type="checkbox" name="laundry" onChange={handleCheck} />
              </li>
              <li className=" flex  gap-2">
                Geyser
                <input type="checkbox" name="geyser" onChange={handleCheck} />
              </li>
              <li className=" flex  gap-2">
                Fan
                <input type="checkbox" name="fan" onChange={handleCheck} />
              </li>
              <li className=" flex  gap-2">
                Study table
                <input
                  type="checkbox"
                  name="studyTable"
                  onChange={handleCheck}
                />
              </li>
              <li className=" flex  gap-2">
                Locker
                <input type="checkbox" name="locker" onChange={handleCheck} />
              </li>
              <li className=" flex  gap-2">
                Cupboard
                <input type="checkbox" name="cupboard" onChange={handleCheck} />
              </li>
              <li className=" flex  gap-2">
                Doctor on call
                <input type="checkbox" name="doctor" onChange={handleCheck} />
              </li>
              <li className=" flex  gap-2">
                Matress
                <input type="checkbox" name="matress" onChange={handleCheck} />
              </li>
              <li className=" flex  gap-6">
                Payment
                <p>Pre</p>
                <input
                  type="checkbox"
                  name="prePayment"
                  onChange={handleCheck}
                  checked={checkBox.prePayment}
                />
                <p>Post</p>
                <input
                  type="checkbox"
                  name="postPayment"
                  onChange={handleCheck}
                  checked={checkBox.postPayment}
                />
              </li>
              <li className="flex flex-col gap-2">
                <Label htmlFor="file" className="text-left">
                  Photos
                </Label>
                <input
                  id="file"
                  type="file"
                  className="file-input w-full max-w-xs col-span-3"
                  multiple
                  onChange={handleCheck}
                />
              </li>
              <li className=" flex flex-col gap-2">
                Address
                <Input
                  placeholder="Address"
                  name="address"
                  {...register("address")}
                />
              </li>
              <div>
                <MapDrawer onMapClick={getSelectedLocation} />
              </div>
              <li className=" flex flex-col gap-2">
                Latitude
                <Input placeholder="Lat" name="lat" {...register("lat")} />
              </li>
              <li className=" flex flex-col gap-2">
                Longitude
                <Input placeholder="lon" name="lon" {...register("lon")} />
              </li>
              <Button type="submit" disabled={loading}>
                {loading ? (
                  <span className="loading loading-spinner loading-xs"></span>
                ) : (
                  "Add"
                )}
              </Button>
              <ToastContainer />
            </ul>
          </div>
        </form>
      </div>
    </>
  );
};

export default HostelForm;
