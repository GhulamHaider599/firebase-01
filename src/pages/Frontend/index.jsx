import React from 'react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import { Route, Routes } from 'react-router-dom'
import Home from './Home'

const Frontend = () => {
  return (
    <>
    <Header/>

    <Routes>
        <Route path='/' element={<Home/>} />
    </Routes>

    <Footer/>
    </>
  )
}

export default Frontend