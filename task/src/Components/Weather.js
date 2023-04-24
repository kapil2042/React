import React, { useEffect, useState } from 'react'

function Weather() {
    const [currentWether, setCurrentWether] = useState([])
    const [currentCityWether, setCurrentCityWether] = useState({})
    const[wCity,setWCity]=useState([])
    const [search, setSearch] = useState()
    const fetchWeather = (city) => {
        fetch(`http://api.weatherapi.com/v1/current.json?key=4a018692a1f54a9babe175257231202&q=${city}&aqi=no`)
            .then(response => {
                return response.json()
            })
            .then(data => {
                setCurrentWether([...currentWether,data])
            })
    }
    const fetchCurrentWeather = async() => {
     const currentWeather= await fetch(`http://api.weatherapi.com/v1/current.json?key=4a018692a1f54a9babe175257231202&q=Ahmedabad&aqi=no`)
            .then(response => {
                return response.json()
            })
            .then(data => {
                setCurrentCityWether(data)
            })
    }

    useEffect(()=>{
        fetchCurrentWeather()
        const localData=localStorage.getItem('cities')
        const data=JSON.parse(localData)
        data && setWCity(data)
    },[])

    useEffect(()=>{
        return ()=>{
            wCity && localStorage.setItem('cities',JSON.stringify(wCity))
        }
    },[wCity])

    useEffect(()=>{
        return ()=>{
            setWCity([...wCity,search])
        }        
    },[search])

    useEffect(()=>{
        wCity.map((item)=>{
            fetchCurrentWeather(item)
        })
    },[search])
    
    const handelSearach = (e)=>{
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
            {currentWether.length>0 ?
                currentWether.slice(currentWether.length < 5? 0:currentWether.length-5,currentWether.length).map((item,key)=>{
                    return(
                    <div className='border p-3'>
                        <p>Location : {currentWether?.location?.name}</p>
                        <p>State : {currentWether?.location?.region}</p>
                        <p>Country : {currentWether?.location?.country}</p>
                        <p>TEMPERATURE : {currentWether?.current?.temp_c} 'c</p>
                        <p>HUMIDITY : {currentWether?.current?.humidity}</p>
                        <p>WIND SPEED : {currentWether?.current?.wind_kph} km/h</p>
                        <p>PRESSURE : {currentWether?.current?.pressure_mb} mb</p>
                    </div>
                     )
                }):""
            } 
        </div>
    )
}

export default Weather