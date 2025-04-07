import { useContext, useEffect, useState } from "react";
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

import DownloadIcon from "@mui/icons-material/Download";
import { DataContext } from "../context/DataContext";
import alcaldia from "../assets/images/alcaldiah1.png";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import ToolBar from "../components/ToolBar";
function Home() {
  const navigate = useNavigate();

  /**
   * obtenemos los datos del inicio de sesion
   */
  const { userData } = useContext(UserContext);
  const [sess, setSess] = useState("");
  /**
   * variables para usar con la api de wialon
   *  */

  const [subcuentaID, setSubcuentaID] = useState("");
  const [ids,setIds]=useState([]);
  /**
   * Verificamos si el usuario está logueado
   */

  useEffect(() => {
    setSess(userData.sesion);

    if (userData.user === "") {
      navigate("/");
    }
    searchStation();
  }, [userData, sess]);

  /**
   *
   * Buscamos las estaciones de alarma
   */

  const searchStation = async () => {
    if (!sess || typeof sess.updateDataFlags !== "function") {
      console.error("sess no está correctamente inicializado.");
      return;
    }

    /**
     * configuramos las banderas para la api
     */
    var flags = wialon.item.Item.dataFlag.base | wialon.item.Resource.dataFlag.reports;
    


    /**
     * Buscamos la id de la subcuenta
     *
     */

    sess.searchItems(
      {
        itemsType: "user",
        propName: "sys_name",
        propValueMask:"*" ,//userData.entidad,
        sortType: "sys_name",
      },
      1,
      flags,
      0,
      0,

      (error, data) => {
        if (error) {
          console.log(wialon.core.Errors.getErrorText(error));
          return;
        }
       
        const ides=(data.items).map(item=>item._id);
        setIds(ides);
       
        setSubcuentaID(data.items[0]._id);
      }
    );
  };
  useEffect(() => {
    if (subcuentaID) {
      /**
       * Buscamos las estaciones asociadas a la subcuenta
       */

      sess.searchItems(
        {
          itemsType: "avl_unit",
          propName: "sys_user_creator",
          propValueMask: subcuentaID,
          sortType: "sys_name",
        },
        1,
        1025,
        0,
        0,

        (error, data) => {
          if (error) {
            console.log(wialon.core.Errors.getErrorText(error));
            return;
          }
          console.log(data);
        }
      );

      loadMessages();
    }
  }, [subcuentaID]);

  /**
   * método para obtener los reportes
   *
   */
  const loadMessages = () => {
    var to = sess.getServerTime(); // tiempo actual
    var from = to - 3600 * 24; //tiempo actual menos 24 horas
    var ml = sess.getMessagesLoader();
    for(var i=0;i<=ids.length;i++){


      ml.loadInterval(ids[i], from, to, 0, 0, 100, (code, data) => {
        if (code) {
          console.log(wialon.core.Errors.getErrorText(code));
        } else {
          console.log("ID "+ids[i]+" "+data.count+ " mensajes encontrados");
          console.log(data)
        }
      });
    
    }
  };

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
        <Col lg={8} md={12} sm={12} xs={12} className="m-0 p-0">
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
        <Col lg={4} md={12} sm={12} xs={12} className="m-0 pt-2 pb-0">
          <Card
            style={{ maxHeight: "71vh", padding: 10, overflowY: "auto" }}
            bg="light"
            hidden={neighborhood.name === ""}
          >
            <Container fluid>
              <Table size="sm">
                <thead className="tableHead">
                  <tr>
                    <td
                      colSpan={4}
                      className="tableHeader"
                      style={{ border: "none", textAlign: "center" }}
                    >
                      {neighborhood.name}
                    </td>
                  </tr>

                  <tr>
                    <th className="tableHeader">#</th>
                    <th className="tableHeader">Fecha</th>
                    <th className="tableHeader">Hora</th>
                    <th className="tableHeader">Activado por</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredEventos.map((evento, index) => (
                    <tr key={index}
                
                 >
                      <td  className="tableRow">{index + 1}</td>
                      <td className="tableRow">{evento.fecha}</td>
                      <td className="tableRow">{evento.hora}</td>
                      <td className="tableRow">{evento.activadoPor}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Container>
          </Card>
          <Card
            bg="light"
            style={{ padding: 10 }}
            hidden={neighborhood.name === ""}
          >
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
          {/**
           * muestra el logotipo en lugar de la tabla con los reportes de eventos, cuando no se a seleccionado ninguna estación de alarma
           */}
          {(!neighborhood.name || neighborhood.name === "") && (
            <Container
              fluid
              className="d-flex justify-content-center align-items-center align-content-center"
              style={{ height: "80vh" }}
            >
              <img src={alcaldia} width="100%" />
            </Container>
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default Home;
