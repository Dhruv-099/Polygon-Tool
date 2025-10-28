import React from 'react';

function MetricsDisplay({area, perimeter}){
    if (area == null){
        return <div>No polygon drawn</div>;
    }
    return(
        <div className="metrics-display">
            <h2>Polygon Metrics</h2>
            <p>
            <strong>Area:</strong> {area.toFixed(2)} square meters
            </p>
            <p>
                <strong>Perimeter:</strong> {perimeter.toFixed(2)} meters
            </p>
        </div>
    );
}
export default MetricsDisplay;