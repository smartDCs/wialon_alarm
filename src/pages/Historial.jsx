import { UserContext } from "../context/UserContext";
import {
  equalTo,
  onValue,
  orderByChild,
  query,
  ref,
  update,
} from "firebase/database";
import { useEffect, useState, useRef, useMemo, useContext } from "react";
import {
  Button,
  Col,
  Container,
  Form,
  InputGroup,
  Row,
  Table,
} from "react-bootstrap";
import { CSVLink } from "react-csv";
import FileDownloadSharpIcon from "@mui/icons-material/FileDownloadSharp";
import VerifiedUserSharpIcon from "@mui/icons-material/VerifiedUserSharp";
import GppBadSharpIcon from "@mui/icons-material/GppBadSharp";
import PrivacyTipSharpIcon from "@mui/icons-material/PrivacyTipSharp";
import SearchSharpIcon from "@mui/icons-material/SearchSharp";
import ReactPaginate from "react-paginate";
import MTooltip from "@mui/material/Tooltip";
import dayjs from "dayjs";
import GradingSharpIcon from "@mui/icons-material/GradingSharp";
import TravelExploreIcon from "@mui/icons-material/TravelExplore";
import VisibilitySharpIcon from "@mui/icons-material/VisibilitySharp";
import AssignmentSharpIcon from "@mui/icons-material/AssignmentSharp";
import { useNavigate } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import { OTContext } from "../context/OTContext";
import EmergencyShareIcon from "@mui/icons-material/EmergencyShare";
import ReactDOMServer from "react-dom/server";
import {
  LayersControl,
  MapContainer,
  Marker,
  TileLayer,
  Tooltip,
  useMap,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
const iconMarkup = ReactDOMServer.renderToString(
  <EmergencyShareIcon
    style={{
      color: "red",
      fontSize: "40px",
      filter: "drop-shadow(3px 3px 1px rgba(2, 2, 2, 0.95))",
    }}
  />
);
const customIcon = new L.DivIcon({
  html: iconMarkup,
  className: "", // para que no tenga estilos por defecto
  iconSize: [32, 32],
  iconAnchor: [16, 32], // ajusta si el ícono está desalineado
});
function Historial() {
  const { db1, userData } = useContext(UserContext);
  const [eventos, setEventos] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredEventos, setFilteredEventos] = useState(eventos);
  const tablaRef = useRef(null);
  const [ack, setAck] = useState(0);
  const [nonAck, setNonAck] = useState(0);
  const [caso, setCaso] = useState({});
  let navigate = useNavigate();
  const [position, setPosition] = useState([]);
  const [openMap, setOpenMap] = useState(false);
  const CloseMap = () => setOpenMap(false);
  /**
   * Modal para cerrar el caso
   */
  const [observaciones, setObservaciones] = useState("");
  const [openModal, setOpenModal] = useState(false);

  const CloseModal = () => setOpenModal(false);

  /**
   * context para la orden de trabajo
   */
  const { setEmisor, setDataEvento } = useContext(OTContext);

  /**
   * Headers para el archivo CSV
   */
  const headers = [
    { label: "Nº", key: "index" },
    { label: "Fecha", key: "fecha" },
    { label: "Estación", key: "estacion" },
    { label: "Evento", key: "evento" },
    { label: "Usuario", key: "usuario" },
    { label: "Teléfono", key: "telefono" },
    { label: "Email", key: "email" },
    { label: "Estado", key: "atendido" },
  ];
  const [currentPage, setCurrentPage] = useState(0);
  const [eventsPerPage, setEventsPerPage] = useState(10);

  // Calcular el índice de los eventos para la página actual
  const offset = currentPage * eventsPerPage;
  const currentEvents = filteredEventos.slice(offset, offset + eventsPerPage);

  // Calcular el número total de páginas
  const pageCount = Math.ceil(filteredEventos.length / eventsPerPage);

  // Función que se llama cuando se cambia de página
  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
    if (tablaRef.current) {
      tablaRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };
  /**
   * leemos ala base de datos en tiempo real
   */

  useEffect(() => {
    const starCountRef = ref(db1, "eventos");
    const queryEvent = query(starCountRef, orderByChild("fecha"));
    onValue(queryEvent, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        const eventosArray = Object.keys(data)
          .map((key, index) => ({
            ...data[key],
            id: key,
            index: index + 1,
          }))
          .reverse();

        setEventos(eventosArray);
        let atend = 0;
        let noAtend = 0;
        eventosArray.forEach((evento) => {
          if (evento.atendido) {
            atend++;
          } else {
            noAtend++;
          }
        });
        setAck(atend);
        setNonAck(noAtend);
      } else {
        console.log("no se encontraron los eventos");
      }
    });
  }, [db1]);

  /**
   * buscamos los eventos descritos en el cuadro de busqueda
   */
  useEffect(() => {
    const filtered = eventos.filter((evento) =>
      `${dayjs(evento.fecha).format("YYYY/MM/DD HH:MM:ss")} ${evento.evento} ${
        evento.usuario
      } ${evento.telefono} ${evento.email} ${evento.estacion} ${
        evento.atendido
      }`
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    );
    setFilteredEventos(filtered);
  }, [searchTerm, eventos]);

  /**
   * llamar al reporte
   */

  const handleReport = (event) => {
    event.preventDefault();

    navigate("/reporte_trabajo");
  };

  return (
    <Container
      fluid
      style={{
        height: "80vh",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}
    >
      <div ref={tablaRef} style={{ flexGrow: 1, maxHeight: "70vh" }}>
        <Table hover size="sm">
          <thead className="tableHead">
            <tr>
              <td colSpan={11} className="tableHeader">
                <div
                  style={{
                    backgroundColor: "transparent",
                    width: "100%",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",

                    alignItems: "center",
                    paddingLeft: "10px",
                    paddingRight: "10px",
                  }}
                >
                  <span className="divLogo">HISTORIAL DE EVENTOS</span>
                  <span
                    style={{
                      backgroundColor: "transparent",
                      color: "white",
                      fontSize: "0.9rem",
                    }}
                    onClick={() => {
                      setSearchTerm("true");
                    }}
                  >
                    <VerifiedUserSharpIcon /> Atendidos: {ack}{" "}
                  </span>
                  <span
                    style={{
                      backgroundColor: "transparent",
                      color: "white",
                      fontSize: "0.9rem",
                    }}
                    onClick={() => {
                      setSearchTerm("false");
                    }}
                  >
                    <GppBadSharpIcon /> No atendidos: {nonAck}
                  </span>
                  <span
                    style={{
                      backgroundColor: "transparent",
                      color: "white",
                      fontSize: "0.9rem",
                    }}
                    onClick={() => {
                      setSearchTerm(" ");
                    }}
                  >
                    <PrivacyTipSharpIcon />
                    Total: {eventos.length}{" "}
                  </span>
                  <span>
                    <div
                      style={{
                        width: "200px",
                        display: "flex",
                        justifyContent: "space-between",
                        fontSize: "0.9rem",
                      }}
                    >
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
                    </div>
                  </span>
                  <span
                    style={{
                      backgroundColor: "transparent",
                      color: "white",
                      fontSize: "0.9rem",
                    }}
                  >
                    <CSVLink
                      data={currentEvents}
                      headers={headers}
                      filename="Eventos reportados.csv"
                      style={{
                        textDecoration: "none",
                        color: "white",
                        fontSize: "0.9rem",
                      }}
                      target="blank"
                    >
                      <FileDownloadSharpIcon />
                      Exportar a CSV
                    </CSVLink>
                  </span>
                </div>
              </td>
            </tr>
            <tr>
              <th>#</th>
              <th>Fecha</th>
              <th>Estacion</th>
              <th>Evento</th>
              <th>Motivo</th>
              <th>Usuario</th>
              <th>Telefono</th>
              <th>Email</th>
              <th>Coord. Evento</th>
              <th>Atendido</th>
              <th>Acciones</th>
            </tr>
          </thead>
          {currentEvents.length >= 1 ? (
            <tbody style={{ fontSize: "9pt" }}>
              {currentEvents.map((evento, index) => {
                return (
                  <tr key={index}>
                    <td>{evento.index}</td>
                    <td>{evento.fecha}</td>
                    <td>{evento.estacion}</td>
                    <td>{evento.evento}</td>
                    <td>{evento.motivo}</td>
                    <td>{evento.usuario}</td>
                    <td>{evento.telefono}</td>
                    <td>{evento.email}</td>
                    {evento.latu != null ? (
                      <td
                        onClick={() => {
                          setCaso(evento);
                          setPosition([evento.latu, evento.longu]);
                          setOpenMap(true);
                        }}
                      >
                        {evento.latu}, {evento.longu}{" "}
                        <TravelExploreIcon style={{ color: "green" }} />
                      </td>
                    ) : (
                      <td></td>
                    )}
                    <td
                      style={{
                        backgroundColor: evento.atendido
                          ? "rgb(100,200,100)"
                          : "rgb(250,50,50)",
                        color: "rgb(10,10,10)",
                        textAlign: "center",

                        fontWeight: "bold",
                      }}
                    >
                      {evento.atendido ? "Atendido" : "No atendido"}
                    </td>
                    <td>
                      {evento.atendido ? (
                        <MTooltip title="Ver detalles" placement="right" arrow>
                          <button
                            style={{
                              backgroundColor: "transparent",
                              color: "rgb(10,100,20)",
                              border: "none",
                            }}
                            onClick={() => {
                              setCaso(evento);
                              setOpenModal(true);
                            }}
                          >
                            <VisibilitySharpIcon />
                          </button>
                        </MTooltip>
                      ) : (
                        <div style={{ display: "flex", flexDirection: "row" }}>
                          <MTooltip title="Cerrar caso" placement="right" arrow>
                            <button
                              style={{
                                backgroundColor: "transparent",
                                color: "rgb(10,100,180)",
                                border: "none",
                              }}
                              onClick={() => {
                                setCaso(evento);

                                setOpenModal(true);
                              }}
                            >
                              <GradingSharpIcon />
                            </button>
                          </MTooltip>
                          <MTooltip title="Generar OT" placement="right" arrow>
                            <button
                              style={{
                                backgroundColor: "transparent",
                                color: "rgb(10,180,190)",
                                border: "none",
                              }}
                              onClick={(event) => {
                                setEmisor({
                                  nombre: userData.user,
                                  email: userData.email,
                                });
                                setDataEvento({
                                  detalles: evento.evento,
                                  usuario: evento.usuario,
                                  cel: evento.telefono,
                                  email: evento.email,
                                  estacion: evento.estacion,
                                  motivo: evento.motivo,
                                  fecha: evento.fecha,
                                  numeroOt: evento.index,
                                });

                                handleReport(event);
                              }}
                            >
                              <AssignmentSharpIcon />
                            </button>
                          </MTooltip>
                        </div>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          ) : (
            <tbody>
              <tr>
                <td colSpan={9} style={{ textAlign: "center" }}>
                  No se encontraron datos
                </td>
              </tr>
            </tbody>
          )}
        </Table>
      </div>

      {/** Paginacion */}
      <div
        style={{
          display: "flex",
          justifyContent: "end",
          alignItems: "center",
          padding: "8px",
          backgroundColor: "#fff",
          height: "60px", // altura fija para paginación
          borderTop: "1px solid #ccc",
        }}
      >
        <label style={{ padding: "8px 8px" }}>Filas por página </label>
        <Form.Select
          style={{ width: "5rem", height: "2rem", marginTop: "3px" }}
          size="sm"
          value={eventsPerPage}
          onChange={(e) => {
            setEventsPerPage(Number(e.target.value));
            setCurrentPage(0); // Reiniciar a la primera página
          }}
        >
          <option>5</option>
          <option>10</option>
          <option>15</option>
          <option>30</option>
          <option>100</option>
        </Form.Select>
        <ReactPaginate
          previousLabel={"Anterior"}
          nextLabel={"Siguiente"}
          breakLabel={"..."}
          pageCount={pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={handlePageClick}
          containerClassName={"pagination"}
          subContainerClassName={"pages pagination"}
          activeClassName={"active"}
          forcePage={currentPage}
        />
      </div>

      {/**
  Modal para cerrar el caso
   */}
      <Modal show={openModal} onHide={CloseModal} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>
            <div>
              {caso.atendido ? (
                <span>Caso #{caso.index}</span>
              ) : (
                <span>Cerrar caso #{caso.index}</span>
              )}
            </div>
            <div
              style={{
                fontSize: "12pt",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <label>
                {" "}
                <strong>Estación de alarma:</strong> {caso.estacion}
              </label>
              <label>
                <strong>Fecha de cierre:</strong> {new Date().toLocaleString()}
              </label>
            </div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <label>
                <strong>Fecha del evento: </strong>
                {caso.fecha}
              </label>
              <label>
                <strong>Motivo del evento: </strong>
                {caso.motivo}
              </label>
              <label>
                <strong>Detalles del evento: </strong>
                {caso.evento}
              </label>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                paddingTop: "5px",
                paddingBottom: "5px",
              }}
            >
              <label>
                <strong>Usuario:</strong> {caso.usuario}
              </label>
              <label>
                <strong>Teléfono:</strong> {caso.telefono}
              </label>
              <label>
                <strong>Email:</strong> {caso.email}
              </label>
            </div>

            {caso.atendido ? (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  borderTop: "1px solid #ccc",
                  paddingTop: "10px",
                }}
              >
                <label>
                  <strong> El caso se cerró con los siguientes detalles</strong>
                </label>
                <label>
                  {" "}
                  <strong>Fecha de cierre: </strong>
                  {caso.fechaCierre}
                </label>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <label>
                    <strong>Responsable: </strong>
                    {caso.responsable}
                  </label>
                  <label>
                    <strong>Email: </strong>
                    {caso.emailResponsable}
                  </label>
                </div>
                <label>
                  <strong>Observaciones: </strong>
                  {caso.observaciones}
                </label>
              </div>
            ) : (
              <div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    paddingTop: "10px",
                    borderTop: "1px solid #ccc",
                  }}
                >
                  <label>
                    <strong>
                      Complete los datos para poder cerrar el caso
                    </strong>
                  </label>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      paddingTop: "5px",
                      paddingBottom: "5px",
                    }}
                  >
                    <label>
                      <strong>Responsable: </strong>
                      {userData.user}
                    </label>
                    <label>
                      <strong>Email: </strong>
                      {userData.email}
                    </label>
                  </div>
                  <div>
                    <Form>
                      <Form.Group
                        as={Row}
                        className="mb-3"
                        controlId="formHorizontalEmail"
                      >
                        <Form.Label column sm={2}>
                          Observaciones:
                        </Form.Label>
                        <Col sm={10}>
                          <Form.Control
                            as="textarea"
                            rows={3}
                            placeholder="Observaciones"
                            style={{ width: "100%" }}
                            value={observaciones}
                            onChange={(e) => setObservaciones(e.target.value)}
                          />
                        </Col>
                      </Form.Group>
                    </Form>
                  </div>
                </div>
                <div style={{ paddingTop: "20px" }}>
                  <span>¿Está seguro de que desea cerrar este caso?</span>
                  <Button
                    onClick={() => {
                      const eventoRef = ref(db1, `eventos/${caso.id}`);
                      const now = new Date().toLocaleString();

                      // Actualiza el evento en Firebase
                      update(eventoRef, {
                        atendido: true,
                        responsable: userData.user,
                        emailResponsable: userData.email,
                        observaciones: observaciones,
                        fechaCierre: now,
                        // otras propiedades que quieras actualizar
                      })
                        .then(() => {
                          setObservaciones("");
                          setOpenModal(false);
                          console.log("Evento actualizado correctamente");
                        })
                        .catch((error) => {
                          console.log("Error al actualizar el evento:", error);
                        });
                    }}
                    // disabled={!caso.estado}
                  >
                    {" "}
                    Aceptar
                  </Button>
                </div>
              </div>
            )}
          </div>
        </Modal.Body>
      </Modal>

      {/**
Modal para mostrar el mapa con la ubicación
 */}
      <Modal show={openMap} onHide={CloseMap} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Ubicación donde suscitó el evento</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div style={{ width: "100%", height: "70vh" }} className="pt-2">
          <div>Usuario:{caso.usuario}, Teléfono.:{caso.telefono}</div>
            <MapContainer
              center={position}
              zoom={18}
              scrollWheelZoom={true}
              style={{ width: "100%", height: "90%" }}
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

              <Marker key={1} position={position} icon={customIcon}>
                {/** 
                  <Tooltip>
                    <label>{evento.usuario}</label>
                  </Tooltip>
                  */}
              </Marker>
            </MapContainer>
          </div>
        </Modal.Body>
      </Modal>
    </Container>
  );
}

export default Historial;
