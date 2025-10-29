import React from 'react';
import MapComponent from './components/MapComponent';
import PolygonList from './Components/PolygonList';
import './App.css';

function App() {
  return (
    <div className="app-container">
      <div className="sidebar">
        <PolygonList />
      </div>
      <div className="map-area">
        <MapComponent />
      </div>
    </div>
  );
}

export default App;