import React, { useContext } from 'react'
import AddIcon from '@mui/icons-material/Add';
import { Link } from 'react-router-dom';
import { Appstate } from '../App';
const Header = () => {
  const useAppstate=useContext(Appstate)
  return (
    <div className=' sticky z-10 header top-0 text-3xl font-bold p-3 text-red-500 border-b-2 border-gray-500 flex justify-between items-center'>
      <Link to='/'><span>DEV_Met<span className='text-white'>flix</span></span></Link>
      {useAppstate.login ?
      <Link to='/addmovies'>
        <h1 className='text-lg flex items-center text-red-500 cursor-pointer'>
          <button className='bg-slate-600 rounded-lg p-2'><AddIcon className='mr-1'/>Add New</button>
        </h1>
      </Link>
      :
      <Link to='/login'>
        <h1 className='text-lg flex items-center text-red-500 cursor-pointer'>
          <button className='bg-green-600 rounded-lg p-2 w-full'>Login</button>
        </h1>
      </Link>
      }
    </div>
  )
}

export default Header