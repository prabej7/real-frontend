import { useMap } from "react-leaflet";
import { useEffect } from "react";
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

export default LocationUpdater;
