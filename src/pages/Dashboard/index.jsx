import React from 'react'
import {Routes,Route, Navigate } from 'react-router-dom'
import Todos from './Todos'


const Dashboard = () => {
  return (
    <>
    <Routes>
      <Route index element={<Navigate to='/dashboard/todos/add'/>} />
      <Route path='todos/*' element={<Todos/>} />
      
    </Routes>
    



    </>
  )
}

export default Dashboard











































// ==================================//Custom code for sidebar by Ant design======================


// import React from 'react';
// import { UploadOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons';
// import { Layout, Menu, theme } from 'antd';
// const { Header, Content, Footer, Sider } = Layout;
// const items = [UserOutlined, VideoCameraOutlined, UploadOutlined, UserOutlined].map(
//   (icon, index) => ({
//     key: String(index + 1),
//     icon: React.createElement(icon),
//     label: `nav ${index + 1}`,
//   }),
// );

// const Dashboard = () => {
//   const {
//     token: { colorBgContainer, borderRadiusLG },
//   } = theme.useToken()



//   return (
//     <>
//  <Layout>
//       <Sider
//         breakpoint="lg"
//         collapsedWidth="80"
//         onBreakpoint={(broken) => {
//           console.log(broken);
//         }}
//         onCollapse={(collapsed, type) => {
//           console.log(collapsed, type);
//         }}
//         collapsible = {true}
//       >
//         <div className="demo-logo-vertical" />
//         <Menu theme="dark" mode="inline" defaultSelectedKeys={['4']} items={items} />
//       </Sider>
//       <Layout>
        
//         <Content
//           className='p-3'
//         >
//           <div
//             style={{
//               padding: 24,
//               minHeight: 360,
//               background: colorBgContainer,
//               borderRadius: borderRadiusLG,
//             }}
//           >
//             content
//           </div>
//         </Content>
//         <Footer className='text-center'>&copy; 2025. All Rights Reserved. </Footer>
//       </Layout>
//     </Layout>
    
//     </>
//   )
// }

// export default Dashboard