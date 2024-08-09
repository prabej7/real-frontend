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
import L, { divIcon } from "leaflet";

const Map: React.FC = () => {
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
  const [query, setQuery] = useState<string>("");
  const [searchLocation, setSearchLocation] = useState<Location>({
    lat: 27.7172,
    lon: 85.324,
  });
  const [userLocation, setUserLocation] = useState<Location>({
    lat: 27.7172,
    lon: 85.324,
  });

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
  const RoutingFunction: React.FC<{
    start: L.LatLngExpression;
    end: L.LatLngExpression;
  }> = ({ start, end }) => {
    const map = useMap();

    useEffect(() => {
      if (start && end) {
        // Create and add routing control
        const control = L.Routing.control({
          waypoints: [L.latLng(start), L.latLng(end)],
          lineOptions: {
            extendToWaypoints: true,
            missingRouteTolerance: 1,
          },
        }).addTo(map);

        // Add custom markers manually
        L.marker(start).addTo(map);
        L.marker(end).addTo(map);

        return () => {
          map.removeControl(control);
        };
      }
    }, [start, end, map]);

    return null;
  };

  return (
    <div className="relative">
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
        <LocationUpdater
          location={{ lat: searchLocation.lat, lng: searchLocation.lon }}
        />
        {userLocation.lat !== searchLocation.lat && (
          <RoutingFunction
            start={{ lat: userLocation.lat, lng: userLocation.lon }}
            end={{ lat: searchLocation.lat, lng: searchLocation.lon }}
          />
        )}
      </MapContainer>
    </div>
  );
};

export default Map;
