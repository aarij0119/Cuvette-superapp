import React from 'react'
import Header from './Header';
import Weather from './Weather';


import Timer from './Timer';



const Dashboard = () => {
    return (
        <>
            <div className='w-full min-h-screen bg-zinc-900'>
                <div className='flex  flex-col gap-3 p-5'>
                    <Header />
                    <Weather />
                    <Timer />
                </div>
            </div>
        </>
    )
}

export default Dashboard