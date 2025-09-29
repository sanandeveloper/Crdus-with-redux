import React from 'react'
import { useSelector } from 'react-redux'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Login from '../Login'
import SignUp from '../SignUp'
import LogoutBtn from './LogoutBtn'

function Header() {
    const navigate = useNavigate()
    const location = useLocation()
    const allUser = useSelector((state) => state.app.user)
    const authStatus=useSelector(state=>state.app.status)
    console.log('authstatus=>',authStatus)

    const navItem = [
        {
            name:'Home',
            path:'/',
            active: true

        },
        {
            path: '/allpost',
            name: 'All Post',
            all: <span className="bg-white text-cyan-600 rounded-full px-2 py-0.5 text-sm font-medium">({allUser?.length || 0})</span>,
             active: true
        },
        {
            path: '/addpost',
            name: 'Add Post',
             active: authStatus
        }
    ]

    return (
        <div className="bg-cyan-600 shadow-md">
            <div className="container mx-auto px-4 py-4">
                <nav className="flex justify-center items-center gap-8">
                    {navItem.map((item, index) => item.active && (
                        <div 
                            key={index}
                            className={`flex items-center gap-2 px-3 py-2 rounded-md transition-colors cursor-pointer ${
                                location.pathname === item.path 
                                    ? 'bg-cyan-700 shadow-inner' 
                                    : 'hover:bg-cyan-500'
                            }`}
                            onClick={() => navigate(item.path)}
                        >
                            <span className={`font-medium ${
                                location.pathname === item.path 
                                    ? 'text-white' 
                                    : 'text-white'
                            }`}>
                                {item.name}
                            </span>
                            {item.all && item.all}
                        </div>
                    ))}
                     { !authStatus && <button className='text-white font-medium cursor-pointer hover:bg-blue-300 px-3 py-2 rounded-md' onClick={()=>navigate('/login') }>Login</button>}
                     {!authStatus && <button className='text-white font-medium cursor-pointer hover:bg-blue-300 px-3 py-2 rounded-md' onClick={()=>navigate('/signup')}>SignUp</button>}
                     {authStatus && <LogoutBtn/>}
                </nav>

            

                
                

            </div>
        </div>
    )
}

export default Header