import { getDocs } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { Dna } from 'react-loader-spinner'
import ReactStars from 'react-stars'
import { moviesRef } from '../firebase/Firebase'
import { Link } from 'react-router-dom'
const Cards = () => {
    const[data,setData]=useState([])
    const[loading,setLoading]=useState(true)
    useEffect(()=>{
        async function getData(){
            setLoading(true)
            const _data=await getDocs(moviesRef)
            //console.log(_data)
            _data.forEach((doc)=>{
                setData((prv)=>[...prv,{...(doc.data()),id: doc.id}])
            })
            setLoading(false)
        };
        getData();
    },[])
  return (
        <div className='flex flex-wrap justify-between mt-3 p-3'>
        { loading ?<div className=' w-full flex justify-center items-center h-96'><Dna visible={true} height="80" width="80" ariaLabel="dna-loading" wrapperStyle={{}} wrapperClass="dna-wrapper"/></div>:
            data.map((e,i)=>{
            return(
                <Link key={i}  to={`/detail/${e.id}`}>
                    <div className='card p-1 font-serif hover:-translate-y-2 cursor-pointer mt-5 transition-all duration-500'>
                        <img className='h-60 md:h-72' src={e.image} alt="" />
                        <span className='text-white'>{e.title}</span>
                        <h1>Year : {e.year}</h1>
                        <h1 className='flex items-center'>Rating :<ReactStars className='ml-2'
                            value={e.rating/e.rated}
                            edit={false}
                            size={20}
                            half={true}
                            />
                        </h1>
                    </div>
                </Link>
            ) 
        })
            
        }
        </div>
    
  )
}

export default Cards
