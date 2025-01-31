import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import LoginIcon from "@mui/icons-material/Login";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const iniciarSesion = (e) => {
    e.preventDefault();
    navigate("/home");
  };
  return (
    <Container
      fluid
      className="d-flex justify-content-center align-items-center"
      style={{ height: "80vh" }}
    >
      <Row style={{width:"100%", height:"100%", display:"flex", justifyContent:"center",alignContent:"center"}}>
        <Col lg={5} md={5} sm={10} xs={12}>
          <Card
            className="bg-dark text-white-50"
            
          >
            <Form className="p-4" onSubmit={iniciarSesion}>
              <Form.Group>
                <Form.Label>Usuario</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="ejemplo@ejemplo.com"
                  required
                />
                <Form.Label>Contraseña</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Ingrese su contraseña"
                  required
                />
              </Form.Group>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <Button
                  className="btnLogin text-white-50"
                  onClick={() => {
                    navigate("/register");
                  }}
                >
                  Registrar
                </Button>
                <Button className="btnLogin text-white-50">
                  Olvidé mi contraseña
                </Button>
              </div>
              <Row>
                <Button className="btnLogin" type="submit">
                  <LoginIcon /> Iniciar sesión
                </Button>
              </Row>
            </Form>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Login;
