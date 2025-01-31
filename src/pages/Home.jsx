import { useContext, useState } from "react";
import { Col, Container, Form, Row, Table } from "react-bootstrap";
import "../styles/Styles.css";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

import {
 
  LayersControl,
  MapContainer,
  Marker,
 
  TileLayer,
  Tooltip,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import ToolBar from "../components/ToolBar";
import DownloadIcon from "@mui/icons-material/Download";
import { DataContext } from "../context/DataContext";
function Home() {

  const position = [-0.933712, -78.614649];
 
  const [filterDate, setFilterDate] = useState("");
  const { neighborhood, setNeighborhood } = useContext(DataContext);
  const [eventos, setAEventos] = useState([
    { fecha: "2025-01-16", hora: "14:12:11", activadoPor: "Usuario 1" },
    { fecha: "2025-01-17", hora: "07:00:01", activadoPor: "Usuario 2" },
    { fecha: "2024-11-17", hora: "23:10:00", activadoPor: "Usuario 1" },
    { fecha: "2024-12-16", hora: "00:12:18", activadoPor: "Usuario 2" },
    { fecha: "2025-01-16", hora: "14:12:11", activadoPor: "Usuario 1" },
    { fecha: "2025-01-17", hora: "07:00:01", activadoPor: "Usuario 2" },
    { fecha: "2024-11-17", hora: "23:10:00", activadoPor: "Usuario 1" },
    { fecha: "2024-12-16", hora: "00:12:18", activadoPor: "Usuario 2" },
    { fecha: "2025-01-16", hora: "14:12:11", activadoPor: "Usuario 1" },
    { fecha: "2025-01-17", hora: "07:00:01", activadoPor: "Usuario 2" },
    { fecha: "2024-11-17", hora: "23:10:00", activadoPor: "Usuario 1" },
    { fecha: "2024-12-16", hora: "00:12:18", activadoPor: "Usuario 2" },
    { fecha: "2025-01-16", hora: "14:12:11", activadoPor: "Usuario 1" },
    { fecha: "2025-01-17", hora: "07:00:01", activadoPor: "Usuario 2" },
    { fecha: "2024-11-17", hora: "23:10:00", activadoPor: "Usuario 1" },
    { fecha: "2024-12-16", hora: "00:12:18", activadoPor: "Usuario 2" },
  ]);
  // Filtrar eventos por fecha
  const filteredEventos = eventos
    .filter((evento) => {
      if (!filterDate) return true; // Si no hay filtro, muestra todos
      return evento.fecha === filterDate; // Compara con la fecha del evento
    })
    .sort((a, b) => new Date(b.fecha) - new Date(a.fecha)); // Ordena por fecha descendente
  const [alarmas, setAlarmas] = useState([
    { name: "GAD-LATACUNGA SIGSICALLE", lat: -0.933712, lng: -78.614649 },
    { name: "barrio 2", lat: -0.934552, lng: -78.583443 },
    { name: "barrio 3", lat: -0.944562, lng: -78.583453 },
    { name: "barrio 4", lat: -0.954562, lng: -78.683453 },
  ]);

  return (
    <Container fluid className="m-0 p-0 ">
      <Row className="m-0 p-0">
        <Col lg={8} md={8} sm={12} className="m-0 p-0">
          <Row style={{ width: "100%", height: "79vh" }} className="ps-4 pt-2">
            <MapContainer
              center={position}
              zoom={13}
              scrollWheelZoom={true}
              style={{ width: "100%", height: "100%" }}
            >
             

              <LayersControl position="topright">
                <LayersControl.BaseLayer name="Vista de satélite">
                  <TileLayer
                    url="https://mt1.google.com/vt/lyrs=s&x={x}&y={y}&z={z}"
                    attribution='&copy; <a href="https://www.google.com/maps">Google Maps</a>'
                  />
                </LayersControl.BaseLayer>
                <LayersControl.BaseLayer checked name="Relieve">
                  <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                </LayersControl.BaseLayer>
              </LayersControl>

              {alarmas.map((alarma, index) => (
                <Marker
                  key={index}
                  position={[alarma.lat, alarma.lng]}
                  eventHandlers={{
                    click: () => {
                      setNeighborhood({
                        name: alarma.name,
                        lat: alarma.lat,
                        lng: alarma.lng,
                      });
                    },
                  }}
                >
                  <Tooltip>
                    <label>{alarma.name}</label>
                  </Tooltip>
                </Marker>
              ))}
            </MapContainer>
            
          </Row>
          <Row
            style={{ width: "100%", padding: 10 }}
            className="ps-4 pt-2 pe-0"
          >
            <ToolBar />
          </Row>
        </Col>
        {/**
        Columna para mostrar la lista de eventos suscitados
         */}
        <Col lg={4} md={4} sm={12} className="m-0 pt-2 pb-0">
          <Card
            style={{ maxHeight: "71vh", padding: 10, overflowY: "auto" }}
            bg="light"
          >
            <Card.Title>{neighborhood.name}</Card.Title>
            <Container fluid>
              {/* crea una matriz con cards
            <Row style={{overflowY:"auto",  maxHeight: "80vh"}}>
              {alarmas.map((alarm, index) => (
                <Col key={index} lg={3} md={3} sm={4} xs={12} className="p-2">
                  <Card style={{ width: "10rem" }}>
                    <Card.Img variant="top" src={logo} width={64} height={64}/>
                    <Card.Body>
                      <Card.Title>{alarm}</Card.Title>
                     
                      <Button variant="primary">Mostrar</Button>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
            */}
              <Table responsive striped>
                <thead>
                  <tr>
                    <th className="tableHead">#</th>
                    <th className="tableHead">Fecha</th>
                    <th className="tableHead">Hora</th>
                    <th className="tableHead">Activado por</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredEventos.map((evento, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{evento.fecha}</td>
                      <td>{evento.hora}</td>
                      <td>{evento.activadoPor}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Container>
          </Card>
          <Card bg="light" style={{ padding: 10 }}>
            <Row>
              <Col lg={6} md={3} sm={6} xs={6}>
                <Form.Group className="mb-3" controlId="filterDate">
                  <Form.Label>Filtrar por fecha</Form.Label>
                  <Form.Control
                    type="date"
                    value={filterDate}
                    onChange={(e) => setFilterDate(e.target.value)}
                  />
                </Form.Group>
              </Col>
              <Col lg={6} md={3} sm={6} xs={6}>
                <Row className="p-2">
                  {" "}
                  <Button className="btnDownload">
                    <DownloadIcon /> Descargar reporte
                  </Button>
                </Row>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Home;
