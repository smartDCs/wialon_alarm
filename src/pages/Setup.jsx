import { Card, Col, Container, Form, Row } from "react-bootstrap";
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
export function Setup() {
    const {userData} = useContext(UserContext);
    const navigate = useNavigate();
    console.log("userData",userData);
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
                  />
                </Form.Group>

                <button type="submit" className="btn btn-primary">
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
