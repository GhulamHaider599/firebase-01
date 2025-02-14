import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Frontend from './Frontend'
import Dashboard from './Dashboard'
import Auth from './Auth'
import { useAuthContext } from '../contexts/Auth'
import PrivateRoute from '../components/Header/PrivateRoute'
import Add from './Dashboard/Todos/Add'
import All from './Dashboard/Todos/All'

const Index = () => {

  const {isAuth} = useAuthContext()
  return (
    <>
    <Routes>
        <Route path='*' element={<Frontend/>} />
        <Route path='auth/*' element={!isAuth ? <Auth/> : <Navigate to='/' />}  />
        <Route path='dashboard/*' element={<PrivateRoute Components={Dashboard}/>} />
        
    </Routes>
    </>
  )
}

export default Index