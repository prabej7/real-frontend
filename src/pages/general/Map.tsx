import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
  useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import React, { useEffect, useState } from "react";
import Location from "@/constant/types/location";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { RiMapPinUserFill } from "react-icons/ri";
import "leaflet-routing-machine";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import LocationUpdater from "@/components/map/LocationUpdater";
import { useRoomContext } from "@/Provider/RoomsContext";
import Loading from "@/components/ui/Loading";
import Alert from "@/components/user/Alert";
import RoutingFunction from "@/components/map/RoutingFunction";
import Rooms from "@/constant/types/rooms";
import RoomPopUp from "@/components/map/RoomPopUp";
import Filter from "@/components/map/Filter";

interface SelectedLocation {
  lat: number;
  lon: number;
  isRouting: boolean;
}

const Map: React.FC = () => {
  const { ToastContainer, notify } = Alert();
  const [query, setQuery] = useState<string>("");
  const [searchLocation, setSearchLocation] = useState<Location>({
    lat: 27.7172,
    lon: 85.324,
  });
  const [userLocation, setUserLocation] = useState<Location>({
    lat: 27.7172,
    lon: 85.324,
  });

  const [selectedLocation, setSelectedLocation] =
    useState<SelectedLocation | null>(null);

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
        },
        (error) => {}
      );
    }
  }, []);
  const handleSearch = async () => {
    try {
      const { data } = await axios.get(
        `https://api.geoapify.com/v1/geocode/search?city=${query}&apiKey=${
          import.meta.env.VITE_API
        }`
      );

      setSearchLocation({
        lat: data.features[0].properties.lat,
        lon: data.features[0].properties.lon,
      });
    } catch (e) {
      notify.error("Invalid city name");
    } finally {
    }
  };
  const handleSelfLoction = () => {
    setSearchLocation(userLocation);
  };

  const handleRouting = (room: Rooms) => {
    if (!selectedLocation?.isRouting) {
      return setSelectedLocation({
        ...room.coord,
        isRouting: true,
      });
    }
    setSelectedLocation({
      ...room.coord,
      isRouting: false,
    });
  };

  const { loading, rooms } = useRoomContext();
  if (loading) return <Loading />;

  if (rooms instanceof Array)
    return (
      <div className="relative h-screen w-screen flex  justify-center">
        <div className="absolute z-10 flex flex-col">
          <div className="w-screen flex gap-3 sm:px-[500px] 2xl:px-[700px] pt-6 px-12">
            <Input
              className="bg-white"
              placeholder="Search city"
              onChange={(e) => setQuery(e.target.value)}
            />
            <Button onClick={handleSearch}>Search</Button>
          </div>
        </div>
        <Filter />
        <div
          className="bg-slate-900 h-16 w-16 cursor-pointer rounded-full absolute z-10 lg:bottom-24 lg:right-24 flex justify-center items-center bottom-12 right-6"
          onClick={handleSelfLoction}
        >
          <RiMapPinUserFill className="text-white text-4xl" />
        </div>
        <MapContainer
          center={
            userLocation
              ? [userLocation.lat, userLocation.lon]
              : [searchLocation.lat, searchLocation.lon]
          }
          zoom={13}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={[userLocation.lat, userLocation.lon]}>
            <Popup>You</Popup>
          </Marker>
          {rooms.map((room) => {
            return <RoomPopUp room={room} onRouting={handleRouting} />;
          })}

          <LocationUpdater
            location={{ lat: searchLocation.lat, lng: searchLocation.lon }}
          />
          {selectedLocation && selectedLocation.isRouting && (
            <RoutingFunction
              start={{ lat: userLocation.lat, lng: userLocation.lon }}
              end={{ lat: selectedLocation.lat, lng: selectedLocation.lon }}
            />
          )}
        </MapContainer>
        <ToastContainer />
      </div>
    );
};

export default Map;
