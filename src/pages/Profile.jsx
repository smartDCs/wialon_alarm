import React from 'react'
import { Container, Col, Form, Row } from 'react-bootstrap'
import alcaldia from '../assets/images/alcaldiah1.png'
function Profile() {
  return (
    <>
   <Container fluid>
    <Row style={{
        width:"100%", 
        height:"100%", 
        display:"flex",
         justifyContent:"center",
         alignContent:"center",
         color:"white"
         }}>
     <Col lg={12} md={12} sm={12} xs={12}>
     <h3>Perfil de usuario</h3>
     </Col>
     <Row>
        <Col lg={6} md={6} sm={12} xs={12}>
        <Form>
            <Form.Group>
                <Form.Label>Nombre de usuario</Form.Label>
                <Form.Control 
                type='text'
                placeholder='User name '
                disabled
                />
            </Form.Group>
            </Form>
            </Col>
            <Col g={6} md={6} sm={12} xs={12}>
            <Form>
            <Form.Group>
                <Form.Label>Email</Form.Label>
                <Form.Control 
                type='text'
                placeholder='user@telegrafia.com'
                disabled
                />
            </Form.Group>

        </Form>
        </Col>
        </Row>
        <Row className='pt-4 pb-4'>
        <Col lg={4} md={4} sm={6} xs={6}>
        <Form>
            <Form.Group>
                <Form.Label>Dirección</Form.Label>
                <Form.Control 
                type='text'
                placeholder='Av. 123'
                disabled
                />
            </Form.Group>
            </Form>
            </Col>
            <Col lg={4} md={4} sm={6} xs={6}>
            <Form>
            <Form.Group>
                <Form.Label>Teléfono</Form.Label>
                <Form.Control 
                type='text'
                placeholder='0987654321'
                disabled
                />
            </Form.Group>

        </Form>
        </Col>
        <Col lg={4} md={4} sm={6} xs={6}>
            <Form>
            <Form.Group>
                <Form.Label>Nivel de acceso</Form.Label>
                <Form.Control 
                type='text'
                placeholder='Operador'
                disabled
                />
            </Form.Group>

        </Form>
        </Col>
        </Row>
    </Row>
    
   
   
   
   </Container>
   <Container fluid style={{display:"flex", position:"absolute",bottom:10}}>
   <Row >
            <Form>
                <Form.Group>
                <img src={alcaldia} height={200} />
                </Form.Group>
           
            </Form>
       
    </Row>
   </Container>
   </>
  )
}

export default Profile