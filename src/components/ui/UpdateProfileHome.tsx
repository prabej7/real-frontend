import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@radix-ui/react-label";
import { Button } from "./button";
import { Input } from "./input";
import { ChangeEvent, useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import url from "@/constant/url";
import { DialogTrigger } from "@radix-ui/react-dialog";

interface Form {
  fullName?: string;
  file?: File;
  phone?: string;
  address?: string;
}

const UpdateProfile: React.FC = () => {
  const formData = new FormData();
  const [isLoading, setLoading] = useState<boolean>(false);
  const [cookie] = useCookies(["token"]);
  const [form, setForm] = useState<Form>({});

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value, // Update the state with the correct name
    }));
  };

  const handleFile = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setForm((prev) => ({
        ...prev,
        file: e.target.files[0],
      }));
    }
  };

  const handleClick = async () => {
    setLoading(true);
    try {
      formData.append("fullName", form.fullName || "undefined"); // Use "fullName"
      formData.append("phone", form.phone || "undefined");
      formData.append("address", form.address || "undefined");
      if (form.file) {
        formData.append("file", form.file);
      }
      formData.append("token", cookie.token);

      const response = await axios.post(`${url}partial`, formData);
      if (response.status == 200) {
        window.location.reload();
      }
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="file" className="text-right">
              Profile Pic
            </Label>
            <input
              id="file"
              type="file"
              className="file-input w-full max-w-xs col-span-3"
              onChange={handleFile}
            />
            <Label htmlFor="name" className="text-right">
              Full Name
            </Label>
            <Input
              id="name"
              className="col-span-3"
              name="fullName" // Make sure this matches the key in your state
              placeholder="Full name"
              onChange={handleChange}
            />
            <Label htmlFor="phone" className="text-right">
              Phone no.
            </Label>
            <Input
              id="phone"
              className="col-span-3"
              name="phone"
              placeholder="Phone number"
              onChange={handleChange}
            />
            <Label htmlFor="address" className="text-right">
              Address
            </Label>
            <Input
              id="address"
              className="col-span-3"
              name="address"
              placeholder="Address"
              onChange={handleChange}
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={handleClick} disabled={isLoading}>
            {isLoading ? "Updating..." : "Save changes"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateProfile;
