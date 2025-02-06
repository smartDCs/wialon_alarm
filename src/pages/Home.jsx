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
import ToolBar from "../components/ToolBar";
import DownloadIcon from "@mui/icons-material/Download";
import { DataContext } from "../context/DataContext";
import alcaldia from "../assets/images/alcaldiah1.png";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
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
    var flags = wialon.item.Item.dataFlag.base;
    /**
     * Obtenemos la id de la subcuenta correspondiente a la entidad
     */
    /*
  sess.updateDataFlags(
    [{
      type:"type",
      data:"avl_unit",
      flags:flags,
      mode:0
    }],
    function (code){
      
      if(code){
        console.log(wialon.core.Errors.getErrorText(code))
        return;
      }
      /**
       * obtenemos las unidades cargadas
       */
    /*
      var units=sess.getItems("avl_unit");
      if(!units || !units.length){
        console.log("no se encontraron dispositivos");
        return;
      }
        */
    /**
      * muestra los nombres de todas las unidades encontradas
      *
      for(var i=0;i<units.length;i++){
        var u=units[i];
        console.log("unidad "+u.getId()+" "+u.getName())
      }
*/

    /*
    }
  )
*/
    /**
     * Buscamos la id de la subcuenta
     *
     */

    sess.searchItems(
      {
        itemsType: "user",
        propName: "sys_name",
        propValueMask: userData.entidad,
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
    }
  }, [subcuentaID]);

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
            hidden={neighborhood.name === ""}
          >
            <Container fluid>
              <Table striped hover size="sm">
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
          <Container
            fluid
            hidden={neighborhood.name != ""}
            className="d-flex justify-content-center align-items-center align-content-center"
            style={{ height: "80vh" }}
          >
            <img src={alcaldia} width="100%" />
          </Container>
        </Col>
      </Row>
    </Container>
  );
}

export default Home;
