import React, { useContext, useState } from 'react'
import { TailSpin } from 'react-loader-spinner';
import {addDoc} from 'firebase/firestore';
import { moviesRef } from '../firebase/Firebase';
import swal from 'sweetalert';
import { Appstate } from '../App';
import { useNavigate } from 'react-router-dom';
const AddMovies = () => {
    //1.Hooks Area
    const useAppState=useContext(Appstate);
    const navigate=useNavigate();
    const[form,setForm] = useState({
        title:"",
        year:"",
        desc:"",
        image:"", 
        rating:0,
        rated:0,
    });
    const[loading,setLoading] = useState(false);

    //2.Function definition area
    const addMovies = async()=>{
        setLoading(true)
        if(useAppState.login){
            await addDoc(moviesRef,form);
            swal({
                title:"Successfully Added",
                icon:"Success",
                button:"Ok",
                timer:"3000"
            })

            setLoading(false)
            setForm({
                title:"",
                year:"",
                desc:"",
                image:"",
            })
        }else{
            navigate('/login');
        }
    }
    
  return (
    <div>
        <section className="text-gray-600 body-font relative">
            <div className="container px-5 py-24 mx-auto">
                <div className="flex flex-col text-center w-full mb-12">
                    <h1 className="sm:text-3xl text-xl font-medium title-font mb-4 text-white">Add Movies</h1>
                </div>
                <div className="lg:w-1/2 md:w-2/3 mx-auto">
                    <div className="flex flex-wrap -m-2">
                        <div className="p-2 w-1/2">
                            <div className="relative">
                                <label htmlFor="name" className="leading-7 text-sm text-white">Title :</label>
                                <input type="text" id="name" name="name" value={form.title} onChange={(e)=>setForm({...form,title:e.target.value})} className="w-full rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                            </div>
                        </div>
                        <div className="p-2 w-1/2">
                            <div className="relative">
                                <label htmlFor="email" className="leading-7 text-sm text-white">Year :</label>
                                <input type="number" id="email" name="email" value={form.year} onChange={(e)=>setForm({...form,year:e.target.value})} className="w-full rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                            </div>
                        </div>
                        <div className="p-2 w-full">
                            <div className="relative">
                                <label htmlFor="link" className="leading-7 text-sm text-white">Image Link :</label>
                                <input id="link" name="link_image" value={form.image} onChange={(e)=>setForm({...form,image:e.target.value})} className="w-full rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                            </div>
                        </div>
                        <div className="p-2 w-full">
                            <div className="relative">
                                <label htmlFor="message" className="leading-7 text-sm text-white">Description :</label>
                                <textarea id="message" name="message" value={form.desc} onChange={(e)=>setForm({...form,desc:e.target.value})} className="w-full rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out" />
                            </div>
                        </div>
                        <div className="p-2 w-full">
                            <button onClick={addMovies} className="flex mx-auto text-white bg-green-500 border-0 py-2 px-8 focus:outline-none hover:bg-green-600 rounded text-lg">
                            {loading ? <TailSpin height={25} color='white'/> : "Submit"}
                            </button>
                        </div>
                        
                    </div>
                </div>
            </div>
       </section>

    </div>
  )
}

export default AddMovies;