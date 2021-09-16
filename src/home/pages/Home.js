import React, { useState } from 'react';

import SliderNavigation from '../components/SliderNavigation';
import EarthContainer from '../components/EarthContainer';

import './Home.css';

const Home = () => {

	return(
		<>
		<div className="home__content">
			<div className="home__earth-background"></div>
			<EarthContainer/>
			<div className="home__left-section"><span>This is just a <b>portfolio project</b></span></div>
			<div className="home__divider"></div>
			<div className="home__right-section"><span>This globe shows the weather in real time, you can spin it by scrolling the page. This concept could be use for a landing page i.e. showing the location of every employee in the company.</span><br/><button>I'm a cool button</button></div>
		</div>
		</>
	);
};

export default Home;
