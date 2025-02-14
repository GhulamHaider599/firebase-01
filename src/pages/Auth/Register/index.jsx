import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Button, Col, Form, Input, Row, Typography } from 'antd'
import { auth, firestore } from '../../../config/firebase'
import '../../../config/global'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { addDoc, collection, doc, setDoc } from 'firebase/firestore'

const { Title } = Typography

const initialState = { firstName: '', lastName: '', email: '', password: '', confirmPassword: '' }

const Register = () => {
  const [state, setState] = useState(initialState)
  const [isProcessing, setIsProcessing] = useState(false)

  const handleChange = (e) => {
    setState(s => ({ ...s, [e.target.name]: e.target.value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    
    
    let { firstName, lastName, email, password, confirmPassword } = state
    firstName = firstName.trim()
    lastName = lastName.trim()

    const fullName = (firstName + " " + lastName).trim()
    
    if(firstName.length < 3) { return window.notify("Please enter  your first name correctly", "error")}
    if(confirmPassword !== password) { return window.notify("Password doesn't match", "error")}
    // const userData = { firstName, lastName, email, password, confirmPassword }
    const userData = { firstName, lastName, fullName,  email }
    setIsProcessing(true)

    // =====================================Firebase Integration=========================
    
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        
        const user = userCredential.user;
      console.log('user',user)
      createDocument({...userData, uid: user.uid})
      })
      .catch((error) => {
        window.notify("Something went wrong while creating the user", "error")
       console.error(error)
       setIsProcessing(false)
      });





  }
  // =========================Firebase Database mean add user data in firebase store=================
  const createDocument =async (userData) => {
const user = {...userData}
    console.log('userData', userData)

// ---------------this try and catch is from firebase documentation--------------await in try is work until code in it is not executed for using it we make the function async
    try {
      // const docRef = await addDoc(collection(firestore, "users"), userData);
      await setDoc(doc(firestore, "users", user.uid), user);
      


      // console.log("Document written with ID: ", docRef.id);
      window.notify("User profile created successfully", "success")
    } catch (e) {
      window.notify("Error creating user profile", "error")

      console.error("Error adding document: ", e);
    } finally{

      setIsProcessing(false)
    }
    


   
  }


  return (
    <main className='auth p-3 p-lg-4'>
      <div className="card p-3 p-lg-4">
        <Title level={1} className='text-primary mb-5 text-center'> Register</Title>
        <Form layout='vertical'>
          <Row gutter={16}>
            <Col xs={24} md={12}>
              <Form.Item label="First Name" required>
                <Input type='text' size='large' name='firstName' placeholder='Enter your first Name' onChange={handleChange} />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item label="Last Name" >
                <Input type='text' size='large' name='lastName' placeholder='Enter your last Name' onChange={handleChange} />
              </Form.Item>
            </Col>
            <Col span={24} >
              <Form.Item label="Email" required >
                <Input type='email' size='large' name='email' placeholder='Enter your email' onChange={handleChange} />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item label="Password" required>
                <Input.Password size='large' name='password' placeholder='Enter your password' onChange={handleChange} />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item label="Confirm Password" required>
                <Input.Password size='large' name='confirmPassword' placeholder='Enter your password again' onChange={handleChange} />
              </Form.Item>
            </Col>
            <Col span={24}>

              <Button type='primary' size='large' block htmlType='submit' loading={isProcessing} onClick={handleSubmit}>Register</Button>
              <p className='mt-4'>If Already Register <Link to='/auth/login'>Click here</Link> </p>
            </Col>
          </Row>
        </Form>

      </div>

    </main>
  )
}

export default Register