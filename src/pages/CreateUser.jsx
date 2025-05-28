import { useState } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  Row,
  Table,
} from "react-bootstrap";
import SaveIcon from "@mui/icons-material/Save";
import dayjs from "dayjs";
import EditNoteIcon from "@mui/icons-material/EditNote";
import DeleteSweepIcon from "@mui/icons-material/DeleteSweep";
function CreateUser() {
  const [nombre, setNombre] = useState("");
  const [cedula, setCedula] = useState("");
  const [telefono, setTelefono] = useState("");
  const [direccion, setDireccion] = useState("");
  const [email, setEmail] = useState("");
  const [rol, setRol] = useState("");
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
      <Card style={{ padding: 20, flexGrow: 1 }}>
        <Card.Title>
          <label>Administración de usuarios</label>
        </Card.Title>
        <Card.Body style={{ height: "100%" }}>
          <Row
            style={{
              backgroundColor: "rgb(50,50,50)",
              padding: 10,
              borderRadius: 5,
              color:"white"
            }}
           
          >
            <Row>
              <Col lg={4} md={4} sm={12} xs={12}>
                <Form.Group>
                  <Form.Label>Nombres:</Form.Label>
                  <Form.Control
                    type="text"
                    required
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    placeholder="Nombres y apellidos"
                  />
                </Form.Group>
              </Col>
              <Col lg={2} md={2} sm={12} xs={12}>
                <Form.Group>
                  <Form.Label>C.C.:</Form.Label>
                  <Form.Control
                    type="text"
                    required
                    value={cedula}
                    onChange={(e) => setCedula(e.target.value)}
                    placeholder="Cédula de identidad"
                  />
                </Form.Group>
              </Col>
              <Col lg={2} md={2} sm={12} xs={12}>
                <Form.Group>
                  <Form.Label>Teléfono:</Form.Label>
                  <Form.Control
                    type="text"
                    required
                    value={telefono}
                    onChange={(e) => setTelefono(e.target.value)}
                    placeholder="Teléfono / Celular"
                  />
                </Form.Group>
              </Col>
              <Col lg={4} md={4} sm={12} xs={12}>
                <Form.Group>
                  <Form.Label>Dirección</Form.Label>
                  <Form.Control
                    type="text"
                    required
                    value={direccion}
                    onChange={(e) => setDireccion(e.target.value)}
                    placeholder="Dirección"
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row style={{ paddingBottom: 10 }}>
              <Col lg={4} md={4} sm={12} xs={12}>
                <Form.Group>
                  <Form.Label>Email:</Form.Label>
                  <Form.Control
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                  />
                </Form.Group>
              </Col>
              <Col lg={2} md={2} sm={12} xs={12}>
                <Form.Group>
                  <Form.Label>Rol:</Form.Label>
                  <Form.Select
                    type="text"
                    required
                    value={rol}
                    onChange={(e) => setRol(e.target.value)}
                  >
                    <option value="">Seleccione un rol...</option>
                    <option value="1">Administrador</option>
                    <option value="2">Supervisor</option>
                    <option value="3">Operador</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col
                lg={2}
                md={2}
                sm={12}
                xs={12}
                style={{
                  display: "flex",
                  alignItems: "self-end",
                  paddingTop: 10,
                }}
              >
                <Button variant="success">
                  {" "}
                  <SaveIcon /> Guardar
                </Button>
              </Col>
            </Row>
          </Row>
          <Row style={{ paddingTop: 10, flexGrow: 1 }}>
            <Table responsive size="sm" hover>
              <thead className="tableHead">
                <tr>
                  {" "}
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
              <tbody>
                <tr>
                  <td className="tableRow">1</td>
                  <td className="tableRow">Juan Perez</td>
                  <td className="tableRow">1234567890</td>
                  <td className="tableRow">0987654321</td>
                  <td className="tableRow">Av. 1234 y calle B</td>
                  <td className="tableRow">jperez@telegrafia.com</td>
                  <td className="tableRow">Administrador</td>
                  <td className="tableRow">
                    <div
                      style={{
                       display:"flex",
                        justifyContent:"center"
                      }}
                    >
                      <Button variant="link" size="sm">
                        <EditNoteIcon />
                      </Button>
                      <Button variant="link" size="sm" style={{ color: "red" }}>
                        <DeleteSweepIcon />
                      </Button>
                    </div>
                  </td>
                </tr>
                   <tr>
                  <td className="tableRow">2</td>
                  <td className="tableRow">Juan Perez</td>
                  <td className="tableRow">1234567890</td>
                  <td className="tableRow">0987654321</td>
                  <td className="tableRow">Av. 1234 y calle B</td>
                  <td className="tableRow">jperez@telegrafia.com</td>
                  <td className="tableRow">Supervisor</td>
                  <td className="tableRow">
                    <div
                      style={{
                      display:"flex",
                        justifyContent:"center"
                      }}
                    >
                      <Button variant="link" size="sm">
                        <EditNoteIcon />
                      </Button>
                      <Button variant="link" size="sm" style={{ color: "red" }}>
                        <DeleteSweepIcon />
                      </Button>
                    </div>
                  </td>
                </tr>
                   <tr>
                  <td className="tableRow">3</td>
                  <td className="tableRow">Juan Perez</td>
                  <td className="tableRow">1234567890</td>
                  <td className="tableRow">0987654321</td>
                  <td className="tableRow">Av. 1234 y calle B</td>
                  <td className="tableRow">jperez@telegrafia.com</td>
                  <td className="tableRow">Operador</td>
                  <td className="tableRow">
                    <div
                      style={{
                    display:"flex",
                        justifyContent:"center"
                      }}
                    >
                      <Button variant="link" size="sm">
                        <EditNoteIcon />
                      </Button>
                      <Button variant="link" size="sm" style={{ color: "red" }}>
                        <DeleteSweepIcon />
                      </Button>
                    </div>
                  </td>
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
                      DomotizArq © {dayjs().year()}
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
