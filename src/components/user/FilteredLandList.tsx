import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { FaMapMarkedAlt } from "react-icons/fa";
import { TbListDetails } from "react-icons/tb";
import { FC } from "react";
import Location from "@/constant/types/location";

import { useNavigate } from "react-router-dom";
import Land from "@/constant/types/land";

interface Props {
  open: boolean;
  onClose?: () => void;
  items: Land[];
  onItemClick: (coords: Location) => void;
}

const FilteredLandList: FC<Props> = ({ open, onClose, items, onItemClick }) => {
  const navigate = useNavigate();
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
          {items.map((land) => {
            return (
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-bold text-xl">{land.address}</p>
                  <p className="text-sm">Price : {land.price}</p>
                </div>
                <div className="flex gap-3">
                  <FaMapMarkedAlt
                    className="text-2xl cursor-pointer"
                    onClick={() => {
                      onItemClick(land.coord);
                    }}
                  />
                  <TbListDetails
                    className="text-2xl cursor-pointer"
                    onClick={() => navigate(`/lands/${land._id}`)}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default FilteredLandList;
