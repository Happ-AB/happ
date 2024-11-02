import React, { useEffect } from "react";
import { useMap } from "react-leaflet";

// Component to handle flying to the user's position
const FlyToUserPosition: React.FC<{ position: [number, number] | null }> = ({
  position,
}) => {
  const map = useMap();

  useEffect(() => {
    if (position) {
      map.flyTo(position, 13);
    }
  }, [position, map]);

  return null;
};

export default FlyToUserPosition;
