import React, { useState, useEffect } from 'react';
import ReactMapGL, { Marker, Popup } from 'react-map-gl';

import { listLogEntries } from './API';
import LogEntryForm from './LogEntryForm';

const App = () => {

  const [logEntries, setLogEntries] = useState([]);
  const [showPopup, setShowPopup] = useState({});
  const [viewport, setViewport] = useState({
    width: '100vw',
    height: '100vh',
    latitude: 51.98333,
    longitude: -0.18333,
    zoom: 5
  });
  const [addEntryLocation, setAddEntryLocation] = useState(null);

  const getEntries = async () => {
    const logEntries = await listLogEntries();
    setLogEntries(logEntries);
  }

  useEffect(() => {
    getEntries();
  }, []);

  const showAddMarkerPopup = (event) => {
    const [longitude, latitude] = event.lngLat;
    setAddEntryLocation({
      latitude,
      longitude,
    })
  };

  return (
    <ReactMapGL
      {...viewport}
      mapStyle="mapbox://styles/markyy975/ckcp7w64d07e11il96g29fqcb"
      mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
      onViewportChange={nextViewport => setViewport(nextViewport)}
      onDblClick={showAddMarkerPopup}
    >
      {logEntries.map(entry => (
        <React.Fragment key={entry._id}>
          <Marker
            latitude={entry.latitude} 
            longitude={entry.longitude}
            >
              <div
                onClick={() => setShowPopup({
                  //...showPopup,
                  [entry._id]: true,
                  })}>               
                    <svg 
                      className="marker"
                      viewBox="0 0 24 24"
                      style = {{
                        width: `${8 * viewport.zoom}px`,
                        height: `${8 * viewport.zoom}px`,
                        maxHeight: `48px`,
                        maxWidth: `48px`
                      }}
                      stroke="yellow" 
                      strokeWidth="1.5" 
                      fill="none" 
                      strokeLinecap="round" 
                      strokeLinejoin="round">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                        <circle cx="12" cy="10" r="3"></circle>
                    </svg> 
              </div>
          </Marker>
          {
            showPopup[entry._id] ? (
              <Popup
                latitude={entry.latitude} 
                longitude={entry.longitude}
                closeButton={true}
                closeOnClick={true}
                dynamicPosition={true}
                onClose={() => setShowPopup({})}
                anchor="top" >
                <div className="popup">
                  <h3>{entry.title}</h3>
                  <p>{entry.comments}</p>
                  <p>Rating: {entry.rating}*</p>
                  <small>
                    Visited on: <i>{new Date(entry.visitDate).toLocaleDateString()}</i>
                  </small>
                  {entry.image ? <img src={entry.image} alt={entry.title}/> : null}
                </div>
              </Popup>
              ) : null
            }
          </React.Fragment>
      ))}
      {
        addEntryLocation ? (
          <>
          <Marker
            latitude={addEntryLocation.latitude} 
            longitude={addEntryLocation.longitude}
            >
              <div>
                <svg
                  className="marker"
                  viewBox="0 0 24 24"
                  style = {{
                    width: `${8 * viewport.zoom}px`,
                    height: `${8 * viewport.zoom}px`,
                    maxHeight: `48px`,
                    maxWidth: `48px`
                  }}
                  stroke="red" 
                  strokeWidth="1.5" 
                  fill="none" 
                  strokeLinecap="round" 
                  strokeLinejoin="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                </svg> 
              </div>
          </Marker>
          <Popup
            latitude={addEntryLocation.latitude} 
            longitude={addEntryLocation.longitude}
            closeButton={true}
            closeOnClick={false}
            dynamicPosition={true}
            onClose={() => setAddEntryLocation(null)}
            anchor="top" >
            <div className="popup">
              <LogEntryForm  onClose={() => {
                setAddEntryLocation(null);
                getEntries();
              }}
              location={addEntryLocation}/>
            </div>
          </Popup>
          </>
        ) : null
      }
    </ReactMapGL>
  );
}

export default App;
