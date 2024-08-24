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
import MapDrawer from "@/components/ui/Map";
import Location from "@/constant/types/location";
import apiKey from "@/constant/api";
const schema = z.object({
  address: z.string().min(1, {
    message: "Field is required.",
  }),
  lat: z.number().min(1, {
    message: "Field is required.",
  }),
  lon: z.number().min(1, {
    message: "Field is required.",
  }),
  city: z.string().min(1, {
    message: "Field is required.",
  }),
  size: z.string().min(2, { message: "Field is required." }),
  price: z.preprocess((a) => parseInt(z.string().parse(a), 10), z.number()),
  roadSize: z.string().min(2, {
    message: "Field is required.",
  }),
  distanceFromMain: z.string(),
});
interface CheckBox {
  furnished: boolean;
  balcony: boolean;
  waterTank: boolean;
  parking: boolean;
}
type formField = z.infer<typeof schema>;

const LandForm: React.FC = () => {
  const notify = {
    success: (text: string) => toast.success(text),
    error: (text: string) => toast.error(text),
  };
  const [loading, setLoading] = useState<boolean>(false);
  const [cookie] = useCookies(["token"]);
  const [file, setFile] = useState<FileList>();
  const [checkBox, setCheck] = useState<CheckBox>({
    balcony: false,
    furnished: false,
    parking: false,
    waterTank: false,
  });
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<formField>({
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
      console.log(mergedForm);

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

      const { status } = await axios.post(`${url}add-land`, form);
      if (status == 200) {
        notify.success("Room added successfully!");
        setCheck({
          balcony: false,
          furnished: false,
          waterTank: false,
          parking: false,
        });
        reset();
      } else {
        notify.error("Something went wrong!");
      }
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

  const getSelectedLocation = async (location: Location) => {
    const { data } = await axios.get(
      `https://api.geoapify.com/v1/geocode/reverse?lat=${location.lat}&lon=${location.lon}&apiKey=${apiKey}`
    );

    setValue("city", data.features[0].properties.city);
    setValue("address", data.features[0].properties.address_line1);
    setValue("lat", location.lat);
    setValue("lon", location.lon);
  };

  return (
    <>
      <div className="">
        <h1 className="font-semibold">Land Form : </h1>
        <form className=" flex gap-24" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <ul className="flex flex-col gap-6">
              <li className=" flex flex-col gap-2">
                Size
                <Input placeholder="Size" name="size" {...register("size")} />
                {errors.size && (
                  <p className="text-red-500 text-sm">{errors.size.message}</p>
                )}
              </li>
              <li className=" flex flex-col gap-2">
                Road Size
                <Input
                  placeholder="Road size"
                  name="size"
                  {...register("roadSize")}
                />
                {errors.roadSize && (
                  <p className="text-red-500 text-sm">
                    {errors.roadSize.message}
                  </p>
                )}
              </li>
              <li className=" flex flex-col gap-2">
                Distance from main road
                <Input
                  placeholder="Distance"
                  name="size"
                  {...register("distanceFromMain")}
                />
                {errors.distanceFromMain && (
                  <p className="text-red-500 text-sm">
                    {errors.distanceFromMain.message}
                  </p>
                )}
              </li>
              <li className=" flex  gap-2">
                Parking
                <input type="checkbox" name="parking" onChange={handleCheck} />
              </li>
              <li className=" flex  gap-2">
                Furnished
                <input
                  type="checkbox"
                  name="furnished"
                  onChange={handleCheck}
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

              <div>
                <MapDrawer onMapClick={getSelectedLocation} />
              </div>
              <li className=" flex flex-col gap-2">
                Address
                <Input
                  placeholder="Address"
                  name="address"
                  {...register("address")}
                />
                {errors.address && (
                  <p className="text-red-500 text-sm">
                    {errors.address.message}
                  </p>
                )}
              </li>
              <div className="">
                <div className="flex gap-6">
                  <li className=" flex flex-col gap-2">
                    Latitude
                    <Input placeholder="Lat" name="lat" {...register("lat")} />
                    {errors.lat && (
                      <p className="text-red-500 text-sm">
                        {errors.lat.message}
                      </p>
                    )}
                  </li>
                  <li className=" flex flex-col gap-2">
                    Longitude
                    <Input placeholder="lon" name="lon" {...register("lon")} />
                    {errors.lon && (
                      <p className="text-red-500 text-sm">
                        {errors.lon.message}
                      </p>
                    )}
                  </li>
                </div>
                <li className=" flex flex-col gap-2 mt-3">
                  City
                  <Input placeholder="lon" name="lon" {...register("city")} />
                  {errors.city && (
                    <p className="text-red-500 text-sm">
                      {errors.city.message}
                    </p>
                  )}
                </li>
              </div>
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
              <li className="flex flex-col gap-2">
                <Label htmlFor="file" className="text-left">
                  Price
                </Label>
                <Input
                  type="number"
                  placeholder="Price"
                  name="price"
                  {...register("price")}
                />
                {errors.price && (
                  <p className="text-red-500 text-sm">{errors.price.message}</p>
                )}
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

export default LandForm;
