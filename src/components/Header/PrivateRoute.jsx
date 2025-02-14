import React from 'react'
import { useAuthContext } from '../../contexts/Auth'
import { Navigate } from 'react-router-dom'

const PrivateRoute = ({Components}) => {
    const {isAuth} = useAuthContext()
    if(!isAuth){
return <Navigate to='/auth/login'/>
    }
  return (
   <Components/>
  )
}

export default PrivateRoute