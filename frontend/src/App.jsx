import React from 'react';
import MapComponent from './components/MapComponent';
import PolygonList from './Components/PolygonList';
import './App.css';

function App() {
  const [polygonToDisplay, setPolygonToDisplay] = React.useState(null);
  const handlePolygonSelect = (polygonFeature) =>{
    setPolygonToDisplay(polygonFeature);
  }
  return (
    <div className="app-container">
      <div className="sidebar">
        <PolygonList onPolygonSelect={handlePolygonSelect} />
      </div>
      <div className="map-area">
        <MapComponent polygonToDisplay={polygonToDisplay} />
      </div>
    </div>
  );
}

export default App;