import { useState, useEffect } from 'react';
import NetworkStatus from './components/NetworkStatus';
import LocationJobs from './components/LocationJobs';
import JobList from './components/JobList';
import BackgroundSync from './components/BackgroundSync';

const App = () => {
  const [lowDataMode, setLowDataMode] = useState(false);
  const [location, setLocation] = useState(null);
  const [isOffline, setIsOffline] = useState(!navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-200 px-4 flex justify-center">
      {!isOffline && (
        <div className="fixed top-4 right-4 bg-blue-100 text-blue-700 px-3 py-1 rounded-full shadow text-sm z-50">
          📶 Network: {lowDataMode ? 'Slow' : 'Fast'}
        </div>
      )}

      <div className="bg-white rounded-2xl p-6 max-w-3xl w-full shadow-lg my-16">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Job Portal for Remote Areas
        </h1>

        {isOffline && (
          <div className="bg-red-100 text-red-800 text-center p-3 mb-4 rounded-md shadow-sm">
            You are currently offline. Some features may not work.
          </div>
        )}

     
        <NetworkStatus onStatusChange={(speed) => setLowDataMode(speed === '2g' || speed === 'slow-2g')} />
        <LocationJobs onLocationChange={(loc) => setLocation(loc)} />
        <JobList lowDataMode={lowDataMode} />
        <BackgroundSync />
      </div>
    </div>
  );
};

export default App;
