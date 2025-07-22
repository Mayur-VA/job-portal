import { useEffect, useState } from 'react';

const NetworkStatus = ({ onStatusChange }) => {
  const [connectionType, setConnectionType] = useState('checking');
  const [isOffline, setIsOffline] = useState(!navigator.onLine);

  useEffect(() => {
    const connection = navigator.connection || navigator.webkitConnection;

    const updateConnection = () => {
      if (connection) {
        const type = connection.effectiveType;
        setConnectionType(type);
        onStatusChange(type);
      }
    };

    const handleOnline = () => {
      setIsOffline(false);
      updateConnection();
    };

    const handleOffline = () => setIsOffline(true);

    updateConnection();
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    if (connection) connection.addEventListener('change', updateConnection);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      if (connection) connection.removeEventListener('change', updateConnection);
    };
  }, [onStatusChange]);

  return (
    <div className="mb-4 text-sm text-center">
      {isOffline ? (
        <span className="text-red-600">You are currently offline</span>
      ) : connectionType === '2g' || connectionType === 'slow-2g' ? (
        <span className="text-yellow-600">Slow Network Detected ({connectionType})</span>
      ) : (
        <span className="text-green-700 text-xl">Connected - Network: {connectionType}</span>
      )}
    </div>
  );
};

export default NetworkStatus;
