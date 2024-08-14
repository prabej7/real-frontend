import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "../ui/button";
import { FaFilter, FaLeaf } from "react-icons/fa";
import { useState } from "react";
import RoomForm from "./Forms/Room";
import HostelForm from "./Forms/HostelForm";
import Rooms from "@/constant/types/rooms";

interface Props {
  onFilter: (rooms: Rooms[]) => void;
  onClose?: () => void;
  open?: boolean;
}

const Filter: React.FC<Props> = ({ onFilter, onClose, open }) => {
  const [selected, setSelected] = useState<string>("Room");

  return (
    <Sheet onOpenChange={onClose} open={open}>
      <SheetTrigger>
        <Button
          variant="outline"
          className="absolute sm:top-6  sm:right-6 top-16 sm:w-24 w-[185px] sm:mr-6 mr-[90px] z-10 sm:flex gap-1 "
        >
          <FaFilter />
          Filter
        </Button>
      </SheetTrigger>
      <SheetContent side="right">
        <SheetHeader>
          <SheetTitle className="text-left">Filter</SheetTitle>
          <SheetDescription className="text-left">
            By price, location, and facilities.
            <div className="text-slate-950 mt-6 flex flex-col gap-6">
              <div className="flex flex-col gap-3">
                <p className="font-medium">Type</p>
                <select
                  className="select select-bordered w-full max-w-xs"
                  onChange={(e) => setSelected(e.target.value)}
                >
                  <option selected>Room</option>
                  <option>Hostel</option>
                  <option>Land</option>
                </select>
              </div>
              <div>
                {selected == "Room" && (
                  <RoomForm onFilter={(rooms: Rooms[]) => onFilter(rooms)} />
                )}
                {selected == "Hostel" && <HostelForm />}
              </div>
            </div>
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};

export default Filter;
