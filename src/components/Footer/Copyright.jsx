import { Row, Col, Typography } from 'antd'
const {Paragraph} = Typography
import React from 'react'

const Copyright = () => {
    const year = new Date().getFullYear()
  return (
    <footer className='bg-primary py-2'>
        <div className="container">
            <Row>
                <Col span={24} >
                <Paragraph className='text-white text-center mb-0'>&copy; {year}. All Rights Reserved.</Paragraph>
                </Col>
            </Row>
        </div>
    </footer>
  )
}

export default Copyright