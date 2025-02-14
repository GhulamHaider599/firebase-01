import React from 'react'
import { Link } from 'react-router-dom'
import { useAuthContext } from '../../contexts/Auth'
import { Button, Space } from 'antd';

const Navbar = () => {

  const { isAuth, handleLogout} = useAuthContext();

  console.log('isAuth', isAuth)

  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-light bg-primary navbar-dark">
        <div className="container">
          <Link to='/' className="navbar-brand" >React App</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link to='' className="nav-link"  >Home</Link>
              </li>
              <li className="nav-item">
                <Link to='/about' className="nav-link" >About</Link>
              </li>
              <li className="nav-item">
                <Link to='/contact' className="nav-link" >Contact</Link>
              </li>

            </ul>
            <div className="d-flex">
              {!isAuth
              ? <Space>
                 <Link to='/auth/login' className="btn btn-success" >Login</Link>
                 <Link to='/auth/register' className="btn btn-info" >Register</Link>

              </Space>
                :
                <Space>
                  <Link to='/dashboard/todos/add' className="btn btn-info" >Dashboard</Link>
                  <button  className="btn btn-danger " onClick={handleLogout} >Logout</button>
                </Space>
              }
            </div>
          </div>
        </div>
      </nav>
    </header>
  )
}

export default Navbar