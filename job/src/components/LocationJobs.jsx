import { useEffect, useState } from 'react';

const LocationJobs = ({ onLocationChange }) => {
  const [status, setStatus] = useState('Detecting your location...');

  useEffect(() => {
    if (!navigator.geolocation) {
      setStatus('Geolocation is not supported by your browser.');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        onLocationChange({ lat: latitude, lon: longitude });
        setStatus(`Location found: (${latitude.toFixed(2)}, ${longitude.toFixed(2)})`);
      },
      (error) => {
        console.error('Geolocation Error:', error.message);
        if (error.code === error.PERMISSION_DENIED) {
          setStatus('Please allow location access in your browser.');
        } else {
          setStatus('Could not detect your location. Try again.');
        }
      }
    );
  }, [onLocationChange]);

  return (
    <div className="mb-4 text-purple-700 text-xl text-center">
      {status}
    </div>
  );
};

export default LocationJobs;
