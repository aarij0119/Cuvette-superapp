import React, { useContext, useState } from 'react'
import { RxCross1 } from "react-icons/rx";
import { MdOutlineModeEditOutline } from "react-icons/md";
import { Context } from '../Context/Slecetedcategory';
import Profileimg from '../assets/images/profile.png'

const Header = () => {
    const { category,user } = useContext(Context);
    const [isEdit,setIsedit] = useState(false);
    
    const NoteHandler = () => {
        setIsedit(prevState => !prevState)
        console.log(isEdit)
    }
    const handleBlur = () => {
        setIsedit(false); 
        };
    
    return (
        <div>
            <div className='grid md:grid-cols-2 gap-2'>
                <div className='bg-blue-700 p-10 flex gap-6 rounded-3xl'>
                    {/* profile image */}
                    <div>
                        <div className='w-32  rounded-full overflow-hidden'>
                            <img className='w-full h-full object-cover ' src={Profileimg} alt="Profile_Image" />
                        </div>
                    </div>
                    <div id='username'>
                        <div>
                            <h4 className='text-white text-2xl mb-4'>
                                {user?.name}
                            </h4>
                            <h4 className='text-white text-2xl mb-4'>
                                {user?.email}
                            </h4>
                            <h4 className='text-white text-2xl'>
                                {user?.username}
                            </h4>
                        </div>
                        {/* Selected Categories */}
                        <div className='pt-5 flex  gap-2 flex-wrap'>
                            {category.map((items,idx) => (
                                <h1 key={idx} className='bg-emerald-500 w-fit p-1 px-4 flex items-center justify-center gap-2 rounded-full'>{items} <RxCross1 size={15} className='text-black font-bold' />
                                </h1>
                            ))}
                        </div>
                    </div>
                </div>
                <div className='bg-yellow-500 rounded-3xl md:p-3 p-10 relative'>
                    <h1 className='text-2xl'>All Notes</h1>
                    <div onClick={NoteHandler} className='absolute bottom-2 right-6 bg-black text-white p-2 rounded-full'>
                        <MdOutlineModeEditOutline size={24} />
                    </div>
                    <textarea 
                    className={`w-full h-[80%] bg-transparent resize-none`} class="placeholder-black resize-none w-full h-[80%] bg-transparent outline-none"
                    disabled={!isEdit} id="">
                    </textarea>
                </div>
            </div>
        </div>
    )
}

export default Header