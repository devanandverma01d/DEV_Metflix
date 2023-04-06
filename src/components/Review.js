import React, { useContext, useEffect, useState } from 'react';
import ReactStars from 'react-stars';
import { reviewsRef,db } from '../firebase/Firebase'
import {addDoc,doc,updateDoc,query,where,getDocs} from 'firebase/firestore';
import { TailSpin,ThreeDots } from 'react-loader-spinner';
import swal from 'sweetalert';
import { Appstate } from '../App';
import { useNavigate } from 'react-router-dom';
const Review = ({id,prevRating,userRated}) => {
  //1. Hooks area
  const useAppState=useContext(Appstate);
  const navigate=useNavigate();
  const[rating,setRating]=useState();
  const[loading,setLoading]=useState(false);
  const[reviewsLoading,setReviewsLoading]=useState(false);
  const[form,setForm]=useState('');
  const[data,setData]=useState([]);
  const[newAdded,setNewAdded]=useState(0);
//2. Function definition area
const sendReview = async()=>{
  setLoading(true)
  
  try {
    if(useAppState.login){
      await addDoc(reviewsRef,{
        movieid:id,
        name:useAppState.userName,
        rate:rating,
        thought:form,
        timestamp:new Date().getTime(),
      })
      const ref = doc(db,'movies',id);
      await updateDoc(ref,{
        rating:prevRating+rating,
        rated:userRated+1,
      })
      setRating(0);
      setForm("");
      setNewAdded(newAdded+1);
      swal({
        title:"Review Sent",
        icon:"Success",
        button:"Ok",
        timer:"3000"
    })
  }else{
    navigate('/login')
  }
    
  } catch (error) {
    swal({
      title:error.message,
      icon:"Error",
      button:"Ok",
      timer:"3000"
  }) 
  }
  setLoading(false)
}

useEffect(()=>{
  async function getData(){
    setReviewsLoading(true)
    setData([])
    const quer = query(reviewsRef,where('movieid','==',id))
    const querySnapshot = await getDocs(quer)
    querySnapshot.forEach((doc)=>{
      setData((prev)=>[...prev,doc.data()])
    })
    setReviewsLoading(false)
  }
  getData()
},[newAdded])
  return (
    <div className='mt-4 w-full border-t-2 border-gray-700'>
      <ReactStars className='ml-2'
        size={25}
        value={rating}
        half={true}
        onChange={(rate)=>setRating(rate)}
      />
      <input type="text" placeholder='Share your thoughts......' value={form} onChange={(e)=>setForm(e.target.value)} className="w-full bg-gray-800  outline-none text-white py-2 px-3 " />
      <button onClick={sendReview} className='bg-green-600 w-full p-2 flex justify-center'>
        { loading ? <TailSpin height={25} color='white'/> :'Share'}
      </button>
      {
        reviewsLoading ? <div className='flex justify-center mt-10'><ThreeDots height={10} color='white' /></div>:
        <div>
          {
            data.map((e,i)=>{
              return(
                <div key={i} className='bg-gray-900 p-3 mt-2 w-full border-b-2 border-gray-600'>
                  <div className='flex items-center justify-between'>
                    <p>{e.name}</p>
                    <p className='text-xs'>{new Date(e.timestamp).toLocaleString()}</p>
                  </div>
                  <ReactStars
                    size={15}
                    value={e.rate}
                    half={true}
                    edit={false}
                  />
                  <p>{e.thought}</p>
                </div>
                
              )
            })
          }
        </div>
      }
    </div>
  )
}

export default Review;