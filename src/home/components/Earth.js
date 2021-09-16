import React, { useEffect, useRef, useState } from 'react';
import Globe from 'react-globe.gl';

import * as THREE from 'three';

import SliderNavigation from './SliderNavigation';

import './Earth.css';

const Earth = props => {

	let globeLng = 0;

    const globeEl = useRef();

    const onScroll = (direction, callback) => {
    	let counter = 0;
    	let animation = setInterval(() => {
    		if(counter === 90 || counter === -90){
    			globeLng += 90*direction;
    			counter = 0;
    			callback(direction);
    			clearInterval(animation);
    		}
    		counter+=5*direction;
    		globeEl.current.pointOfView({lat: 5, lng: globeLng+counter, altitude: 2.5});
    	}, 20);
    }

    useEffect(() => {
		  globeEl.current.pointOfView({lat: 5, lng: 0, altitude: 2.5});
    }, []);

		console.log("PROPS", props);

  	const tilesData = props.weather.map(item => { return{
  												lat: parseFloat(item.latt_long.split(",")[0]),
  												lng: parseFloat(item.latt_long.split(",")[1]),
  												material: new THREE.MeshLambertMaterial({
  																							map: new THREE.TextureLoader().load(`imgs/${item.consolidated_weather[0].weather_state_abbr}.png`),
  																							opacity: "1",
  																							transparent: true
  																						})
  											}});

    console.log(tilesData);

		const labelsData = props.weather.map(item => {
			return {
				text: `${item.title.normalize("NFD").replace(/[\u0300-\u036f]/g, "")} \nMax: ${item.consolidated_weather[0].max_temp.toFixed(2)}°C \nMin: ${item.consolidated_weather[0].min_temp.toFixed(2)}°C`,
				lat: parseFloat(item.latt_long.split(",")[0])-7,
				lng: parseFloat(item.latt_long.split(",")[1])
			}
		});

	return(
		<>
		<SliderNavigation onScroll={onScroll}/>
		<div className="earth">
			<Globe ref={globeEl} backgroundColor="rgba(0, 0, 0, 0)" globeImageUrl="mercator.jpg" width="20vw" pointOfView={{lat: 90, lng: 0, altitude: 2.5}}
			 tilesData={tilesData}
			tileMaterial="material"
			labelsData={labelsData}
			labelSize={1.8}
      		tileWidth={10}
      		tileHeight = {10}
      		tileAltitude = {0.025}
       		/>
		</div>
		</>
	);
};

export default Earth;


/*



*/
