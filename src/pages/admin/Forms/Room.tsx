import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ChangeEvent, useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import axios, { AxiosError } from "axios";
import url from "@/constant/url";
import { useCookies } from "react-cookie";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const schema = z.object({
  noOfRooms: z.string(),
  maxPeople: z.string(),
  paymentmode: z.string(),
  noticePeriod: z.string(),
  restrictions: z.string(),
  securityDeposite: z.string(),
  address: z.string(),
  lat: z.string(),
  lon: z.string(),
});
interface CheckBox {
  flat: boolean;
  waterFacility: boolean;
  furnished: boolean;
  balcony: boolean;
  waterTank: boolean;
  wifi: boolean;
}
type formField = z.infer<typeof schema>;

const RoomForm: React.FC = () => {
  const notify = {
    success: (text: string) => toast.success(text),
    error: (text: string) => toast.error(text),
  };
  const [loading, setLoading] = useState<boolean>(false);
  const [cookie] = useCookies(["token"]);
  const [file, setFile] = useState<FileList>();
  const [checkBox, setCheck] = useState<CheckBox>({
    balcony: false,
    flat: false,
    furnished: false,
    waterFacility: false,
    waterTank: false,
    wifi: false,
  });
  const { register, handleSubmit, reset } = useForm<formField>({
    resolver: zodResolver(schema),
  });
  const onSubmit = async (formData: formField) => {
    setLoading(true);
    try {
      const mergedForm = {
        ...formData,
        ...checkBox,
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

      const { status } = await axios.post(`${url}add-room`, form);
      if (status == 200) {
        notify.success("Room added successfully!");
        setCheck({
          balcony: false,
          flat: false,
          furnished: false,
          waterFacility: false,
          waterTank: false,
          wifi: false,
        });
        reset();
      }
      notify.error("Something went wrong!");
    } catch (e) {
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
    setCheck((prev) => ({
      ...prev,
      [name]: !checkBox[name],
    }));
  };
  return (
    <>
      <div className="">
        <h1 className="font-semibold">Room Form : </h1>
        <form className=" flex gap-24" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <ul className="flex flex-col gap-6">
              <div className=" flex flex-col gap-2">
                Number of rooms
                <Input
                  type="text"
                  placeholder="eg. 1"
                  name="noOfRooms"
                  {...register("noOfRooms")}
                />
              </div>
              <li className=" flex  gap-2">
                Flat
                <input type="checkbox" name="flat" onChange={handleCheck} />
              </li>
              <li className=" flex  gap-2">
                Water facilities
                <input
                  type="checkbox"
                  name="waterFacility"
                  onChange={handleCheck}
                />
              </li>
              <li className=" flex flex-col gap-2">
                Maximum people
                <Input
                  placeholder="eg. 4"
                  name="maxPeople"
                  {...register("maxPeople")}
                />
              </li>
              <li className=" flex flex-col gap-2">
                Payment mode
                <Input
                  placeholder="eSewa"
                  name="paymentmode"
                  {...register("paymentmode")}
                />
              </li>
              <li className=" flex  gap-2">
                Furnished
                <input
                  type="checkbox"
                  name="furnished"
                  onChange={handleCheck}
                />
              </li>
              <li className=" flex flex-col gap-2">
                Security Desposit
                <Input
                  placeholder="eg. 20000"
                  name="securityDeposite"
                  {...register("securityDeposite")}
                />
              </li>
              <li className=" flex flex-col gap-2">
                Notice priod
                <Input
                  placeholder="Date"
                  name="noticePeriod"
                  {...register("noticePeriod")}
                />
              </li>
              <li className=" flex  gap-2">
                Balcony
                <input type="checkbox" name="balcony" onChange={handleCheck} />
              </li>
              <li className=" flex  gap-2">
                Water Tank
                <input
                  type="checkbox"
                  name="waterTank"
                  onChange={handleCheck}
                />
              </li>
              <li className=" flex  gap-2">
                Wifi
                <input type="checkbox" name="wifi" onChange={handleCheck} />
              </li>
              <li className=" flex flex-col gap-2">
                Restriction
                <Input
                  placeholder="Restrictions"
                  name="restrictions"
                  {...register("restrictions")}
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
              <li className=" flex flex-col gap-2">
                Latitude
                <Input placeholder="Lat" name="lat" {...register("lat")} />
              </li>
              <li className=" flex flex-col gap-2">
                Longitude
                <Input placeholder="lon" name="lon" {...register("lon")} />
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

export default RoomForm;
