import { useEffect } from 'react';

const BackgroundSync = () => {
  useEffect(() => {
    const timeout = setTimeout(() => {
      console.log(" Background sync task: refreshing job data...");
    }, 5000); 

    return () => clearTimeout(timeout);
  }, []);

  return null;
};

export default BackgroundSync;
