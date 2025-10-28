
import React, { useState, useEffect } from 'react';
import { GoogleMap, useJsApiLoader, DrawingManager } from '@react-google-maps/api';
import * as turf from '@turf/turf';
import MetricsDisplay from './MetricsDisplay';
const libraries = ['drawing'];

const mapContainerStyle = {
    width: '100%',
    height: '100vh'
};

const center = {
    lat: 20.5937,
    lng: 78.9629
};

function MapComponent() {
    const { isLoaded, loadError } = useJsApiLoader({
        googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
        libraries
    });
    const [map, setMap] = useState(null);

    const [drawnPolygonData, setDrawnPolygonData] = useState({
        GeoJSON: null,
        area: null,
        perimeter: null
    });

    const MapLoad = useCallback((mapInstance) => {
        setMap(mapInstance);
    }, []);

    const onPolygonComplete = (polygon) => {
        const path = polygon.getPath().getArray(); // Convert Google Maps LatLng objects to a GeoJSON-compatible array of [lng, lat]
        const coordinates = path.map((latLng) => [latLng.lng(), latLng.lat()]);// Close the polygon loop for valid GeoJSON
        coordinates.push(coordinates[0]);

        const geoJsonPolygon = {
            type: 'Polygon',
            coordinates: [coordinates],
    };
    const turfPolygon = turf.polygon(geoJsonPolygon.coordinates);
    const area = turf.area(turfPolygon);
    const perimeter = turf.length(turf.lineString(coordinates), { units: 'meters' });
    setDrawnPolygonData({
        GeoJSON: geoJsonPolygon,
        area: calculatedArea,
        perimeter: calculatedPerimeter
    });
    polygon.setMap(null); // Remove the drawn polygon from the map
    };
    if (loadError) return <div>Error loading maps</div>;
    if (!isLoaded) return <div>Loading Maps</div>;
    return (
        <div>
            <GoogleMap
            mapContainerStyle={mapContainerStyle}
            zoom={5}
            center={center}
            onLoad={onMapLoad}
            >
                <DrawingManager
                    onPolygonComplete={onPolygonComplete}
                    options={{
                        drawingControl: true,
                        drawingControlOptions: {
                            position: window.google.maps.ControlPosition.TOP_CENTER,
                            drawingModes: [window.google.maps.drawing.DrawingMode.POLYGON],
                        },
                        polygonOptions: {
                            fillColor: '#FF0000',
                            fillOpacity: 0.3,
                            strokeWeight: 2,
                            strokeColor: '#FF0000',
                            clickable: false,
                            editable: true,
                            zIndex: 1,
                        },
                    }}
        />
            
            </GoogleMap>
        </div>
        
    )
}

export default MapComponent