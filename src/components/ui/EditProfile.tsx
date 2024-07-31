import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@radix-ui/react-label";
import { Button } from "./button";
import { Input } from "./input";
import { ChangeEvent, useState } from "react";

interface Props {
  fullName?: string;
  email: string;
  onChangeFullName?: (e: ChangeEvent<HTMLInputElement>) => void;
  onChangeEmail?: (e: ChangeEvent<HTMLInputElement>) => void;
}

const DialogBox: React.FC<Props> = ({
  fullName,
  email,
  onChangeEmail,
  onChangeFullName,
}) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Edit Profile</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Full Name
            </Label>
            <Input
              id="name"
              value={fullName}
              onChange={onChangeFullName}
              className="col-span-3"
              name="fullName"
              placeholder="Full nane"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Email
            </Label>
            <Input
              id="username"
              name="email"
              value={email}
              className="col-span-3"
              onChange={onChangeEmail}
              placeholder="Email"
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DialogBox;
