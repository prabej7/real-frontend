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
import apiKey from "@/constant/api";
import FilteredRoomsList from "@/components/user/FilteredBox";
import Hostel from "@/constant/types/Hostels";
import FilteredHostel from "@/components/user/HostelFilterBox";
import { useHostelContext } from "@/Provider/HostelContext";
import HostelPopup from "@/components/map/HostelPopup";
import { useLocation } from "react-router-dom";
import { useLands } from "@/Provider/LandContext";
import LandPopup from "@/components/map/LandPopup";
import Land from "@/constant/types/land";
import FilteredLandList from "@/components/user/FilteredLandList";

interface SelectedLocation {
  lat: number;
  lon: number;
  isRouting: boolean;
}

const Map: React.FC = () => {
  const [hostelOpen, setHostelOpen] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const [landOpen, setLandOpen] = useState<boolean>(false);
  const [filterOpen, setFilterOpen] = useState<boolean>(false);
  const [allRooms, setRooms] = useState<Rooms[]>([]);
  const [allhostel, setHostels] = useState<Hostel[]>([]);
  const [allLands, setLands] = useState<Land[]>([]);
  const { allHostels } = useHostelContext();
  const { ToastContainer, notify } = Alert();
  const [query, setQuery] = useState<string>("");

  const { lands, isLoading } = useLands();

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
  const location = useLocation();
  useEffect(() => {
    if (location.state) {
      setSearchLocation(location.state);
    }
  }, [location]);

  useEffect(() => {
    if (navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          });
          if (!location.state) {
            setSearchLocation({
              lat: position.coords.latitude,
              lon: position.coords.longitude,
            });
          }
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

  const onItemClick = (coords: Location) => {
    setOpen(false);
    setSearchLocation({
      lat: coords.lat,
      lon: coords.lon,
    });
    setFilterOpen(false);
  };

  const onItemClickHostel = (coords: Location) => {
    setHostelOpen(false);
    setSearchLocation({
      lat: coords.lat,
      lon: coords.lon,
    });
    setFilterOpen(false);
  };

  const onLandClick = (coords: Location) => {
    setLandOpen(false);
    setSearchLocation(coords);
    setFilterOpen(false);
  };

  const { loading, rooms } = useRoomContext();

  if (loading) return <Loading />;

  if (rooms instanceof Array)
    return (
      <div className="relative h-screen w-screen flex  justify-center">
        {allRooms && (
          <FilteredRoomsList
            items={allRooms}
            onItemClick={onItemClick}
            open={open}
            onClose={() => setOpen(false)}
          />
        )}
        {allhostel && (
          <FilteredHostel
            items={allhostel}
            open={hostelOpen}
            onItemClick={onItemClickHostel}
            onClose={() => setHostelOpen(false)}
          />
        )}

        {allLands && (
          <FilteredLandList
            items={lands}
            open={landOpen}
            onItemClick={onLandClick}
            onClose={() => setLandOpen(false)}
          />
        )}

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
        <Filter
          onClose={() => setFilterOpen(!filterOpen)}
          open={filterOpen}
          onFilter={(rooms: Rooms[]) => {
            if (Array.isArray(rooms) && rooms.length !== 0) {
              setOpen(true);
              setRooms(rooms);
            }
          }}
          onFilterHostel={(hostels: Hostel[]) => {
            setHostelOpen(true);
            setHostels(hostels);
          }}
          onFilterLand={(lands: Land[]) => {
            setLands(lands);
            setLandOpen(true);
          }}
        />
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
          zoom={17}
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

          {allHostels.map((room) => {
            return <HostelPopup room={room} onRouting={handleRouting} />;
          })}

          {lands.map((land) => {
            return <LandPopup land={land} onRouting={handleRouting} />;
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
