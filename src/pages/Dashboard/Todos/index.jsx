import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Add from './Add'
import All from './All'


const Todos = () => {
  return (
    <>
      <Routes>
        <Route path='add' element={<Add/>} />
        <Route path='all' element={<All/>} />
        
        <Route path="*" element={<h1>Above Routes are not working ! Error</h1>} />
      </Routes>
      

    </>
  )
}

export default Todos