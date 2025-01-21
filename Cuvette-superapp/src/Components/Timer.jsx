import React, { useRef, useState } from 'react';
import { FaCaretUp, FaSortDown } from "react-icons/fa";

const Timer = () => {
    const [timer, setTimer] = useState({
        hours: '00',
        minutes: '00',
        seconds: '00'
    });

    const [isRunning, setIsRunning] = useState(false);
    const intervalRef = useRef(null);

    const IncreaseHour = () => {
        let currentHours = parseInt(timer.hours);
        currentHours += 1;
        const newHours = currentHours.toString().padStart(2, '0');
        setTimer({
            ...timer, hours: newHours
        });
    };

    const IncreaseMinutes = () => {
        let minutes = parseInt(timer.minutes);
        minutes += 1;
        const newMinutes = minutes.toString().padStart(2, '0');
        setTimer({
            ...timer, minutes: newMinutes
        });
    };

    const IncreaseSeconds = () => {
        let seconds = parseInt(timer.seconds);
        seconds += 1;
        const newSeconds = seconds.toString().padStart(2, '0');
        setTimer({
            ...timer, seconds: newSeconds
        });
    };

    const StartTimer = () => {
        if (!isRunning) {
            setIsRunning(true);
            intervalRef.current = setInterval(() => {
                setTimer(prevTimer => {
                    let { hours, minutes, seconds } = prevTimer;

                    if (parseInt(seconds) > 0) {
                        seconds = (parseInt(seconds) - 1).toString().padStart(2, '0');
                    } else if (parseInt(minutes) > 0) {
                        minutes = (parseInt(minutes) - 1).toString().padStart(2, '0');
                        seconds = '59';
                    } else if (parseInt(hours) > 0) {
                        hours = (parseInt(hours) - 1).toString().padStart(2, '0');
                        minutes = '59';
                        seconds = '59';
                    } else {
                        clearInterval(intervalRef.current);
                        setIsRunning(false);
                        return prevTimer;
                    }

                    return { hours, minutes, seconds };
                });
            }, 1000);
        }
    };

    return (
        <>
            <div className='bg-gray-800 p-8 flex md:flex-row flex-col gap-10 justify-around items-center lg:w-3/4 rounded-xl'>
                <div className='w-44 h-44 border-8 border-emerald-500 rounded-full flex items-center justify-center'>
                    <h1 className='text-white text-3xl'>{timer.hours}:{timer.minutes}:{timer.seconds}</h1>
                </div>
                <div className='flex justify-between items-center gap-7'>
                    <div className='flex flex-col items-center justify-center'>
                        <h1 className='text-white text-xl'>Hours</h1>
                        <h2 className='text-white' onClick={IncreaseHour}><FaCaretUp size={32} /></h2>
                        <h1 className='text-white text-xl'>{timer.hours}</h1>
                        <h2 className='text-white'><FaSortDown size={32} /></h2>
                    </div>
                    <div className='flex flex-col items-center justify-center' >
                        <h1 className='text-white text-xl'>Minutes</h1>
                        <h2 className='text-white' onClick={IncreaseMinutes}><FaCaretUp size={32} /></h2>
                        <h1 className='text-white text-xl'>{timer.minutes}</h1>
                        <h2 className='text-white'><FaSortDown size={32} /></h2>
                    </div>
                    <div className='flex flex-col items-center justify-center'>
                        <h1 className='text-white text-xl'>Seconds</h1>
                        <h2 className='text-white' onClick={IncreaseSeconds}><FaCaretUp size={32} /></h2>
                        <h1 className='text-white text-xl'>{timer.seconds}</h1>
                        <h2 className='text-white'><FaSortDown size={32} /></h2>
                    </div>
                </div>
                <button
                    onClick={StartTimer}
                    className={`w-full md:w-fit text-lg text-white ${!isRunning ? "bg-emerald-500" : "hidden"} px-5 py-1 rounded-3xl hover:bg-emerald-600`}
                    disabled={isRunning}
                >
                    Start
                </button>
            </div>
        </>
    );
}

export default Timer;
