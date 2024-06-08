import { useState } from 'react'  
import './App.css'
import Navbar from './components/Navbar'
import { Outlet } from 'react-router-dom'
import Home from './components/Home'
import Lenis from '@studio-freight/lenis'
import Footer from './components/Footer'

function App() {
  const lenis = new Lenis()

  lenis.on('scroll', (e) => {
  })
  
  function raf(time) {
    lenis.raf(time)
    requestAnimationFrame(raf)
  }
  
  requestAnimationFrame(raf)
  return (
    <>
      <Navbar/>
      <Outlet/>
      <Footer/>
    </>
  )
}

export default App
