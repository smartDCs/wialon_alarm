import { useState } from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import SaveIcon from '@mui/icons-material/Save';
function Register() {
    const [selectedOption, setSelectedOption] = useState('');

  const registrarUsuario = () => {
    alert("Usuario registrado");
  };
  const handleSelectChange = (e) => {
    setSelectedOption(e.target.value);
  };
  return (
    <Container
      fluid
      className="d-flex justify-content-center align-items-center"
      style={{ height: "80vh" }}
    >
      <Card className="bg-dark text-white-50 ">
        <Card.Title>
          <div style={{ padding: 10 }}>Agregar nuevo usuario</div>
        </Card.Title>
        <Form onSubmit={registrarUsuario}>
          <Form.Group>
            <div style={{ padding: 10 }}>
              <Row>
                <Col lg={5} md={5} sm={12} xs={12}>
                  <Form.Label>Nombres</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Ingrese su nombre completo"
                    required
                  />
                </Col>
                <Col lg={4} md={5} sm={12} xs={12}>
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="ejemplo@ejemplo.com"
                    required
                  />
                </Col>
                <Col lg={3} md={2} sm={12} xs={12}>
                  <Form.Label>Teléfono</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="0987654321"
                    required
                  />
                </Col>
              </Row>
            </div>
            <div style={{ padding: 10 }}>
              <Row>
                <Col lg={5} md={5} sm={12} xs={12}>
                  <Form.Label>Contraseña</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Ingrese su contraseña"
                    required
                  />
                </Col>
                <Col lg={4} md={4} sm={4} xs={6}>
                <Form.Label>Rol</Form.Label>
                  <Form.Select
                   value={selectedOption} 
            onChange={handleSelectChange}
            required
                  >
                     <option value="">Selecciona...</option>
            <option value="opcion1">Super administrador</option>
            <option value="opcion2">Administrador</option>
            <option value="opcion3">Operador</option>
          
                  </Form.Select>
                </Col>
              </Row>
            </div>
          </Form.Group>
        
          <Row>
            <Button className="btnLogin" type="submit">
              {" "}
              <SaveIcon/> Guardar  
            </Button>
          </Row>
        </Form>
      </Card>
    </Container>
  );
}

export default Register;
