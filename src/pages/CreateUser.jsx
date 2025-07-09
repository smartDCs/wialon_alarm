import { useState } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  InputGroup,
  Row,
  Table,
} from "react-bootstrap";
import SaveIcon from "@mui/icons-material/Save";
import dayjs from "dayjs";
import EditNoteIcon from "@mui/icons-material/EditNote";
import DeleteSweepIcon from "@mui/icons-material/DeleteSweep";
//import { create } from "@mui/material/styles/createTransitions";
function CreateUser() {
  const [nombre, setNombre] = useState("");
  const [cedula, setCedula] = useState("");
  const [telefono, setTelefono] = useState("");
  const [direccion, setDireccion] = useState("");
  const [email, setEmail] = useState("");
  const [rol, setRol] = useState("");

const guardarUser = (e) => {
  e.preventDefault();
    // Aquí puedes agregar la lógica para guardar el usuario
                  console.log("Usuario guardado:", {
                    nombre,
                    cedula,
                    telefono,
                    direccion,
                    email,
                    rol,
                  });
}

  return (
    <Container
      fluid
      style={{
        padding: 10,
        flexDirection: "column",
        display: "flex",
        height: "100%",
      }}
    >
      <Card style={{ padding: 5, flexGrow: 1 }}>
        <Card.Title style={{padding:0, margin:0, display:"flex", fontSize:"1rem"}}>
          <label>Administración de usuarios</label>
        </Card.Title>
        <Card.Body style={{ height: "100%" }}>
          <Row
            style={{
              paddingBottom: 10,
              borderRadius: 5,
            fontSize: "0.8rem",
              border: "1px solid #ccc",
            }}
           
          >
            <Row>
              <Col lg={4} md={4} sm={12} xs={12}>
               <InputGroup className="mt-3">
        <InputGroup.Text id="basic-addon1"
        size="sm"
        >Nombres:</InputGroup.Text>
         <Form.Control
                    type="text"
                     size="sm"
                    required
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    placeholder="Nombres y apellidos"
                  />
      </InputGroup>
               
              </Col>
              <Col lg={2} md={2} sm={12} xs={12}>
                <InputGroup className="mt-3">
                  <InputGroup.Text
                  size="sm"
                  >C.C.:</InputGroup.Text>
                  <Form.Control
                  size="sm"
                    type="text"
                    required
                    value={cedula}
                    onChange={(e) => setCedula(e.target.value)}
                    placeholder="Cédula de identidad"
                  />
                </InputGroup>
              </Col>
              <Col lg={2} md={2} sm={12} xs={12}>
                <InputGroup className="mt-3">
                  <InputGroup.Text
                  size="sm"
                  >Teléfono:</InputGroup.Text>
                  <Form.Control
                    type="text"
                    
                    size="sm"
                    required
                    value={telefono}
                    onChange={(e) => setTelefono(e.target.value)}
                    placeholder="Teléfono / Celular"
                  />
                </InputGroup>
              </Col>
              <Col lg={4} md={4} sm={12} xs={12}>
                <InputGroup className="mt-3">
                  <InputGroup.Text
                  size="sm"
                  >Dirección:</InputGroup.Text>
                  <Form.Control
                    type="text"
                    required
                    size="sm"
                    value={direccion}
                    onChange={(e) => setDireccion(e.target.value)}
                    placeholder="Dirección"
                  />
                </InputGroup>
              </Col>
            </Row>
            <Row style={{ paddingBottom: 10 }}>
              <Col lg={4} md={4} sm={12} xs={12}>
                <InputGroup className="mt-3">
                  <InputGroup.Text size="sm">Email:</InputGroup.Text>
                  <Form.Control
                    type="email"
                    required
                    size="sm"

                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                  />
                </InputGroup>
              </Col>
              <Col lg={2} md={2} sm={12} xs={12}>
                <InputGroup className="mt-3">
                  <InputGroup.Text>Rol:</InputGroup.Text>
                  <Form.Select
                    type="text"
                    required
                    size="sm"

                    value={rol}
                    onChange={(e) => setRol(e.target.value)}
                  >
                    <option value="">Seleccione un rol...</option>
                    <option value="1">Administrador</option>
                    <option value="2">Supervisor</option>
                    <option value="3">Operador</option>
                  </Form.Select>
                </InputGroup>
              </Col>
              <Col
                lg={2}
                md={2}
                sm={12}
                xs={12}
                style={{
                  display: "flex",
                  alignItems: "center",
                  paddingTop: 0,
                  
                }}
              >
                <Button variant="outline-success" size="sm" className="mt-3"
                onClick={(e) => {
                guardarUser(e);
                }}
                >
                  <SaveIcon /> Guardar
                </Button>
              </Col>
            </Row>
          </Row>
          {/**
          Tabla para mostrar los usuarios registrados
           */}
          <Row style={{ paddingTop: 10, flexGrow: 1 }}>
            <Table responsive size="sm" hover>
              <thead className="tableHead">
                <tr>
                  <th colSpan={8}>Usuarios registrados</th>
                </tr>
                <tr>
                  <th className="tableHeaderUser">#</th>
                  <th className="tableHeaderUser">Nombres</th>
                  <th className="tableHeaderUser">C.C.</th>
                  <th className="tableHeaderUser">Teléfono</th>
                  <th className="tableHeaderUser">Dirección</th>
                  <th className="tableHeaderUser">Email</th>
                  <th className="tableHeaderUser">Rol</th>
                  <th className="tableHeaderUser">Acciones</th>
                </tr>
              </thead>
              {/**
              muestra los datos extraidos de la base de datos
               */}
              <tbody>
                    <tr
                
                    >
                      <td
                      colSpan={8}
                      style={{
                        textAlign: "center",
                        fontStyle: "italic",
                        color: "grey",
                      }}
                      > No se encotró ningun registro</td>
                    </tr>       
               
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan={8}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "end",
                        width: "100%",
                        fontStyle: "italic",
                        fontSize:"0.8rem"
                      }}
                    >
                      NexusEmbed © {dayjs().year()}
                    </div>
                  </td>
                </tr>
              </tfoot>
            </Table>
          </Row>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default CreateUser;
