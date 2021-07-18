import React from 'react'
import { MapContainer, TileLayer} from 'react-leaflet';

import 'leaflet/dist/leaflet.css';

import "./Map.css";
import {showDataOnMap} from "./util";


function Map({countries,casesType,center,zoom}) {
 console.log(">>>>>",countries);
    return (
        <div className="map">

        <MapContainer className="map__container" 
             center={center} 
             zoom={zoom} 
             scrollWheelZoom={false}>
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
         
          {showDataOnMap(countries,casesType)};
         </MapContainer>
      </div>
    )
}

export default Map;










