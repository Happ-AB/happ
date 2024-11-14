import { addDoc, collection, getDocs } from "firebase/firestore";
import { useCallback, useEffect, useRef, useState } from "react";
import { Circle, MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { db } from "../firebase";
import "./MapView.css";
import L, { Icon } from "leaflet";
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
import { ILocation } from "../interfaces";
import useCurrentLocation from "./useCurrentLocation";
import React from "react";
import CenterInfo from "./CenterInfo";
import AddLocationModal from "./AddLocationModal";
import Search from "./Search";
import NavBar from "./NavBar";
import { Categories } from "../types/enums";

// Set up the default icon for markers
const DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
});

const currentPositionIcon = new Icon({
  iconUrl: require("./../assets/img/current-location.png"),
  iconSize: [24, 24], // size of the icon
});

const AddLocationIcon = new L.Icon({
  iconUrl: require("./../assets/img/marker-icon-orange.png"),
  iconSize: [30, 48],
  iconAnchor: [12, 48],
  popupAnchor: [3, -52],
  shadowUrl: iconShadow,
  shadowSize: [48, 48],
});

L.Marker.prototype.options.icon = DefaultIcon;

const MapView: React.FC = () => {
  const [locations, setLocations] = useState<ILocation[]>([]);
  const [center, setCenter] = useState<[number, number]>([0, 0]);
  const [addPlace, setAddPlace] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [addMarkerPosition, setAddMarkerPosition] = useState<[number, number]>([
    0, 0,
  ]);
  const [accuracy, setAccuracy] = useState<number>(0);

  const updateAccuracy = useCallback((newAccuracy: number) => {
    setAccuracy(newAccuracy);
  }, []);

  const [showCurrentPosition, setShowCurrentPosition] =
    useState<boolean>(false);

  const [addLocationModalVisible, setAddLocationModalVisible] =
    useState<boolean>(false);

  const [showDebugInfo, setShowDebugInfo] = useState<boolean>(false);

  // TODO: gör en default function som returnerar en loacation med random id samt övriga fält
  const [formData, setFormData] = useState<ILocation>({
    id: "1",
    latitude: 0,
    longitude: 0,
    name: "",
    description: "",
    category: Categories.NONE,
  });

  const addMarkerRef = useRef<L.Marker>(null!);
  const currentLocation = useCurrentLocation(showCurrentPosition, setAccuracy);
  const mapRef = useRef<L.Map>(null);

  const fetchLocations = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "snus-locations"));
      const data = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as ILocation[];
      setLocations(data);
    } catch (err) {
      console.error("Error fetching documents: ", err);
      setError(
        "An error occurred while fetching data. Please try again later."
      );
    }
  };
  useEffect(() => {
    fetchLocations();
  }, []);

  useEffect(() => {
    if (addPlace) {
      const marker = addMarkerRef.current;
      // if (marker) {
      marker.openPopup();
      //}
    }
  }, [addPlace]);

  const toggleShowDebugInfo = () => setShowDebugInfo((prev) => !prev);

  const moveToCurrentPosition = useCallback(() => {
    if (
      showCurrentPosition &&
      currentLocation.loaded &&
      !currentLocation.error
    ) {
      mapRef.current?.flyTo([
        currentLocation.coordinates.lat,
        currentLocation.coordinates.long,
      ]);
    }
  }, [
    showCurrentPosition,
    currentLocation.loaded,
    currentLocation.error,
    currentLocation.coordinates.lat,
    currentLocation.coordinates.long,
  ]);

  useEffect(() => {
    if (showCurrentPosition) {
      moveToCurrentPosition();
    }
  }, [showCurrentPosition, moveToCurrentPosition]);

  const handleMarkerDragEnd = () => {
    if (addMarkerRef.current) {
      const marker = addMarkerRef.current;
      const newPos = marker.getLatLng();

      marker.openPopup();

      setAddMarkerPosition([newPos.lat, newPos.lng]);
    }
  };

  const handleMarkerClick = (e: any) => {
    const marker = e.target;
    const popup = marker.getPopup();

    // If the popup is already open, don't close it
    if (!popup.isOpen()) {
      marker.openPopup(); // Open the popup if it's not already open
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    console.log("Form data:", formData);
    // Here you can handle the form data, e.g., send it to a server or store it locally

    try {
      await addDoc(collection(db, "snus-locations"), {
        name: formData.name,
        description: formData.description,
        category: formData.category,
        latitude: addMarkerPosition[0],
        longitude: addMarkerPosition[1],
      });

      // const marker = addMarkerRef.current;
      // marker.closePopup();
      fetchLocations();
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  const cancelAddLocation = () => {
    setAddLocationModalVisible(false);
    setAddPlace(false);
  };

  const [showSearch, setShowSearch] = useState<boolean>(false);

  const onClickNavBarSearch = () => {
    setShowSearch(!showSearch);
  };

  const onClickNavBarMenu = () => {
    alert("not implemented");
  };

  return (
    <>
      <NavBar
        onClickNavBarSearch={onClickNavBarSearch}
        onClickNavBarMenu={onClickNavBarMenu}
      />
      <div style={{ position: "relative" }}>
        {error && <div>{error}</div>}
        {!error && (
          <>
            <MapContainer
              center={center}
              zoom={14}
              ref={mapRef}
              style={{ height: "100vh", width: "100%" }}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              <CenterInfo
                center={center}
                setCenter={setCenter}
                updateAccuracy={updateAccuracy}
                setShowCurrentPosition={setShowCurrentPosition}
                setAddPlace={setAddPlace}
                setAddMarkerPosition={setAddMarkerPosition}
              />
              {locations.map((location) => (
                <Marker
                  key={location.id}
                  position={[location.latitude, location.longitude]}
                >
                  <Popup>
                    Name: {location.name} <br></br>
                    Description: {location.description}
                    <br></br>
                    Category: {location.category}
                    <br></br>
                  </Popup>
                </Marker>
              ))}
              {showCurrentPosition &&
                currentLocation.loaded &&
                !currentLocation.error && (
                  <>
                    <Marker
                      key={23423424}
                      position={[
                        currentLocation.coordinates.lat,
                        currentLocation.coordinates.long,
                      ]}
                      icon={currentPositionIcon}
                    >
                      <Popup>You are here:</Popup>
                    </Marker>
                    <Circle
                      key={324}
                      center={[
                        currentLocation.coordinates.lat,
                        currentLocation.coordinates.long,
                      ]}
                      radius={accuracy}
                    ></Circle>
                  </>
                )}
              {addPlace && (
                <Marker
                  key={676767}
                  draggable={true}
                  position={[addMarkerPosition[0], addMarkerPosition[1]]}
                  ref={addMarkerRef}
                  eventHandlers={{
                    dragend: handleMarkerDragEnd,
                    click: handleMarkerClick,
                  }}
                  icon={AddLocationIcon}
                >
                  <Popup
                    minWidth={90}
                    autoClose={false}
                    closeOnClick={false}
                    closeButton={false}
                    closeOnEscapeKey={false}
                  >
                    <div className="form-group">
                      <h3>
                        {"1. Drag marker to location"}
                        <br></br>
                        {"2. Press next button to add info"}
                      </h3>
                      <div className="form-actions">
                        <button
                          className="regular-button modal-button"
                          onClick={() => setAddPlace(false)}
                        >
                          Cancel
                        </button>
                        <button
                          className="primary-button modal-button"
                          onClick={() => setAddLocationModalVisible(true)}
                        >
                          Next
                        </button>
                      </div>
                    </div>
                  </Popup>
                </Marker>
              )}
              {/* This button is just above and to the right of + button */}
              <button onClick={toggleShowDebugInfo}>Show debug info</button>
              {showSearch && <Search />}
            </MapContainer>
            {addLocationModalVisible && (
              <AddLocationModal
                onClose={cancelAddLocation}
                onAdd={handleSubmit}
                setFormData={setFormData}
              />
            )}
            <div
              className="filter-modal"
              style={{
                position: "absolute",
                padding: 10,
                backgroundColor: "white",
                zIndex: 1000,
                width: "-webkit-fill-available",
                display: "flex",
                flexDirection: "column",
                top: 0,
              }}
            >
              <div style={{ padding: 10, fontSize: 20, alignSelf: "end" }}>
                x
              </div>
              <select
                name=""
                id="filter-category-select"
                style={{ marginBottom: 10 }}
              >
                <option value="">Categories</option>
                {Object.entries(Categories).map(([key, value]) => (
                  <option key={key} value={value}>
                    {value}
                  </option>
                ))}
              </select>
            </div>
          </>
        )}
        <div>
          {showDebugInfo && (
            <div
              style={{
                position: "absolute",
                top: "460px",
                left: "10px",
                zIndex: 1000,
                backgroundColor: "white",
                padding: "5px",
              }}
            >
              Map Center: {center[0]}, {center[1]}
              <br></br>
              Add marker position: {addMarkerPosition[0]} ,{" "}
              {addMarkerPosition[1]}
              <br></br>
              Current position: {currentLocation.coordinates.lat} ,{" "}
              {currentLocation.coordinates.long}
              <br></br>
              error: {error}
              <br></br>
              accuracy: {accuracy}
              <br></br>
              addPlace: {addPlace.toString()}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default MapView;
