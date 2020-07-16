import React, { useState, useEffect } from 'react';
import ReactMapGL, { Marker } from 'react-map-gl';

import { listLogEntries } from './API';

const App = () => {

  const [logEntries, setLogEntries] = useState([]);

  const [viewport, setViewport] = useState({
    width: '100vw',
    height: '100vh',
    latitude: 51.98333,
    longitude: -0.18333,
    zoom: 5
  });

  useEffect(() => {
    (async () => {
      const logEntries = await listLogEntries();
      setLogEntries(logEntries);
      console.log(logEntries);
    })();
  }, []);

  return (
    <ReactMapGL
      {...viewport}
      mapStyle="mapbox://styles/markyy975/ckcp7w64d07e11il96g29fqcb"
      mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
      onViewportChange={nextViewport => setViewport(nextViewport)}
    >
      {logEntries.map(entry => (
        <Marker
          key={entry._id}
          latitude={entry.latitude} 
          longitude={entry.longitude}
          offsetLeft={-20}
          offsetTop={-10}>
          <svg 
            viewBox="0 0 24 24" 
            width="32" 
            height="32" 
            stroke="yellow" 
            strokeWidth="1.5" 
            fill="none" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            className="css-i6dzq1">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
              <circle cx="12" cy="10" r="3"></circle>
          </svg> 
        </Marker>
      ))}
    </ReactMapGL>
  );
}

export default App;
