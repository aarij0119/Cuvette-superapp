import React, { useContext, useEffect, useState } from 'react'
import {Context} from '../Context/Slecetedcategory'

    const Selectcategory = () => {
        const{category,selectCategory} = useContext(Context);
        const[newCat,SetnewCat] = useState([]);
        
        const bgColors = ['bg-red-700', 'bg-blue-700', 'bg-green-700', 'bg-yellow-700','bg-gray-700','bg-zinc-700','bg-pink-700'];
        const catogeryType = [{
            name: "Action",
            image: 'https://www.syfy.com/sites/syfy/files/2019/05/john-wick-2017-image-3840x2400.jpg'
        },
        {
            name: "Drama",
            image: 'https://types.blog/wp-content/uploads/2024/01/Types-of-Drama.jpeg'
        },
        {
            name: "Thriller",
            image: 'https://i1.sndcdn.com/artworks-M4bLJezGG5x3yyBy-ynf9zQ-t500x500.jpg'
        },
        {
            name: "Western",
            image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ01-ox7DQ3Dy0A4-U5sX713t9vUyfpcIhAiw&s'
        },
        {
            name: "Horror",
            image: 'https://static-assets.pratilipi.com/pratilipi/cover?pratilipiId=6755373542889637&version=61b58a7f-224b-4c23-9e0c-1c557c088d96'
        },
        {
            name: "fantasy",
            image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHSGvdyarRIV4BMvVuPQnztmxLRx0PcGr2oA&s'
        },
        {
            name: "Music",
            image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbgXQCN7H4XSLjrVDPKZU4zwjpA0UvvIeDUw&s'
        },
        {
            name: "Fiction",
            image: 'https://img.freepik.com/free-photo/open-book-concept-fairy-tale-fiction-storytelling_23-2150793737.jpg'
        },
        {
            name: "Romance",
            image: 'https://breakinginthehabit.org/wp-content/uploads/2016/11/romance-box-1b75442dcb3e05ccbc614455b5ac2670.jpg'
        },


        ]
        const ClickHandler = (idx, name) => {
            if (newCat.includes(name)) {
              return alert("can't select same category");
            }
            
            const updatedCategories = [...category, name];
            SetnewCat(updatedCategories);
            selectCategory(updatedCategories);
            localStorage.setItem('category', JSON.stringify(updatedCategories));
          }
          
        
        
        return (
            <>
            {catogeryType.map((items,idx)=>{
            const randomColor = bgColors[Math.floor(Math.random() * bgColors.length)];
            return   <div key={idx} className={`${randomColor} lg:w-48 md:w-44 w-full rounded-xl p-2 pb-4`} onClick={(e) => ClickHandler(idx,items.name)}>
                <h1 className='mb-1 font-bold text-lg'>{items.name}</h1>
                <div className='h-36'>
                    <img className='w-full h-full bg-cover rounded-xl' src={items.image} alt="" />
                </div>
            </div>
            })}  
            </>
        )
    }

    export default Selectcategory