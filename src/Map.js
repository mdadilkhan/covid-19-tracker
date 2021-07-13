import React from 'react'

import { MapContainer, TileLayer} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import "./Map.css";


function Map({center,zoom}) {

  console.log("location",center)
  console.log("zoom",zoom)

    return (
        <div className="map">
          <MapContainer
             className="map__container"
              center={center}
              zoom={zoom}
             >
          <TileLayer
             url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
             attribution='© <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          />
       </MapContainer>
      </div>
    )
}

export default Map;










