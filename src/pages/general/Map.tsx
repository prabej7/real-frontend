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
import apiKey from "@/constant/api";
import axios from "axios";
import { RiMapPinUserFill } from "react-icons/ri";
import "leaflet-routing-machine";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import { Icon } from "leaflet";
import LocationUpdater from "@/components/map/LocationUpdater";
import { useRoomContext } from "@/Provider/RoomsContext";
import Loading from "@/components/ui/Loading";
import { PiPath } from "react-icons/pi";
import { FaFilter } from "react-icons/fa";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
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
        `http://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=5&appid=${apiKey}`
      );

      setSearchLocation({ lat: data[0].lat, lon: data[0].lon });
    } catch (e) {
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

          {/* <Popup>
                  <div className="flex flex-col gap-3">
                    <h2 className="font-bold">{room.address}</h2>
                    <div>
                      <img className="rounded" src={`${room.img[0]}`} />
                    </div>
                    <div className="flex gap-3">
                      <Button className="">Details</Button>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger>
                            <Button
                              variant="secondary"
                              onClick={() => {
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
                              }}
                            >
                              <PiPath />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent className="bg-white text-slate-950 py-0 shadow-md">
                            <p>Show path</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  </div>
                </Popup> */}

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
      </div>
    );
};

export default Map;
