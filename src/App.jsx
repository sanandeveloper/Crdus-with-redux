import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Header from './Header/Header'
import Allpost from './Allpost'
import Addpost from './Addpost'
import { Outlet } from 'react-router-dom'

function App() {
 

  return (
    <>
    <Header/>
    <main>
      <Outlet/>
    </main>
    </>
  )
}

export default App
