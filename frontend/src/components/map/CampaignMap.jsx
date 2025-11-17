import React, { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Circle, useMap, Marker } from 'react-leaflet';
import { Box } from '@chakra-ui/react';
import L from 'leaflet';
import CampaignMarker from './CampaignMarker';
import 'leaflet/dist/leaflet.css';

// Fix for default markers in react-leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Component to update map view when props change
const MapUpdater = ({ center, zoom, campaigns, fitBounds }) => {
  const map = useMap();

  useEffect(() => {
    if (fitBounds && campaigns.length > 0) {
      // Calculate bounds to fit all campaigns
      const group = new L.featureGroup(
        campaigns.map(campaign => 
          L.marker([campaign.location.lat, campaign.location.lng])
        )
      );
      
      // Add user location to bounds if available
      if (center && center.lat && center.lng) {
        group.addLayer(L.marker([center.lat, center.lng]));
      }
      
      map.fitBounds(group.getBounds().pad(0.1));
    } else if (center) {
      map.setView([center.lat, center.lng], zoom);
    }
  }, [map, center, zoom, campaigns, fitBounds]);

  return null;
};

// User location marker component
const UserLocationMarker = ({ userLocation }) => {
  if (!userLocation || !userLocation.lat || !userLocation.lng) return null;

  const userIcon = L.divIcon({
    html: `
      <div style="
        width: 16px;
        height: 16px;
        background-color: #3182CE;
        border: 3px solid white;
        border-radius: 50%;
        box-shadow: 0 2px 8px rgba(0,0,0,0.3);
        animation: pulse 2s infinite;
      "></div>
      <style>
        @keyframes pulse {
          0% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.2); opacity: 0.7; }
          100% { transform: scale(1); opacity: 1; }
        }
      </style>
    `,
    className: 'user-location-marker',
    iconSize: [16, 16],
    iconAnchor: [8, 8]
  });

  return (
    <>
      {/* User location marker */}
      <Marker
        position={[userLocation.lat, userLocation.lng]}
        icon={userIcon}
      />
      
      {/* Accuracy circle */}
      {userLocation.accuracy && (
        <Circle
          center={[userLocation.lat, userLocation.lng]}
          radius={userLocation.accuracy}
          pathOptions={{
            color: '#3182CE',
            fillColor: '#3182CE',
            fillOpacity: 0.1,
            weight: 1,
            opacity: 0.3
          }}
        />
      )}
    </>
  );
};

const CampaignMap = ({
  campaigns = [],
  selectedCampaign = null,
  userLocation = null,
  onCampaignSelect,
  onCampaignJoin,
  onCampaignView,
  center = { lat: 25.2048, lng: 55.2708 }, // Dubai center
  zoom = 11,
  height = '100%',
  fitBounds = false
}) => {
  const mapRef = useRef(null);

  // Custom map styles for better mobile experience
  const mapStyle = {
    height,
    width: '100%',
    borderRadius: '0',
    position: 'relative'
  };

  return (
    <Box position="relative" height={height}>
      <MapContainer
        ref={mapRef}
        center={[center.lat, center.lng]}
        zoom={zoom}
        style={mapStyle}
        zoomControl={false} // We'll add custom controls
        attributionControl={false}
        scrollWheelZoom={true}
        doubleClickZoom={true}
        dragging={true}
        touchZoom={true}
        tap={false} // Disable tap to prevent conflicts on mobile
      >
        {/* OpenStreetMap tiles - 100% free */}
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          maxZoom={19}
          subdomains={['a', 'b', 'c']}
        />

        {/* Map updater component */}
        <MapUpdater 
          center={center} 
          zoom={zoom} 
          campaigns={campaigns}
          fitBounds={fitBounds}
        />

        {/* User location marker and accuracy circle */}
        <UserLocationMarker userLocation={userLocation} />

        {/* Campaign markers */}
        {campaigns.map((campaign) => (
          <CampaignMarker
            key={campaign.id}
            campaign={campaign}
            isSelected={selectedCampaign?.id === campaign.id}
            userLocation={userLocation}
            onSelect={onCampaignSelect}
            onJoin={onCampaignJoin}
            onViewDetails={onCampaignView}
          />
        ))}
      </MapContainer>

      {/* Custom zoom controls */}
      <Box
        position="absolute"
        bottom="20px"
        left="20px"
        zIndex={1000}
      >
        <Box
          bg="white"
          borderRadius="lg"
          boxShadow="md"
          overflow="hidden"
        >
          <button
            onClick={() => mapRef.current?.setZoom(mapRef.current.getZoom() + 1)}
            style={{
              display: 'block',
              width: '40px',
              height: '40px',
              background: 'white',
              border: 'none',
              borderBottom: '1px solid #e2e8f0',
              cursor: 'pointer',
              fontSize: '18px',
              fontWeight: 'bold'
            }}
          >
            +
          </button>
          <button
            onClick={() => mapRef.current?.setZoom(mapRef.current.getZoom() - 1)}
            style={{
              display: 'block',
              width: '40px',
              height: '40px',
              background: 'white',
              border: 'none',
              cursor: 'pointer',
              fontSize: '18px',
              fontWeight: 'bold'
            }}
          >
            −
          </button>
        </Box>
      </Box>

      {/* Custom attribution */}
      <Box
        position="absolute"
        bottom="8px"
        right="8px"
        zIndex={1000}
        bg="white"
        px={2}
        py={1}
        borderRadius="md"
        fontSize="xs"
        color="gray.600"
        boxShadow="sm"
      >
        © OpenStreetMap
      </Box>
    </Box>
  );
};

export default CampaignMap;