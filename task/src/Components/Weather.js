import React, { useEffect, useState } from 'react'

function Weather() {
    const [currentWether, setCurrentWether] = useState([])
    const [currentCityWether, setCurrentCityWether] = useState({})
    const [wCity, setWCity] = useState(localStorage.getItem('cities') == 'null' ? [] : JSON.parse(localStorage.getItem('cities')))
    const [search, setSearch] = useState()
    const fetchWeather = async (city) => {
        const cc = await fetch(`http://api.weatherapi.com/v1/current.json?key=4a018692a1f54a9babe175257231202&q=${city}&aqi=no`)
            .then(response => {
                return response.json()
            })
            .then(data => {
                setCurrentWether([...currentWether, data])
            })
    }
    const fetchCurrentWeather = async () => {
        const c = await fetch(`http://api.weatherapi.com/v1/current.json?key=4a018692a1f54a9babe175257231202&q=Ahmedabad&aqi=no`)
            .then(response => {
                return response.json()
            })
            .then(data => {
                setCurrentCityWether(data)
            })
    }

    useEffect(() => {
        fetchCurrentWeather()
    }, [])

    useEffect(() => {
        localStorage.setItem('cities', JSON.stringify(wCity))
        wCity && setWCity([...wCity, search])
    }, [search])

    useEffect(() => {
        wCity && wCity.map(async (item) => {
            item && await fetchWeather(item)
        })
        console.log(wCity)
        console.log(currentWether)
    }, [wCity])

    const handelSearach = (e) => {
        e.preventDefault();
        setSearch(e.target.searchbar.value);
    }
    return (
        <div className='m-5'>
            {currentCityWether !== null && (
                <div className='border p-3'>
                    <p>Location : {currentCityWether?.location?.name}</p>
                    <p>State : {currentCityWether?.location?.region}</p>
                    <p>Country : {currentCityWether?.location?.country}</p>
                    <p>TEMPERATURE : {currentCityWether?.current?.temp_c} 'c</p>
                    <p>HUMIDITY : {currentCityWether?.current?.humidity}</p>
                    <p>WIND SPEED : {currentCityWether?.current?.wind_kph} km/h</p>
                    <p>PRESSURE : {currentCityWether?.current?.pressure_mb} mb</p>
                </div>
            )}
            <form className='mt-3' onSubmit={handelSearach}>
                <input type='text' id='searchbar' name='searchbar' className='form-control' placeholder='Search city...' />
                <button type='submit' className='btn btn-primary mt-3'>Search</button>
            </form>
            {currentWether.length > 0 ?
                currentWether.slice(currentWether.length < 5 ? 0 : currentWether.length - 5, currentWether.length).map((item, key) => {
                    return (
                        <div className='border p-3 mt-3' key={key}>
                            <p>Location : {item?.location?.name}</p>
                            <p>State : {item?.location?.region}</p>
                            <p>Country : {item?.location?.country}</p>
                            <p>TEMPERATURE : {item?.current?.temp_c} 'c</p>
                            <p>HUMIDITY : {item?.current?.humidity}</p>
                            <p>WIND SPEED : {item?.current?.wind_kph} km/h</p>
                            <p>PRESSURE : {item?.current?.pressure_mb} mb</p>
                        </div>
                    )
                }) : ""
            }
        </div>
    )
}

export default Weather