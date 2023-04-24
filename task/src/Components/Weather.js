import React, { useEffect, useState } from 'react'

function Weather() {
    const [currentWether, setCurrentWether] = useState({})
    const [search, setSearch] = useState("Ahmedabad")
    const fetchCurrentWeather = (city) => {
        fetch(`http://api.weatherapi.com/v1/current.json?key=4a018692a1f54a9babe175257231202&q=${city}&aqi=no`)
            .then(response => {
                return response.json()
            })
            .then(data => {
                setCurrentWether(data)
            })
    }
    // useEffect(() => {
    //     fetchCurrentWeather(search)
    // }, { currentWether })
    
    const handelSearach = (e)=>{
        e.preventDefault();
        setSearch(e.target.searchbar.value);
        fetchCurrentWeather(search);
    }
    return (
        <div className='m-5'>
            {currentWether !== null && (
                <div className='border p-3'>
                    <p>Location : {currentWether.location.name}</p>
                    <p>State : {currentWether.location.region}</p>
                    <p>Country : {currentWether.location.country}</p>
                    <p>TEMPERATURE : {currentWether.current.temp_c} 'c</p>
                    <p>HUMIDITY : {currentWether.current.humidity}</p>
                    <p>WIND SPEED : {currentWether.current.wind_kph} km/h</p>
                    <p>PRESSURE : {currentWether.current.pressure_mb} mb</p>
                </div>
            )}
            <form className='mt-3' onSubmit={handelSearach}>
                <input type='text' id='searchbar' name='searchbar' className='form-control' placeholder='Search city...' />
                <button type='submit' className='btn btn-primary mt-3'>Search</button>
            </form>
        </div>
    )
}

export default Weather