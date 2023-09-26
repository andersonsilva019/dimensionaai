import { useCallback, useEffect, useState } from "react";
import { Wrapper } from '@googlemaps/react-wrapper'
import { Marker } from "./Marker";
import { MapContainer } from "./MapContainer";

interface MapProps {
  saveLatLonFromGoogleMaps: (lat: string, lon: string) => void;
}

export function Map({ saveLatLonFromGoogleMaps }: MapProps) {

  const [position, setPosition] = useState<google.maps.LatLngLiteral>({
    lat: 0,
    lng: 0
  });

  useEffect(() => {
    if (navigator.geolocation) {
      window.navigator.geolocation.getCurrentPosition(position => {
        setPosition({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        });
      })
    }
  }, [])

  const updatePosition = useCallback((lat: number, lng: number) => {
    setPosition({
      lat,
      lng
    });
  }, [])

  const saveLatLon = useCallback((lat: string, lon:string) => {
    saveLatLonFromGoogleMaps(lat, lon)
  }, [])

  return (
    <Wrapper apiKey={`${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`}>
      <MapContainer
        zoom={3}
        position={position}
        updatePosition={updatePosition}
        saveLatLon={saveLatLon}
      >
        <Marker position={position} />
      </MapContainer>
    </Wrapper>
  );
}

