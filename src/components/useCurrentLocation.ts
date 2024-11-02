import { useCallback, useEffect, useState } from "react";

const useCurrentLocation = (
  showCurrentPosition = false,
  updateAccuracy: any
) => {
  const [currentLocation, setCurrentLocation] = useState({
    loaded: false,
    coordinates: {
      lat: 0,
      long: 0,
    },
    error: "",
  });

  const onSuccess = useCallback(
    (pos: GeolocationPosition) => {
      setCurrentLocation((state) => ({
        loaded: true,
        coordinates: {
          lat: pos.coords.latitude,
          long: pos.coords.longitude,
        },
        error: "",
      }));

      updateAccuracy(pos.coords.accuracy);
    },
    [setCurrentLocation, updateAccuracy]
  );

  const onError = useCallback(
    (error: any) => {
      setCurrentLocation({
        loaded: true,
        coordinates: { lat: 0, long: 0 },
        error: error,
      });
    },
    [setCurrentLocation]
  );

  useEffect(() => {
    console.log("use first");
    navigator.geolocation.getCurrentPosition(onSuccess, onError);
  }, [onSuccess, onError]);

  useEffect(() => {
    if (showCurrentPosition === true) {
      if (!("geolocation" in navigator)) {
        onError({
          loaded: true,
          coordinates: { lat: "", long: "" },
          error: "Geolocation not supported",
        });
      }

      const interval = setInterval(() => {
        console.log("use second+");
        navigator.geolocation.getCurrentPosition(onSuccess, onError);
      }, 1000);

      // Rensa intervallet när komponenten avmonteras
      return () => clearInterval(interval);
    }
  }, [showCurrentPosition, onSuccess, onError]);

  return currentLocation;
};

export default useCurrentLocation;
