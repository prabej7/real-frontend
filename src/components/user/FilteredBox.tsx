import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { FaMapMarkedAlt } from "react-icons/fa";
import { TbListDetails } from "react-icons/tb";
import Rooms from "@/constant/types/rooms";
import { FC } from "react";
import Location from "@/constant/types/location";

interface Props {
  open: boolean;
  onClose?: () => void;
  items: Rooms[];
  onItemClick: (coords: Location) => void;
}

const FilteredItems: FC<Props> = ({ open, onClose, items, onItemClick }) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Looks similar:</DialogTitle>
          <DialogDescription>
            Click on the map icon and details to see on the map and details
            page.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {items.map((room) => {
            return (
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-bold text-xl">{room.address}</p>
                  <p className="text-sm">Rooms : {room.noOfRooms}</p>
                </div>
                <div className="flex gap-3">
                  <FaMapMarkedAlt
                    className="text-2xl cursor-pointer"
                    onClick={() => {
                      onItemClick(room.coord);
                    }}
                  />
                  <TbListDetails className="text-2xl cursor-pointer" />
                </div>
              </div>
            );
          })}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default FilteredItems;
