import React from 'react'
import { useDispatch } from 'react-redux'
import { logout } from '../store/userDeatils'
import { useNavigate } from 'react-router-dom'

function LogoutBtn() {

    const dispatch=useDispatch()
    const naviagte=useNavigate()

     const handleLogout=()=>{
       
        dispatch(logout())
        naviagte('/')
        

     }


  return (
    <div>

        <button className='text-white font-medium cursor-pointer hover:bg-blue-300 px-3 py-2 rounded-md' onClick={handleLogout}>Logout</button>
    </div>
  )
}

export default LogoutBtn