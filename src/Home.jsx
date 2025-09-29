import React from 'react'
import { useSelector } from 'react-redux'

function Home() {

  const authStatus=useSelector(state=>state.app.status)
  
  return (
    <div className='grid place-content-center h-130 '>
      <p className='text-3xl  inset-shadow-md shadow-2xl '>{authStatus ? 'Welcome' :'please login to add post'}</p>
   </div>
  )
}

export default Home