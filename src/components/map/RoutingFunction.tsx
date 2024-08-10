import { useEffect } from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";
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

export default RoutingFunction;
