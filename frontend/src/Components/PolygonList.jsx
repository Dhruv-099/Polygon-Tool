import React, {useState, useEffect} from "react";
import axios from "axios";

function PolygonList({ onPolygonSelect, refreshListTrigger }) {
    const [polygons, setPolygons] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPolygons = async () => {
            try {
                const response = await axios.get('http://localhost:8001/api/polygons/');
              // The GeoFeatureModelSerializer returns a GeoJSON FeatureCollection
                setPolygons(response.data.features);
            } catch (err) {
                setError('Failed to fetch polygons. Is the backend server running?');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchPolygons();
    }, [refreshListTrigger]); // Add refreshListTrigger to dependency array
    if (loading) return <p>Loading saved polygons...</p>;
    if (error) return <p style={{ color: 'red' }}>{error}</p>;
    return (
        <div className="polygon-list-container">
            <h2>Saved Polygons</h2>
            {polygons.length === 0 ? (
                <p>No polygons saved yet.</p>
            ) : (
                <ul>
                    {polygons.map((feature) => (
                    <li key={feature.properties.id} className="polygon-list-item">
                        <p><strong>ID:</strong> {feature.properties.id}</p>
                        <p><strong>Address:</strong> {feature.properties.address || 'N/A'}</p>
                        <p>
                        <strong>Area:</strong> 
                        {Number(feature.properties.area).toFixed(2)} m²
                        </p>
                        <button onClick={() => onPolygonSelect(feature)}>
                        View on Map
                        </button>
                    </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
export default PolygonList;