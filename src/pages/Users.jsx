import { useRef, useState } from "react";
import {
  Card,
  Container,
  Table,
  Button,
  Pagination,
  Form,
  Row,
  Col,
  InputGroup,
} from "react-bootstrap";
import EditNoteIcon from "@mui/icons-material/EditNote";
import DeleteSweepIcon from "@mui/icons-material/DeleteSweep";
import PublishIcon from "@mui/icons-material/Publish";
import FileDownloadSharpIcon from "@mui/icons-material/FileDownloadSharp";
import SearchSharpIcon from "@mui/icons-material/SearchSharp";
import Papa from "papaparse";

function Users() {
  const fileInputRef = useRef(null);
  const [usuarios, setUsuarios] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  const itemsPerPage = 10;

  const importarCsv = () => fileInputRef.current.click();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === "text/csv") {
      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        complete: (result) => {
          setUsuarios(result.data);
          setCurrentPage(1);
        },
      });
    } else {
      alert("Por favor selecciona un archivo CSV válido.");
    }
  };

  const exportarCsv = () => {
    if (usuarios.length === 0) {
      alert("No hay datos para exportar.");
      return;
    }

    const csv = Papa.unparse(usuarios);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "usuarios.csv";
    link.click();
    URL.revokeObjectURL(url);
  };

  // Filtro de usuarios
  const usuariosFiltrados = usuarios.filter((u) => {
    return (
      u.nombres?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.barrio?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  // Paginación
  const totalPages = Math.ceil(usuariosFiltrados.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const usuariosPagina = usuariosFiltrados.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  return (
    <Container fluid style={{ padding: 20 }}>
      <Row>
        <Col lg={4} md={4} sm={12} xs={12}>
          <Card>
            <Card.Body style={{ padding: 20 }}>
              <Row>
                <Col lg={12} md={12} sm={12} xs={12}>
                  <Form.Group>
                    <Form.Label>Nombres:</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Nombres y apellidos"
                    />
                  </Form.Group>
                </Col>
                <Col lg={12} md={12} sm={12} xs={12}>
                  <Form.Group>
                    <Form.Label>Dirección:</Form.Label>
                    <Form.Control type="text" placeholder="Av. 123" />
                  </Form.Group>
                </Col>
                <Col lg={12} md={12} sm={12} xs={12}>
                  <Form.Group>
                    <Form.Label>Email:</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="ejemplo@ejemplo.com"
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col lg={4} md={4} sm={12} xs={12}>
                  <Form.Group>
                    <Form.Label>Teléfono:</Form.Label>
                    <Form.Control type="text" placeholder="0987654321" />
                  </Form.Group>
                </Col>
                <Col lg={8} md={8} sm={12} xs={12}>
                  <Form.Group>
                    <Form.Label>Estación de alarma:</Form.Label>
                    <Form.Control type="text" placeholder="LA MERCED" />
                  </Form.Group>
                </Col>
              </Row>
              <Row style={{ paddingTop: 20 }}>
                <Button>Agregar usuario</Button>
              </Row>
            </Card.Body>
          </Card>
        </Col>
        {/**
        Tabla con la lista de usuarios
         */}
        <Col lg={8} md={8} sm={12} xs={12}>
          <Card>
            <Card.Body>
              <Row>
                <Row>
                  <label>Todos los usuarios registrados</label>
                </Row>
                <Row>
                  <Col lg={5} md={5} sm={12} xs={12}>
                    <InputGroup>
                      <InputGroup.Text>
                        <SearchSharpIcon />
                      </InputGroup.Text>
                      <Form.Control
                        type="text"
                        placeholder="Buscar..."
                        value={searchTerm}
                        style={{ fontSize: "0.9rem" }}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </InputGroup>
                  </Col>
                
                  <Col lg={7} md={7} sm={12} xs={12}>
                  <div style={{justifyContent:"end", display:"flex"}}>
                      <Button
                      variant="outline-primary"
                      onClick={importarCsv}
                      className="me-2"
                      style={{ fontSize: "0.9rem" }}
                    >
                      <PublishIcon />
                      Importar CSV
                    </Button>
                    <Button variant="outline-success" onClick={exportarCsv}>
                      <FileDownloadSharpIcon />
                      Descargar CSV
                    </Button>
                    <input
                      type="file"
                      accept=".csv"
                      ref={fileInputRef}
                      onChange={handleFileChange}
                      style={{ display: "none" }}
                    />
                  </div>
                  
                  </Col>
                </Row>
              </Row>

              {/* Tabla */}
              <Table hover striped responsive size="sm">
                <thead>
                  <tr>
                    <th className="tableHeaderUser" >Item</th>
                    <th className="tableHeaderUser">Nombres</th>
                    <th className="tableHeaderUser">Teléfono</th>
                    <th className="tableHeaderUser">Email</th>
                    <th className="tableHeaderUser">Dirección</th>
                    <th className="tableHeaderUser">Estacióm de alarma</th>
                    <th className="tableHeaderUser">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {usuariosPagina.length > 0 ? (
                    usuariosPagina.map((usuario, index) => (
                      <tr key={index}>
                        <td className="tableRow">{usuario.item}</td>
                        <td className="tableRow">{usuario.nombres}</td>
                        <td className="tableRow">{usuario.telefono}</td>
                        <td className="tableRow">{usuario.email}</td>
                        <td className="tableRow">{usuario.direccion}</td>
                        <td className="tableRow">{usuario.barrio}</td>
                        <td>
                        <div style={{display:"flex", justifyContent:"space-between"}}>
                           <Button variant="link" size="sm">
                            <EditNoteIcon />
                          </Button>
                          <Button variant="link" size="sm">
                            <DeleteSweepIcon />
                          </Button>
                        </div>
                         
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={7}>No se encontraron datos</td>
                    </tr>
                  )}
                </tbody>
              </Table>

              {/* Paginación */}
              {usuariosFiltrados.length > itemsPerPage && (
                <Pagination className="justify-content-center">
                  <Pagination.Prev
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                  />
                  {Array.from({ length: totalPages }).map((_, i) => (
                    <Pagination.Item
                      key={i + 1}
                      active={i + 1 === currentPage}
                      onClick={() => handlePageChange(i + 1)}
                    >
                      {i + 1}
                    </Pagination.Item>
                  ))}
                  <Pagination.Next
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                  />
                </Pagination>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Users;
