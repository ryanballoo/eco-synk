import React from 'react';
import { Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import {
  Box,
  VStack,
  HStack,
  Text,
  Badge,
  Button,
  Avatar,
  Stat,
  StatLabel,
  StatNumber,
  Icon,
} from '@chakra-ui/react';
import {
  FiMapPin,
  FiCalendar,
  FiUsers,
  FiDollarSign,
  FiArrowRight,
} from 'react-icons/fi';
import { formatDistance } from '../../utils/distanceCalculator';

// Custom marker icons for different campaign priorities
const createMarkerIcon = (priority, isSelected = false) => {
  const colors = {
    high: '#E53E3E',    // red
    medium: '#DD6B20',  // orange  
    low: '#3182CE',     // blue
    completed: '#38A169' // green
  };

  const color = colors[priority] || colors.low;
  const size = isSelected ? 35 : 25;

  return L.divIcon({
    html: `
      <div style="
        width: ${size}px;
        height: ${size}px;
        background-color: ${color};
        border: 3px solid white;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 2px 8px rgba(0,0,0,0.3);
        transition: all 0.3s ease;
        transform: ${isSelected ? 'scale(1.2)' : 'scale(1)'};
      ">
        <div style="
          color: white;
          font-size: ${size > 30 ? '14px' : '12px'};
          font-weight: bold;
        ">
          ${priority === 'completed' ? '✓' : '!'}
        </div>
      </div>
    `,
    className: 'custom-marker',
    iconSize: [size, size],
    iconAnchor: [size/2, size],
    popupAnchor: [0, -size]
  });
};

const CampaignMarker = ({ 
  campaign, 
  onSelect, 
  onJoin, 
  onViewDetails, 
  isSelected = false,
  userLocation 
}) => {
  // Determine priority based on volunteer ratio and urgency
  const getPriority = (campaign) => {
    if (campaign.status === 'completed') return 'completed';
    
    const volunteerRatio = campaign.volunteers.length / campaign.volunteerGoal;
    const daysUntilEvent = Math.ceil(
      (new Date(campaign.date) - new Date()) / (1000 * 60 * 60 * 24)
    );
    
    if (daysUntilEvent <= 3 || volunteerRatio < 0.3) return 'high';
    if (daysUntilEvent <= 7 || volunteerRatio < 0.6) return 'medium';
    return 'low';
  };

  const priority = getPriority(campaign);
  const icon = createMarkerIcon(priority, isSelected);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getPriorityColor = (priority) => {
    const colors = {
      high: 'red',
      medium: 'orange',
      low: 'blue',
      completed: 'green'
    };
    return colors[priority];
  };

  const getPriorityLabel = (priority) => {
    const labels = {
      high: 'Urgent',
      medium: 'Medium',
      low: 'Low Priority',
      completed: 'Completed'
    };
    return labels[priority];
  };

  return (
    <Marker
      position={[campaign.location.lat, campaign.location.lng]}
      icon={icon}
      eventHandlers={{
        click: () => onSelect && onSelect(campaign),
        mouseover: (e) => {
          e.target.openPopup();
        }
      }}
    >
      <Popup
        closeButton={false}
        className="custom-popup"
        maxWidth={320}
        minWidth={280}
      >
        <Box p={0} maxW="300px">
          <VStack spacing={3} align="stretch">
            {/* Header */}
            <HStack justify="space-between" align="start">
              <VStack align="start" spacing={1} flex={1}>
                <Text fontWeight="bold" fontSize="md" lineHeight="short">
                  {campaign.title}
                </Text>
                <HStack spacing={2}>
                  <Badge 
                    colorScheme={getPriorityColor(priority)} 
                    variant="solid" 
                    size="sm"
                  >
                    {getPriorityLabel(priority)}
                  </Badge>
                  <Text fontSize="sm" color="gray.600">
                    {campaign.difficulty}
                  </Text>
                </HStack>
              </VStack>
              <Text fontSize="2xl">{campaign.image}</Text>
            </HStack>

            {/* Organizer */}
            <HStack spacing={3}>
              <Avatar size="sm" name={campaign.organizer.name} />
              <VStack align="start" spacing={0}>
                <Text fontSize="sm" fontWeight="semibold">
                  {campaign.organizer.name}
                </Text>
                <Text fontSize="xs" color="gray.600">
                  Organizer
                </Text>
              </VStack>
            </HStack>

            {/* Key Info */}
            <VStack spacing={2} align="stretch">
              <HStack spacing={2} fontSize="sm">
                <Icon as={FiMapPin} color="gray.500" />
                <VStack align="start" spacing={0} flex={1}>
                  <Text>{campaign.location.address}</Text>
                  {userLocation && campaign.distance && (
                    <Text fontSize="xs" color="brand.600" fontWeight="semibold">
                      {formatDistance(campaign.distance)}
                    </Text>
                  )}
                </VStack>
              </HStack>

              <HStack spacing={2} fontSize="sm">
                <Icon as={FiCalendar} color="gray.500" />
                <Text>{formatDate(campaign.date)}</Text>
              </HStack>
            </VStack>

            {/* Quick Stats */}
            <HStack spacing={4}>
              <Stat textAlign="center" size="sm">
                <StatNumber fontSize="lg" color="blue.600">
                  {campaign.volunteers.length}
                </StatNumber>
                <StatLabel fontSize="xs">
                  of {campaign.volunteerGoal} volunteers
                </StatLabel>
              </Stat>
              
              <Stat textAlign="center" size="sm">
                <StatNumber fontSize="lg" color="green.600">
                  AED {(campaign.funding.current / 1000).toFixed(1)}K
                </StatNumber>
                <StatLabel fontSize="xs">
                  of {(campaign.funding.goal / 1000).toFixed(1)}K funded
                </StatLabel>
              </Stat>
            </HStack>

            {/* Action Buttons */}
            <HStack spacing={2}>
              <Button
                size="sm"
                variant="outline"
                leftIcon={<FiArrowRight />}
                onClick={() => onViewDetails && onViewDetails(campaign)}
                flex={1}
              >
                View Details
              </Button>
              {campaign.status === 'active' && (
                <Button
                  size="sm"
                  colorScheme="brand"
                  onClick={() => onJoin && onJoin(campaign)}
                  flex={1}
                >
                  Join Campaign
                </Button>
              )}
            </HStack>
          </VStack>
        </Box>
      </Popup>
    </Marker>
  );
};

export default CampaignMarker;