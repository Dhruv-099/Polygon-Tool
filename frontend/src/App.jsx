import React, { useState } from 'react';
import MapComponent from './Components/MapComponent.jsx';
import PolygonList from './Components/PolygonList';
import './App.css';

function App() {
  const [polygonToDisplay, setPolygonToDisplay] = useState(null);
  const [refreshListTrigger, setRefreshListTrigger] = useState(0);

  const handlePolygonSelect = (polygonFeature) =>{
    setPolygonToDisplay(polygonFeature);
  };

  const triggerListRefresh = () => {
    setRefreshListTrigger(prev => prev + 1);
  };

  return (
    <div className="app-container">
      <div className="sidebar">
        <PolygonList onPolygonSelect={handlePolygonSelect} refreshListTrigger={refreshListTrigger} />
      </div>
      <div className="map-area">
        <MapComponent polygonToDisplay={polygonToDisplay} triggerListRefresh={triggerListRefresh} />
      </div>
    </div>
  );
}

export default App;