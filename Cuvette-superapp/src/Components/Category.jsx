import React, { useContext, useEffect, useState } from 'react';
import { RxCross1 } from "react-icons/rx";
import { IoIosWarning } from "react-icons/io";
import Selectcategory from './Selectcategory';
import { Context } from '../Context/Slecetedcategory';
import { useNavigate } from 'react-router-dom';

const Category = () => {
    const { category } = useContext(Context);
    const [Error, setError] = useState(false);
    const navigate = useNavigate();
    const hidden = (name) => {
        console.log(name)
        alert(`Can't deselect ${name} now`)
    };

    const nextPage = () => {
        if (category.length < 3) {
            // console.log(category)
            setError(true)
        } else {
            setError(false)
            navigate('/dashboard')
        }
    }
    // console.log(category)

    return (
        <div className='w-full min-h-screen bg-zinc-900 pb-6'>
            <div className='grid lg:grid-cols-2 p-5'>
                <div className='text-white md:p-16'>
                    <div>
                        <h1 className='font-mono text-emerald-600 text-5xl md:mb-2 md:pt-20'>Super app</h1>
                        <h1 className='sm:text-6xl text-3xl font-bold md:pt-6 pt-2 mb-4'>Choose your entertainment category</h1>
                    </div>
                    <div className='md:pt-12 pt-2 flex gap-2 flex-wrap md:mb-6 mb-4'>
                        {category.map((item, idx) => (
                            <h1 key={idx} className={`bg-emerald-500 w-fit p-2 px-4 flex items-center justify-center gap-2 rounded-full`}>
                                {item}
                                <RxCross1 onClick={() => hidden(item)} size={15} className='text-black font-bold' />
                            </h1>
                        ))}
                    </div>
                    <div>
                        <h1 className={`text-yellow-600 text-md font-bold flex items-center gap-1 ${category.length === 0 ? "block" : "hidden"}`}>
                            <IoIosWarning size={18} /> Remember One's you selected then you can deselect
                        </h1>
                    </div>
                    <div>
                        <h1 className={`text-red-600 text-md font-bold flex items-center gap-1 ${Error ? "block" : "hidden"}`}>
                            <IoIosWarning size={18} /> Minimum 3 categories required
                        </h1>
                    </div>
                </div>
                <div className='text-white md:p-16  flex flex-wrap items-start md:gap-4 gap-8'>
                    <Selectcategory />
                </div>
            </div>
            <div className='flex justify-end px-32 items-end'>
                <button onClick={nextPage} className='text-white bg-emerald-700 p-2 px-6 rounded-full hover:bg-emerald-800'>
                    Next
                </button>
            </div>
        </div>
    );
};

export default Category;
