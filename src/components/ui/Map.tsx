import React, { useEffect, useState } from "react";
import { Button } from "./button";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Location from "@/constant/types/location";
import axios from "axios";
import apiKey from "@/constant/api";
import { Input } from "./input";
import { RiMapPinUserFill } from "react-icons/ri";
import L, { Icon } from "leaflet";

interface Props {
  onMapClick?: (loaction: Location) => void;
}

const MapDrawer: React.FC<Props> = ({ onMapClick }) => {
  const [query, setQuery] = useState<string>("");
  const [selected, setSelected] = useState<Location>({
    lat: 27.7172,
    lon: 85.324,
  });
  const [searchLocation, setSearchLocation] = useState<Location>({
    lat: 27.7172,
    lon: 85.324,
  });
  const [userLocation, setUserLocation] = useState<Location>({
    lat: 27.7172,
    lon: 85.324,
  });
  const LocationUpdater: React.FC<{
    location: { lat: number; lng: number };
  }> = ({ location }) => {
    const map = useMap();

    useEffect(() => {
      if (location) {
        map.flyTo(location, map.getZoom());
      }
    }, [location, map]);

    return null;
  };

  const LatLngFinder: React.FC = () => {
    const map = useMap();
    map.on("click", (e) => {
      setSelected({
        lat: e.latlng.lat,
        lon: e.latlng.lng,
      });
      setSearchLocation({
        lat: e.latlng.lat,
        lon: e.latlng.lng,
      });
    });

    return null;
  };

  useEffect(() => {
    onMapClick(selected);
  }, [selected]);
  useEffect(() => {
    if (navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          });
          setSearchLocation({
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          });
          setSelected({
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          });
        },
        (error) => {}
      );
    }
  }, []);
  const handleSearch = async () => {
    try {
      const { data } = await axios.get(
        `https://api.geoapify.com/v1/geocode/search?city=${query}&apiKey=${apiKey}`
      );

      setSearchLocation({
        lat: data.features[0].properties.lat,
        lon: data.features[0].properties.lon,
      });
    } catch (e) {
    } finally {
    }
  };
  const handleSelfLoction = () => {
    setSearchLocation(userLocation);
  };
  const icon = new Icon({
    iconUrl: "/home.png",
    iconSize: [60, 60],
  });

  return (
    <Sheet>
      <SheetTrigger>
        <Button variant="outline" type="button" className="mb-3">
          Select on map
        </Button>
      </SheetTrigger>
      <SheetContent className="w-screen " side="top">
        <SheetHeader>
          <SheetTitle>Select location on map</SheetTitle>
          <div className="map-container relative">
            <div>
              <div className="absolute z-10 flex gap-6 lg:top-6 lg:left-[35%] top-6 px-6">
                <Input
                  className="bg-white"
                  placeholder="Search city"
                  onChange={(e) => setQuery(e.target.value)}
                />
                <Button onClick={handleSearch}>Search</Button>
              </div>
              <div
                className="bg-slate-900 h-16 w-16 cursor-pointer rounded-full absolute z-10 lg:bottom-24 lg:right-24 flex justify-center items-center bottom-12 right-6"
                onClick={handleSelfLoction}
              >
                <RiMapPinUserFill className="text-white text-4xl" />
              </div>
            </div>
            <MapContainer
              center={
                userLocation
                  ? [userLocation.lat, userLocation.lon]
                  : [searchLocation.lat, searchLocation.lon]
              }
              zoom={30}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker position={[userLocation.lat, userLocation.lon]}>
                <Popup>You</Popup>
              </Marker>
              <Marker position={[selected.lat, selected.lon]} icon={icon}>
                <Popup>Location</Popup>
              </Marker>
              <LocationUpdater
                location={{ lat: searchLocation.lat, lng: searchLocation.lon }}
              />
              <LatLngFinder />
            </MapContainer>
          </div>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};

export default MapDrawer;
