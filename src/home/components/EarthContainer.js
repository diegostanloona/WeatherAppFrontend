import React, { useState, useEffect } from 'react';

import { useHttpClient } from '../../shared/hooks/http-hook';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';

import Earth from './Earth';

const EarthContainer = props => {
    const { isLoading, error, sendRequest, clearError } = useHttpClient();

    const [weather, setWeather] = useState([]);

    useEffect(() => {
    	const fetchUsers = async () => {
    		try {
    			const responseData = await sendRequest(`https://almondine-half-fowl.glitch.me/weather`, 'GET', null, {});
    			setWeather(responseData.weather);
    		} catch(e) {
    			console.log(e);
    		}

    	};
    	fetchUsers();
    }, []);

    return(
    	<>
    	{!isLoading && weather &&
    		<Earth weather={weather}/>
    	}
    	{isLoading &&
    		<LoadingSpinner asOverlay/>
    	}
    	</>
    );
};

export default EarthContainer;
