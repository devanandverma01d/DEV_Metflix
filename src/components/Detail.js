import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import ReactStars from 'react-stars'
import { db } from '../firebase/Firebase';
import { doc, getDoc } from 'firebase/firestore';
import { ThreeCircles } from 'react-loader-spinner';
import Review from './Review';

const Detail = () => {
  const{id}=useParams();
  const[data,setData]=useState({
    image:"",
    title:"",
    year:"",
    desc:"",
    rating:0,
    rated:0,
  })
  const[loading,setLoading]=useState(false)
  
  useEffect(()=>{
    async function getaData(){
      setLoading(true)
      const _doc = doc(db,"movies",id)
      const _data = await getDoc(_doc)
      setData(_data.data())
      setLoading(false)
    }
    getaData()
  },[])
  return (
    <div className='p-4 mt-5 flex justify-center w-full flex-col md:flex-row md:items-start'>
    { 
      loading ? <div className='flex justify-center items-center h-96 w-full'><ThreeCircles color='white' height={40}/></div>:
        <>
          <img className='h-96 md:sticky top-24' src={data.image} alt="" />
          <div className=' md:ml-4 ml-0 w-full md:w-1/2'>
            <h1 className='text-gray-50 text-3xl font-bold'>{data.title} <span className='text-xl'>({data.year})</span></h1>
            <ReactStars className='ml-2'
                value={data.rating/data.rated}
                edit={false}
                size={20}
                half={true}
              />
            <p className='mt-2'>{data.desc}</p>
            <Review id={id} prevRating={data.rating} userRated={data.rated}/>
          </div>
        </>
    }
    </div>
  )
}

export default Detail