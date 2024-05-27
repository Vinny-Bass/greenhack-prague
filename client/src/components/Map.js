import React from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '100%'
};

const defaultCenter = {
  lat: -3.745,
  lng: -38.523
};

const MapComponent = ({ location, zoomLevel = 10 }) => {
  return (
    <LoadScript googleMapsApiKey="AIzaSyAPVgms3MqXRRBVI58oFsmtjPKH5JHWd48">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={location || defaultCenter}
        zoom={zoomLevel}
        mapTypeId="satellite"
      >
        {location && <Marker position={location} />}
      </GoogleMap>
    </LoadScript>
  );
};

export default MapComponent;
