import { Card, Col, Container, Form, Row } from "react-bootstrap";
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
export function Setup() {
    const {userData, userChange} = useContext(UserContext);
    const [newEntidad,setNewEntidad]=useState('');
    const navigate = useNavigate();
    console.log("userData",userData);
    const changeEntidad=(otraEntidad)=>{
const  user=userData.user;
   const userUid=userData.userUid;
    const rol=userData.rol;
   const email=userData.email;
   const idcw=userData.idcw;
    const eid=userData.eid;
   const uid=userData.uid;
   
    const sesion=userData.sesion;
    const wialonUser=userData.wialonUser;
    userChange(
      {
         user: user,
    userUid: userUid,
    rol: rol,
    email:email,
    idcw: idcw,
    eid: eid,
    uid: uid,
    entidad: otraEntidad,
    sesion: sesion,
    wialonUser: wialonUser,
      }
    )
    }
  return (
    <Container className="mt-5">
      <Card>
        <Card.Header className="text-center">Configuración</Card.Header>
        <Card.Body className="text-center ">
          <Row>
            <Col lg={6}>
              <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Nombre de la entidad</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Ingrese el nombre de la entidad"
                    value={newEntidad}
                    onChange={(e) => setNewEntidad(e.target.value)}
                  />
                </Form.Group>

                <button type="submit" className="btn btn-primary"
                onClick={(e)=>{
                  e.preventDefault();
                  changeEntidad(newEntidad);
                 // console.log("new entidad",newEntidad);
                }}
                >
                  Guardar Cambios
                </button>
              </Form>
            </Col>
          </Row>

          <p>Esta sección está en desarrollo.</p>
          <p>Pronto podrás configurar tu cuenta y preferencias.</p>
        </Card.Body>
      </Card>
    </Container>
  );
}
