import React, { useState, useRef, useEffect } from 'react';
import EnergyForm from './components/EnergyForm';
import Recommendations from './components/Recommendations';
import MapComponent from './components/Map';
import './App.css';
import sampleImage from './assets/house-logo.jpg'; // Adjust the path to your image

const App = () => {
  const [recommendations, setRecommendations] = useState(null);
  const [location, setLocation] = useState(null);
  const [zoomLevel, setZoomLevel] = useState(19);
  const recommendationsRef = useRef(null);

  const scrollToRecommendations = () => {
    if (recommendationsRef.current) {
      recommendationsRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    if (recommendations) {
      scrollToRecommendations();
    }
  }, [recommendations]);

  return (
    <div>
      <h1>GreenHack Energy Optimization</h1>
      <div className="flex-container">
        <EnergyForm
          setRecommendations={setRecommendations}
          setLocation={setLocation}
          setZoomLevel={setZoomLevel}
        />
        <div className="image-container">
          <img src={sampleImage} alt="Sample" />
        </div>
      </div>
      <div className="main-content" ref={recommendationsRef}>
        {recommendations && (
          <div className="recommendations">
            <Recommendations data={recommendations} />
          </div>
        )}
        {location && (
          <div className="map-container">
            <MapComponent location={location} zoomLevel={zoomLevel} />
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
