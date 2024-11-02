import React, { useCallback, useEffect } from "react";
import { useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-easybutton/src/easy-button.css";
import L from "leaflet";
import "leaflet-easybutton";
import "@fortawesome/fontawesome-free/css/all.min.css";

interface ICenterInfoProps {
  center: any;
  setCenter: any;
  updateAccuracy: any;
  setShowCurrentPosition: any;
  setAddPlace: any;
  setAddMarkerPosition: any;
}

const CenterInfo: React.FC<ICenterInfoProps> = ({
  center,
  setCenter,
  updateAccuracy,
  setShowCurrentPosition,
  setAddPlace,
  setAddMarkerPosition,
}) => {
  const map = useMap();

  const handleGetCenter = useCallback(
    (map: L.Map) => {
      const mapCenter = map.getCenter();
      if (
        mapCenter &&
        (center[0] !== mapCenter.lat || center[1] !== mapCenter.lng)
      ) {
        setCenter([mapCenter.lat, mapCenter.lng]);
      }
    },
    [center, setCenter]
  );
  useEffect(() => {
    console.log("center Info: " + center);
  });

  useEffect(() => {
    const onMoveEnd = () => handleGetCenter(map);
    map.on("moveend", onMoveEnd);

    if (center[0] === 0 && center[1] === 0) {
      navigator.geolocation.getCurrentPosition(
        (pos: GeolocationPosition) => {
          map.setView([pos.coords.latitude, pos.coords.longitude]);
          console.log("CenteInfo - ska bara köras en gång");
          updateAccuracy(pos.coords.accuracy);

          L.easyButton(
            "fa-location-crosshairs",
            function (btn: any, map) {
              setShowCurrentPosition((prevState: boolean) => !prevState);
            },
            "Show my position"
          ).addTo(map);

          L.easyButton(
            "fa-location-dot",
            function (btn: any, map) {
              const mapCenter = map.getCenter();
              setAddMarkerPosition([mapCenter.lat, mapCenter.lng]);
              setAddPlace((prevState: boolean) => !prevState);
            },
            "Add new snus place"
          ).addTo(map);

          console.log(
            "pos.coords.accuracy " +
              pos.coords.accuracy +
              " pos.coords.latitude: " +
              pos.coords.latitude +
              " pos.coords.longitude: " +
              pos.coords.longitude
          );
        },
        (err) => {
          console.error(err);
        }
      );
    }

    return () => {
      map.off("moveend", onMoveEnd);
    };
  }, [
    map,
    center,
    handleGetCenter,
    updateAccuracy,
    setAddPlace,
    setAddMarkerPosition,
    setShowCurrentPosition,
  ]);

  return null;
};

export default CenterInfo;
