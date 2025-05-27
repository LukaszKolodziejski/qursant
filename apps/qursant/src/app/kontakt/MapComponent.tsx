import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { motion } from 'framer-motion';

interface MapComponentProps {
  coordinates: {
    lat: number;
    lng: number;
  };
  isHovered: boolean;
}

const MapComponent = ({ coordinates, isHovered }: MapComponentProps) => {
  const mapRef = useRef<L.Map | null>(null);
  const markerRef = useRef<L.Marker | null>(null);

  useEffect(() => {
    if (!mapRef.current) {
      // Inicjalizacja mapy
      mapRef.current = L.map('map', {
        center: [coordinates.lat, coordinates.lng],
        zoom: 15,
        zoomControl: true,
        attributionControl: true,
      });

      // Dodanie warstwy OpenStreetMap
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(mapRef.current);

      // Niestandardowa ikona markera
      const customIcon = L.divIcon({
        className: 'custom-marker',
        html: `
          <div class="marker-container animate-marker-entry">
            <div class="marker-pin"></div>
            <div class="marker-pulse"></div>
            <div class="marker-ripple"></div>
          </div>
        `,
        iconSize: [50, 50],
        iconAnchor: [20, 40],
      });

      // Dodanie markera
      markerRef.current = L.marker([coordinates.lat, coordinates.lng], {
        icon: customIcon,
      }).addTo(mapRef.current);

      // Dodanie klasy animacji do mapy po załadowaniu
      setTimeout(() => {
        const mapElement = document.getElementById('map');
        if (mapElement) {
          mapElement.classList.add('map-loaded');
        }
      }, 100);
    }

    // Czyszczenie przy odmontowaniu
    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [coordinates]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className="w-full h-full"
    >
      <style jsx global>{`
        .custom-marker {
          background: transparent;
          border: none;
        }

        .marker-container {
          position: relative;
          width: 40px;
          height: 40px;
          opacity: 0;
          transform: translateY(20px);
        }

        .animate-marker-entry {
          animation: markerEntry 0.8s ease-out 0.3s forwards;
        }

        @keyframes markerEntry {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .marker-pin {
          width: 24px;
          height: 24px;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%) scale(0);
          background: #3b82f6;
          border: 3px solid #ffffff;
          border-radius: 50%;
          box-shadow: 0 0 10px rgba(59, 130, 246, 0.5);
          z-index: 3;
          transition: all 0.3s ease;
          animation: pinEntry 0.5s ease-out 0.8s forwards;
        }

        @keyframes pinEntry {
          0% {
            transform: translate(-50%, -50%) scale(0);
          }
          50% {
            transform: translate(-50%, -50%) scale(1.2);
          }
          100% {
            transform: translate(-50%, -50%) scale(1);
          }
        }

        .marker-pulse {
          width: 40px;
          height: 40px;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          background: rgba(59, 130, 246, 0.2);
          border-radius: 50%;
          z-index: 2;
          opacity: 0;
          animation: pulse 2s infinite 1.2s, fadeIn 0.3s ease-out 1.2s forwards;
        }

        .marker-ripple {
          width: 60px;
          height: 60px;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          border: 2px solid rgba(59, 130, 246, 0.3);
          border-radius: 50%;
          z-index: 1;
          opacity: 0;
          animation: ripple 3s infinite 1.5s, fadeIn 0.3s ease-out 1.5s forwards;
        }

        @keyframes fadeIn {
          to {
            opacity: 1;
          }
        }

        @keyframes pulse {
          0% {
            transform: translate(-50%, -50%) scale(0.5);
            opacity: 1;
          }
          100% {
            transform: translate(-50%, -50%) scale(2);
            opacity: 0;
          }
        }

        @keyframes ripple {
          0% {
            transform: translate(-50%, -50%) scale(0.8);
            opacity: 1;
          }
          100% {
            transform: translate(-50%, -50%) scale(2.5);
            opacity: 0;
          }
        }

        .marker-container:hover .marker-pin {
          transform: translate(-50%, -50%) scale(1.2);
          background: #2563eb;
          box-shadow: 0 0 15px rgba(37, 99, 235, 0.7);
        }

        #map {
          height: 60vh;
          width: 100%;
          border-radius: 1rem;
          overflow: hidden;
          position: relative;
          z-index: 1;
          opacity: 0;
          transform: scale(0.98);
          transition: all 0.8s ease-out;
        }

        #map.map-loaded {
          opacity: 1;
          transform: scale(1);
        }

        .leaflet-container {
          height: 100%;
          width: 100%;
        }
      `}</style>
      <div id="map" className="relative z-10 w-full h-full" />
    </motion.div>
  );
};

export default MapComponent;
