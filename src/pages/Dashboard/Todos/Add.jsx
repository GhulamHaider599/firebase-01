import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button, Col, Form, Input, Row, Typography } from 'antd'
import { auth, firestore } from '../../../config/firebase'
import '../../../config/global'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { doc, serverTimestamp, setDoc } from 'firebase/firestore'
import { useAuthContext } from '../../../contexts/Auth'

const { Title } = Typography

const initialState = { title: '', location: '', dueDate: '', description: '' }

const Add = () => {

  const {user} =  useAuthContext()
  const [state, setState] = useState(initialState)
  const [isProcessing, setIsProcessing] = useState(false)

  const navigate = useNavigate()

  const handleChange = (e) => {
    setState(s => ({ ...s, [e.target.name]: e.target.value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()



    let { title, location, dueDate, description } = state
    title = title.trim()
    location = location.trim()



    if (title.length < 3) { return window.notify("Please enter  your title correctly", "error") }
    const todo = {uid:user.uid, id: window.getRandomId(), title, location, description,dueDate, status: "incompleted", createdAt: serverTimestamp() }
    setIsProcessing(true)
    createDocument(todo)



  }
  // =========================Firebase Database mean add user data in firebase store=================
  const createDocument = async (todo) => {
    // const user = { ...formData }
    // console.log('formData', formData)

    try {
      await setDoc(doc(firestore, "todos", todo.id), todo);
      window.notify("Todo created successfully", "success")
      setState(initialState)
    } catch (e) {
      window.notify("Error while creating todo", "error")

      console.error("Error adding document: ", e);
    } finally {

      setIsProcessing(false)
    }
  }


  return (
    <main className='auth p-3 p-lg-4'>
      <div className="card p-3 p-lg-4">
        <Title level={1} className='text-primary mb-5 text-center'> Add Todo</Title>
        <Form layout='vertical'>
          <Row gutter={16}>
            <Col xs={24} >
              <Form.Item label="Title" required>
                <Input type='text' size='large' name='title' placeholder='Enter todo title' value={state.title} onChange={handleChange} />
              </Form.Item>
            </Col>

            <Col xs={24} md={12} >
              <Form.Item label="Location" required   >
                <Input type='text' size='large' name='location' placeholder='Enter todo location' value={state.location} onChange={handleChange} />
              </Form.Item>
            </Col>
            <Col xs={24} md={12} >
              <Form.Item label="Due Date" required  >
                <Input type='datetime-local' size='large' name='dueDate' placeholder='Enter Due Date' value={state.dueDate} onChange={handleChange} />
              </Form.Item>
            </Col>
            <Col span={24} >
              <Form.Item label="Description" required  >
                <Input.TextArea size='large' name='description' placeholder='Enter todo description' value={state.description} style={{ minHeight: 150, resize: "none" }} onChange={handleChange} />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Button type='primary' size='large' block htmlType='submit' loading={isProcessing} onClick={handleSubmit}>Add</Button>
            </Col>
            <Col span={12}>
              <Button type='primary' size='large' block onClick={() => { navigate("/dashboard/todos/all") }}>All Todos</Button>
            </Col>
          </Row>
        </Form>

      </div>

    </main>
  )
}

export default Add




