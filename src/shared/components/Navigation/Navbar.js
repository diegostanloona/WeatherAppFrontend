import React from 'react';

import { IconContext } from "react-icons";
import { HiMenuAlt4 } from "react-icons/hi";

import './Navbar.css';

const Navbar = () => {
	return(
		<div className="navbar">
			<div className="navbar__logo-container">
				<img src="logo.png" alt="Kings Crest Global Logo"/>
			</div>
			<div className="navbar__menu-container">
				<IconContext.Provider value={{ color: "#FFFFFF", size: "2.5em"}}>
					<HiMenuAlt4/>
				</IconContext.Provider>
			</div>
		</div>
	);
};

export default Navbar;
