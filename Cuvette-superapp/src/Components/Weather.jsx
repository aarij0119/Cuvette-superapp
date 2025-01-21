import React, { useEffect, useState } from 'react';

const Weather = () => {
    const [weatherData, setWeatherData] = useState({
        locationName: 'Chandigarh',
        country: '',
        localTime: '',
        sunrise: '',
        sunset: '',
        moonrise: '',
        moonset: '',
        temperature: '',
        wind: '',
        condition: '',
        icon: ''
    });

    const [UserLocation, setUserLocation] = useState('');

    const currentDateTime = new Date();
    const time = `${currentDateTime.getHours() % 12}:${currentDateTime.getMinutes().toString().padStart(2, '0')}`;
    const formattedDate = `${currentDateTime.getDate()}/${currentDateTime.getMonth() + 1}/${currentDateTime.getFullYear()}`;

    const getData = async () => {
        const location = UserLocation || 'Chandigarh';
        const response = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=dd9cff0a39ae438485d130545251601&q=${location}&days=1&alerts=no&aqi=no`);
        const data = await response.json();
        // console.log("Data is", data);
        const localTime = data.location.localtime.split(' ')[1];

        setWeatherData({
            locationName: data.location.name,
            country: data.location.country,
            localTime: localTime,
            sunrise: data.forecast.forecastday[0].astro.sunrise,
            sunset: data.forecast.forecastday[0].astro.sunset,
            moonrise: data.forecast.forecastday[0].astro.moonrise,
            moonset: data.forecast.forecastday[0].astro.moonset,
            temperature: data.current.temp_c,
            wind: data.current.wind_dir,
            condition: data.current.condition.text,
            icon: data.current.condition.icon
        });
    };

    useEffect(() => {
        getData();
    }, []);

    const LocationHandler = async () => {
        const response = await fetch(`http://api.weatherapi.com/v1/search.json?key=dd9cff0a39ae438485d130545251601&q=${UserLocation}`);
        const data = await response.json();
        if (data.length === 0) {
            alert("Please write correct name");
            setUserLocation('');
        } else {
            getData();
            setUserLocation('');
        }
    }


    return (
        <>
            <div className='grid md:grid-cols-2  gap-4'>
                <div className='bg-[#111744] rounded-xl overflow-hidden'>
                    <div className='p-3 bg-pink-500 flex justify-around'>
                        <h1 className='text-white text-lg'>{formattedDate}</h1>
                        <h1 className='text-white text-lg'>Time {time}</h1>
                    </div>
                    <div className='flex gap-3 justify-between flex-col sm:flex-row p-4'>
                        <div className='text-white text-lg'>
                            <ul>
                                <li className='text-base'>Location: {weatherData.locationName}</li>
                                <li className='flex items-center text-base'>
                                    <h4>Condition: {weatherData.condition}</h4>
                                    <img className='w-6' src={weatherData.icon} alt='Icon' />
                                </li>
                                <li className='text-base'>Country: {weatherData.country}</li>
                                <li className='text-base'>Time: {weatherData.localTime}</li>
                                <li className='text-base'>Sunrise: {weatherData.sunrise}</li>
                                <li className='text-base'>Sunset: {weatherData.sunset}</li>
                                <li className='text-base'>Moonrise: {weatherData.moonrise}</li>
                                <li className='text-base'>Moonset: {weatherData.moonset}</li>
                                <li className='text-base'>Temperature: {weatherData.temperature}°C</li>
                                <li className='text-base'>Wind Direction: {weatherData.wind}</li>
                            </ul>
                        </div>
                        <div className='text-white text-lg  sm:w-1/2'>
                            <input value={UserLocation} onChange={(e) => setUserLocation(e.target.value)} className='w-full outline-none bg-zinc-900 p-2 rounded-lg' type='text' placeholder='Find location state or country....' />
                            <button onClick={LocationHandler} className='block bg-pink-700 mt-2 px-6 rounded-xl py-1'>Find</button>
                        </div>
                    </div>
                </div>
                <div className='p-10 bg-white rounded-xl'>
                    <div className='w-full lg:h-[250px] rounded-3xl overflow-hidden mb-2'>
                        <img className='w-full h-full bg-cover' src='https://media.istockphoto.com/id/1159636118/photo/on-the-top-of-the-swiss-alps-mountain-range.jpg?s=612x612&w=0&k=20&c=gXOrKy3eXaPXHf2E8Bb7OZl_4oNxX4lvDIJ5wzYoTIU=' alt='' />
                    </div>
                    <div>
                        <p className='text-sm'>In the years since human beings first reached the summit of Mount Everest in 1953, climbing the world’s highest mountain has changed dramatically. Today, hundreds of mountaineers manage the feat each year thanks to improvements in knowledge, technology, and the significant infrastructure provided by commercially guided expeditions that provide a veritable highway up the mountain for those willing to accept both the......</p>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Weather;
