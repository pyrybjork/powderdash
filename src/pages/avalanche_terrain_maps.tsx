import React from "react";
import "./avalanche_terrain_maps.css";

import keimiö from '../img/avalanche_terrain_maps/keimiö.png'
import lommoltunturi from '../img/avalanche_terrain_maps/lommoltunturi.png'
import pallastunturi_1 from '../img/avalanche_terrain_maps/pallastunturi1.png'
import pallastunturi_2 from '../img/avalanche_terrain_maps/pallastunturi2.png'
import pyhätunturi from '../img/avalanche_terrain_maps/pyhätunturi.png'
import luosto from '../img/avalanche_terrain_maps/luosto.png'
import perheluosto from '../img/avalanche_terrain_maps/perheluosto.png'

const AvalancheTerrainMaps: React.FunctionComponent = () => {
  return (
    <div className="avalanche_terrain_maps">
        <h3 id="keimiö">Keimiö</h3>
        <img className="map_image" src={keimiö} alt="keimiö" />

        <h3 id="lommoltunturi">Lommoltunturi</h3>
        <img className="map_image" src={lommoltunturi} alt="lommoltunturi" />

        <h3 id="pallastunturi_1">Pallastunturi 1/2</h3>
        <img className="map_image" src={pallastunturi_1} alt="pallastunturi 1/2" />

        <h3 id="pallastunturi_2">Pallastunturi 2/2</h3>
        <img className="map_image" src={pallastunturi_2} alt="pallastunturi 2/2" />

        <h3 id="pyhätunturi">Pyhätunturi</h3>
        <img className="map_image" src={pyhätunturi} alt="pyhätunturi" />

        <h3 id="luosto">Luosto</h3>
        <img className="map_image" src={luosto} alt="luosto" />

        <h3 id="perheluosto">Perheluosto</h3>
        <img className="map_image" src={perheluosto} alt="perheluosto" />
    </div>  
  );
};

export default AvalancheTerrainMaps;