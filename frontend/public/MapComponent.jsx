
import React, { useState, useEffect } from 'react';
import { GoogleMap, useJsApiLoader, DrawingManager } from '@react-google-maps/api';

const libraries = ['drawing'];

const MapcontainerStyle={
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
    const MapLoad = useCallback((mapInstance) => {
        setMap(mapInstance);
    }, []);
    const onPolygonComplete = (polygon) => {
        // Handle the completed polygon here
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