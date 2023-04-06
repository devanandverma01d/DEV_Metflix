import React, { useContext, useState } from 'react'
import { TailSpin } from 'react-loader-spinner'
import { Link, useNavigate } from 'react-router-dom';
import swal from 'sweetalert';
import { usersRef } from '../firebase/Firebase';
import { getDocs, query, where } from 'firebase/firestore';
import { Appstate } from '../App';
import bcrypt from 'bcryptjs';

const Login = () => {
    const navigate= useNavigate()
    const useAppState=useContext(Appstate)
    const[form,setForm] = useState({
    mobile:"",
    password:"",
    });
    const[loading,setLoading]=useState(false)
    let login=async()=>{
        setLoading(true)
        
        try {
            const quer = query(usersRef,where('mobile','==',form.mobile));
            const querySnapshot = await getDocs(quer);
            querySnapshot.forEach((doc)=>{
                const _data = doc.data();
                const isUser= bcrypt.compareSync(form.password, _data.password); 
                if(isUser){
                    useAppState.setLogin(true);
                    useAppState.setUserName(_data.name);
                    swal({
                        title:"logged In",
                        icon:"success",
                        buttons:"Ok",
                        timer:"3000"
                    });
                    navigate('/');
                }
                
                
            })
            
        } catch (error) {
            swal({
                title:"Error",
                icon:"error",
                buttons:"false",
                timer:"3000"
            });
        }
        setLoading(false);
    }
  return (
    <div className='w-full flex flex-col mt-10 items-center'>
        <h1 className='text-2xl font-bold'>Login</h1>
        <div className="p-2 w-full md:w-1/3">
            <div className="relative">
                <label htmlFor="link" className="leading-7 text-sm text-white">Mobile No. :</label>
                <input id="link" name="mobile" value={form.mobile} onChange={(e)=>setForm({...form,mobile:e.target.value})} className="w-full rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
            </div>
        </div>
        <div className="p-2 w-full md:w-1/3">
            <div className="relative">
                <label htmlFor="link" className="leading-7 text-sm text-white">Password :</label>
                <input id="link" name="password" value={form.password} onChange={(e)=>setForm({...form,password:e.target.value})} className="w-full rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
            </div>
        </div>
        <div className="p-2 w-full">
            <button onClick={login} className="flex mx-auto text-white bg-green-500 border-0 py-2 px-8 focus:outline-none hover:bg-green-600 rounded text-lg">
            {loading ? <TailSpin height={25} color='white'/> : "Login"}
            </button>
        </div>
        <div className=''>
            <p>Don't have an account ? <Link to="/signup"><span className='text-blue-500 cursor-pointer'>Sign Up</span></Link></p>
        </div>
    </div>
  )
}

export default Login;