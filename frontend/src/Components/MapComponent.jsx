import React, { useState, useCallback, useEffect } from 'react';
import { GoogleMap, useJsApiLoader, DrawingManager, Polygon } from '@react-google-maps/api';
import * as turf from '@turf/turf';
import axios from 'axios';
import MetricsDisplay from './MetricsDisplay';

const libraries = ['drawing', 'geometry'];

const mapContainerStyle = {
    width: '100%',
    height: '100%',
};

const center = {
    lat: 20.5937,
    lng: 78.9629,
};

const displayedPolygonOptions = {
    fillColor: '#0000FF',
    fillOpacity: 0.35,
    strokeColor: '#0000FF',
    strokeWeight: 2,
    clickable: false,
    editable: false,
    zIndex: 1,
};

function MapComponent({ polygonToDisplay, triggerListRefresh }) {
    const { isLoaded, loadError } = useJsApiLoader({
    id: 'google-map-script', 
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries,
    });
    const [map, setMap] = useState(null);
    const [drawnPolygonData, setDrawnPolygonData] = useState({ geoJson: null, area: null, perimeter: null });
    const [apiStatus, setApiStatus] = useState({ loading: false, message: '' });
    const [displayedPolygonPath, setDisplayedPolygonPath] = useState(null);
    const onMapLoad = useCallback((mapInstance) => {
    setMap(mapInstance);
    }, []);

    const onPolygonComplete = useCallback((polygon) => {
    const path = polygon.getPath().getArray();
    const coordinates = path.map((latLng) => [latLng.lng(), latLng.lat()]);
    coordinates.push(coordinates[0]);

    const geoJsonPolygon = { type: 'Polygon', coordinates: [coordinates] };
    const turfPolygon = turf.polygon(geoJsonPolygon.coordinates);
    const calculatedArea = turf.area(turfPolygon);
    const calculatedPerimeter = turf.length(turfPolygon, { units: 'meters' });

    setDrawnPolygonData({ geoJson: geoJsonPolygon, area: calculatedArea, perimeter: calculatedPerimeter });
    polygon.setMap(null); // Remove the drawn polygon
    }, []);

    const handleSavePolygon = useCallback(async () => {
    if (!drawnPolygonData.geoJson) return alert('Please draw a polygon first!');
    setApiStatus({ loading: true, message: 'Saving...' });
    const payload = { type: 'Feature', geometry: drawnPolygonData.geoJson, properties: {} };
    try {
        const response = await axios.post('http://localhost:8001/api/polygons/', payload);
        setApiStatus({ loading: false, message: `Polygon saved! Address: ${response.data.properties.address || 'N/A'}` });
        setDrawnPolygonData({ geoJson: null, area: null, perimeter: null });
      triggerListRefresh(); // Trigger refresh of the polygon list
    } catch (error) {
        const errorMessage = error.response ? JSON.stringify(error.response.data) : error.message;
        setApiStatus({ loading: false, message: `Error: ${errorMessage}` });
    }
    }, [drawnPolygonData, triggerListRefresh]);

    useEffect(() => {
    if (polygonToDisplay && map) {
        const paths = polygonToDisplay.geometry.coordinates[0].map((coords) => ({ lat: coords[1], lng: coords[0] }));
      setDisplayedPolygonPath(paths); // Set the path for the <Polygon> component

      // Center and zoom the map
        const bounds = new window.google.maps.LatLngBounds();
        paths.forEach((path) => bounds.extend(path));
        map.fitBounds(bounds);
    }
}, [polygonToDisplay, map]);

    if (loadError) return <div>Error loading maps.</div>;
    if (!isLoaded) return <div>Loading Maps...</div>;

    const drawingOptions = {
    drawingControl: true,
    drawingControlOptions: {
        position: window.google.maps.ControlPosition.TOP_CENTER,
      drawingModes: [window.google.maps.drawing.OverlayType.POLYGON], // <-- THE KEY FIX
    },
    polygonOptions: {
        fillColor: '#FF0000',
        fillOpacity: 0.3,
        strokeWeight: 2,
        strokeColor: '#FF0000',
        editable: true,
    },
    };

    return (
    <>
        <div className="map-ui-container">
        <MetricsDisplay area={drawnPolygonData.area} perimeter={drawnPolygonData.perimeter} />
        <div className="save-container">
            <button onClick={handleSavePolygon} disabled={!drawnPolygonData.geoJson || apiStatus.loading}>
            {apiStatus.loading ? 'Saving...' : 'Save Drawn Polygon'}
        </button>
        {apiStatus.message && <p className="status-message">{apiStatus.message}</p>}
        </div>
        </div>
        <GoogleMap mapContainerStyle={mapContainerStyle} zoom={5} center={center} onLoad={onMapLoad}>
        <DrawingManager
            options={drawingOptions}
            onPolygonComplete={onPolygonComplete}
        />
        {displayedPolygonPath && (
            <Polygon
            paths={displayedPolygonPath}
            options={displayedPolygonOptions}
            />
        )}
        </GoogleMap>
    </>
);
}

export default React.memo(MapComponent);