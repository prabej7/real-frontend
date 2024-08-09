import React from "react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "./button";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const MapDrawer: React.FC<Props> = ({ isOpen, onClose }) => {
  return (
    <Drawer open={isOpen} onClose={onClose} >
      <DrawerContent className="h-screen" >
        <DrawerHeader>
          <DrawerTitle>Are you absolutely sure?</DrawerTitle>
          <div>
            <MapContainer
              center={[51.505, -0.09]}
              zoom={13}
              scrollWheelZoom={false}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker position={[51.505, -0.09]}>
                <Popup>
                  A pretty CSS3 popup. <br /> Easily customizable.
                </Popup>
              </Marker>
            </MapContainer>
          </div>
        </DrawerHeader>
        <DrawerFooter>
          <Button onClick={onClose}>Submit</Button>
          <DrawerClose>
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default MapDrawer;
