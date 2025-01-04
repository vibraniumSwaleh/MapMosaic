import { useState } from 'react';

function useGeolocation(defaultPosition = null, setGeolocationPosition) {
  const [isLoading, setIsLoading] = useState(false);
  const [position, setPosition] = useState(defaultPosition);
  const [error, setError] = useState(null);

  function getPosition() {
    if (!navigator.geolocation)
      return setError('Your browser does not support geolocation');
    setIsLoading(true);

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const newPosition = {
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        };
        setPosition(newPosition);

        // Ensure correct format for external setter
        if (setGeolocationPosition) {
          setGeolocationPosition([newPosition.lat, newPosition.lng]);
        }
        setIsLoading(false);
      },
      (error) => {
        setError(error.message);
        setIsLoading(false);
      },
    );
  }

  return { isLoading, position, error, getPosition };
}

export { useGeolocation };
