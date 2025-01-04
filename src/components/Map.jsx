import { useNavigate, useSearchParams } from 'react-router-dom';
import styles from './Map.module.css';
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
  useMapEvent,
} from 'react-leaflet';
import { useCities } from '../contexts/CitiesContext';
import { useEffect, useState } from 'react';
import { useGeolocation } from '../hooks/useGeolocation';
import Button from './Button';

function Map() {
  const { cities } = useCities();
  const [searchParams] = useSearchParams();
  const [mapPosition, setMapPosition] = useState([51.505, -0.09]);
  const {
    isLoading: isLoadingPosition,
    position: geolocationPosition,
    getPosition,
  } = useGeolocation(null, setMapPosition);

  const mapLat = searchParams.get('lat');
  const mapLng = searchParams.get('lng');

  useEffect(
    function () {
      if (mapLat && mapLng) setMapPosition([mapLat, mapLng]);
    },
    [mapLat, mapLng],
  );

  function ChangeCenter({ position }) {
    const map = useMap();
    console.log('ChangeCenter: ', position);
    console.log('geolocationPosition: ', geolocationPosition);
    console.log('isLoadingPosition: ', isLoadingPosition);
    map.setView(position);
    return null;
  }

  function DetectClick() {
    const navigate = useNavigate();
    useMapEvent({
      click: (e) => navigate(`form?${e.latlng.lat}&${e.latlng.lng}`),
    });
  }

  return (
    <div className={styles.mapContainer}>
      <Button type='position' onClick={getPosition}>
        Use your position
      </Button>
      <MapContainer
        center={mapPosition}
        zoom={6}
        scrollWheelZoom={true}
        className={styles.map}
      >
        <ChangeCenter position={mapPosition} />
        <DetectClick />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url='https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png'
        />
        {cities.map((city) => {
          return (
            <Marker
              key={city.id}
              position={[city.position.lat, city.position.lng]}
            >
              <Popup>
                <span>{city.emoji}</span>
                <span> {city.cityName}</span>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
}

export default Map;
