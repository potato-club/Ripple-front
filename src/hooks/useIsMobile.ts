import { useEffect, useState } from 'react';

const useIsMobile = (maxWidth = 480) => {
  const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth <= maxWidth);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= maxWidth);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [maxWidth]);

  return isMobile;
}

export default useIsMobile