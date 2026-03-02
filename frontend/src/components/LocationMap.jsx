import { useEffect, useState } from "react";
import API from "../services/api";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "../styles/LocationMap.css";

function LocationMap() {
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    const fetchLocations = async () => {
      const { data } = await API.get("/activity/location-history");
      setLocations(data);
    };
    fetchLocations();
  }, []);

  if (locations.length === 0) return <p>No location history</p>;

  return (
    <div className="map-wrapper">
      <h3>📍 Location History</h3>

      <MapContainer
        center={[
          locations[0].location.lat,
          locations[0].location.lng,
        ]}
        zoom={13}
        className="map-container"
      >
        <TileLayer
          attribution="&copy; OpenStreetMap"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {locations.map((loc, index) => (
          <Marker
            key={index}
            position={[loc.location.lat, loc.location.lng]}
          >
            <Popup>
              <div>
                <p>
                  <strong>Date:</strong>{" "}
                  {new Date(loc.createdAt).toLocaleDateString()}
                </p>
                <p>
                  <strong>Time:</strong>{" "}
                  {new Date(loc.createdAt).toLocaleTimeString()}
                </p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}

export default LocationMap;