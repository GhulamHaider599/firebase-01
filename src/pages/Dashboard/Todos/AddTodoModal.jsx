import React, { useState } from "react";
import { Modal, Input, Button, Form } from "antd";
import { firestore } from "../../../config/firebase";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";

// ----------------------------------------------------------------
import {  Col, Row } from 'antd'
import '../../../config/global'
import { useAuthContext } from '../../../contexts/Auth'

const initialState = { title: '', location: '', dueDate: '', description: '' }

const AddTodoModal = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const {user} =  useAuthContext()
  const [state, setState] = useState(initialState)
  const [isProcessing, setIsProcessing] = useState(false)


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
    <>
      <Button type="primary" onClick={() => setIsModalVisible(true)}>
        Add Todo
      </Button>
      <Modal
        title="Add Todo"
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
      
        <Form  layout="vertical" >
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

            <Col span={24}>
              <Button type='primary' size='large' block htmlType='submit' loading={isProcessing} onClick={handleSubmit}>Add</Button>
            </Col>
            
          </Row>
        </Form>


      </Modal>
    </>
  );
};

export default AddTodoModal;
