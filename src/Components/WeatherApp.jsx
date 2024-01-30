import React, { useEffect, useState } from 'react'

import { MDBInput } from 'mdb-react-ui-kit';
import { MDBBtn } from 'mdb-react-ui-kit';

import axios from 'axios';

function WeatherApp() {

    const [city, setCity] = useState('');
    const [weather, setWeather] = useState(null);
    const [error, setError] = useState('');

    const keyAPI = '0ecde2a4ac395de72d8ac40c4e8e90ee';

    const fetchData = async () => {
        try {
            const result = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${keyAPI}`)
            console.log(result.data);
            setWeather(result.data);
            setError('');
        } catch (err) {
            setError('City not found. Please try again.');
            setWeather(null);
        }
    }

    // useEffect(() => {
    //     fetchData()
    // }, [])

    const buttonClick = (e) => {
        e.preventDefault();
        fetchData()
    }

    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };

    return (
        <div className='d-flex align-items-center justify-content-center' style={{ height: '100vh' }}>
            <div className='p-5 rounded-5' style={{ backgroundColor: "rgba(255,255,255,.5)" }}>
                <MDBInput className='bg-white' value={city} onChange={(e) => setCity(e.target.value)} label='Enter City Name' type='text' />

                <div className="text-center mt-4 mb-5">
                    <MDBBtn onClick={e => buttonClick(e)} className='me-1' color='success'>
                        Search
                    </MDBBtn>
                </div>
                <div className='text-center m-4'>
                    {error && <h4 style={{ color: 'red' }}>{error}</h4>}
                    <h4>{weather && weather.name ? weather.name + ", " + weather.sys.country : ""}</h4>
                    <h2 className='my-4'>{weather && weather.main ? Math.round(weather.main.temp - 273.15) : ""}<span className='text-danger'>{weather && weather.main ? " °Celsius" : ""}</span></h2>
                    <h4>{weather && weather.weather ? capitalizeFirstLetter(weather.weather[0].description) : ""}</h4>
                </div>
            </div>
        </div>
    )
}

export default WeatherApp