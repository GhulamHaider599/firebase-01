// import { Button, Col, Row,Space,Typography } from 'antd'
// import React, { useState } from 'react'
// import { useAuthContext } from '../../../contexts/Auth'
// import { doc, setDoc } from 'firebase/firestore'
// import { firestore } from '../../../config/firebase'

// const {Title} = Typography

// const Home = () => {
//   const {user} = useAuthContext()


  
//   const [activeProcessing, setActiveProcessing] = useState(false)
//   const [inactiveProcessing, setInactiveProcessing] = useState(false)

//   // const [state, setState] = useState({firstName:"Junaid" , lastName: "Aslam" })

//   const handleUpdateProfile =async(status)=>{

//     // const {firstName, lastName} = state
//     // const updatedData = {firstName, lastName, status }
//     const updatedData =  {status }
//     {status==="active" ? setActiveProcessing(true) : setInactiveProcessing(true)}
//     // setActiveProcessing(true)
//     try {
//       await setDoc(doc(firestore, "users", user.uid),updatedData, {merge: true});
      
//       // in 2nd parameter we add new property which we want to add
//       //merge true merge the previous data with new data


//       window.notify("User profile updated successfully", "success")
//     } catch (e) {
//       window.notify("Error updating user profile", "error")

//       console.error("Error updating document: ", e);
//     } finally{
//       {status==="active" ? setActiveProcessing(false) : setInactiveProcessing(false)}
//       // setActiveProcessing(false)
//     }
    
//   }
//   return (
//     <main className='py-5'>
//     <div className="container">
//         <Row>
//             <Col span={24}>
//             <Title level={1} className='text-center ' >Home Page </Title>

//             <Title level={2} className='text-center ' >First Name: {user.firstName}</Title>
//             <Title level={2} className='text-center ' >Last Name: {user.lastName}</Title>
//             <Title level={2} className='text-center ' >Full Name: {user.fullName}</Title>
//             <Title level={2} className='text-center ' >Status: {user.status}</Title>
//             <Title level={2} className='text-center ' >Email: {user.email}</Title>
//             <Title level={2} className='text-center mb-0'>UID: {user.uid}</Title>
//             </Col>
//             <Col span={24} className='text-center mt-4'>
//             <Space>
//             <Button type='primary' loading={activeProcessing} onClick={()=>{handleUpdateProfile("active")}}>Update Profile Active</Button>
//             <Button type='primary'  loading={inactiveProcessing} onClick={()=>{handleUpdateProfile("inactive")}}>Update Profile Inactive</Button>

//             </Space>
//             </Col>


//         </Row>
//     </div>
    
//     </main>
//   )
// }

// export default Home




import { Button, Col, Row,Space,Typography } from 'antd'
import React, { useState } from 'react'
import { useAuthContext } from '../../../contexts/Auth'
import { doc, setDoc } from 'firebase/firestore'
import { firestore } from '../../../config/firebase'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash, faCheckCircle, faTimesCircle } from "@fortawesome/free-solid-svg-icons";


import { Table,  Badge } from "antd";

const {Title} = Typography
const Home = () => {
  const {user} = useAuthContext()

  const [activeProcessing, setActiveProcessing] = useState(false)
  const [inactiveProcessing, setInactiveProcessing] = useState(false)

  // const [state, setState] = useState({firstName:"Junaid" , lastName: "Aslam" })

  const handleUpdateProfile =async(status)=>{

    // const {firstName, lastName} = state
    // const updatedData = {firstName, lastName, status }
    const updatedData =  {status }
    {status==="active" ? setActiveProcessing(true) : setInactiveProcessing(true)}
    // setActiveProcessing(true)
    try {
      await setDoc(doc(firestore, "users", user.uid),updatedData, {merge: true});
      
      // in 2nd parameter we add new property which we want to add
      //merge true merge the previous data with new data


      window.notify("User profile updated successfully", "success")
    } catch (e) {
      window.notify("Error updating user profile", "error")

      console.error("Error updating document: ", e);
    } finally{
      {status==="active" ? setActiveProcessing(false) : setInactiveProcessing(false)}
      // setActiveProcessing(false)
    }
    
  }


  
  // Transforming data into a structure suitable for the Ant Design table
  const dataSource = [
    {
      key: user.uid,
      firstName: user.firstName,
      lastName: user.lastName,
      fullName: `${user.firstName} ${user.lastName}`,
      email: user.email,
      status: user.status,
      uid: user.uid,
    },
  ];

  // Defining columns for the table
  const columns = [
    {
      title: <span className=' fw-bold'>
        {/* <FontAwesomeIcon icon={faCheckCircle} />  */}
        First Name</span>,
      dataIndex: "firstName",
      key: "firstName",
      align: "center"
    },
    {
      title: <span className=' fw-bold'>
        {/* <FontAwesomeIcon icon={faCheckCircle} />  */}
        Last Name</span>,
      dataIndex: "lastName",
      key: "lastName",
      align: "center"
    },
    {
      title: <span className=' fw-bold'>
        {/* <FontAwesomeIcon icon={faCheckCircle} /> */}
         Full Name</span>,
      dataIndex: "fullName",
      key: "fullName",
      align: "center"
    },
    {
      title: <span className=' fw-bold'>
        {/* <FontAwesomeIcon icon={faTimesCircle} /> */}
         Status</span>,
         align: "center",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Badge
          status={status === "active" ? "success" : "error"}
          text={
            <span>
              {/* <FontAwesomeIcon
                icon={status === "active" ? faCheckCircle : faTimesCircle}
                style={{
                  color: status === "active" ? "#52c41a" : "#f5222d",
                  marginRight: "5px",
                }}
              /> */}
          {status}
            </span>
          }
          />
      ),
    },
    {
      title: <span className=' fw-bold'>
        {/* <FontAwesomeIcon icon={faCheckCircle} /> */}
         Email</span>,
      dataIndex: "email",
      key: "email",
      align: "center"
    },
    {
      title: <span className=' fw-bold' >
        {/* <FontAwesomeIcon icon={faCheckCircle} /> */}
         UID</span>,
      dataIndex: "uid",
      key: "uid",
      align: "center"
    },
    {
      title: <span className=' fw-bold'>
        {/* <FontAwesomeIcon icon={faCheckCircle} />  */}
        Actions</span>,
        align: "center",
      key: "actions",
      render: (_, record) => (
        <div style={{ display: "flex", gap: "10px" }}>
          <Button
            type="primary"
            // icon={<FontAwesomeIcon icon={faEdit} />}
            onClick={() => handleUpdateProfile("active")}
          >
            Update Active
          </Button>
          <Button
            type="danger"
            // icon={<FontAwesomeIcon icon={faTrash} />}
            onClick={() => handleUpdateProfile("inactive")}
          >
            Update Inactive
          </Button>
        </div>
      ),
    },
  ];

  return (
    <main className="container p-5">
      <h1 className="text-center">
        {/* <FontAwesomeIcon icon={faCheckCircle} />  */}
        User Profile
      </h1>
      <Table
        dataSource={dataSource}
        columns={columns}
        bordered 
        pagination={false}
      />
    </main>
  );
};

export default Home;
