import React, { useState } from 'react'
import { Button, Col, Form, Input, Row, Typography } from 'antd'
import { auth } from '../../../config/firebase'
import { sendPasswordResetEmail } from 'firebase/auth'
import { Link } from 'react-router-dom'

const { Title } = Typography

const initialState = { email: '' }

const ForgotPassword = () => {
  const [state, setState] = useState(initialState)
  const [isProcessing, setIsProcessing] = useState(false)

  const handleChange = (e) => {
    setState(s => ({ ...s, [e.target.name]: e.target.value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()




    let {  email } = state

    setIsProcessing(true)

    // =====================================Firebase Integration=========================
    
   sendPasswordResetEmail(auth, email)
      .then(() => {
        
    //     const user = userCredential.user;
    //     console.log('userCredential.user', userCredential.user)
    //   console.log('user',user)
      window.notify("Email sent Successfully", "success")

      })
      .catch((error) => {
        window.notify("Something went wrong while login the user", "error")

       console.error(error)
      })
      .finally(()=>{
        setIsProcessing(false)

      })

  }
 


  return (
    <main className='auth p-3 p-lg-4'>
      <div className="card p-3 p-lg-4">
        <Title level={1} className='text-primary mb-5 text-center'> Forgot Password</Title>
        <Form layout='vertical'>
          <Row gutter={16}>
            
            <Col span={24} >
              <Form.Item label="Email" required >
                <Input type='email' size='large' name='email' placeholder='Enter your email' onChange={handleChange} />
              </Form.Item>
            </Col>
           
           
            <Col span={24}>

              <Button type='primary' size='large' block htmlType='submit' loading={isProcessing} onClick={handleSubmit}>Forgot Password</Button>
              <p className='mt-4'>New user <Link to='/auth/register'>Click here</Link> </p>
                
            </Col>
          </Row>
        </Form>

      </div>

    </main>
  )
}

export default ForgotPassword