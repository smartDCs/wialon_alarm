import { useContext, useEffect, useState } from "react";
import { Col, Container, Form, Row, Table } from "react-bootstrap";
import "../styles/Styles.css";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import EmergencyShareIcon from '@mui/icons-material/EmergencyShare';
import ReactDOMServer from 'react-dom/server'
import PictureAsPdfSharpIcon from '@mui/icons-material/PictureAsPdfSharp';

import {
  LayersControl,
  MapContainer,
  Marker,
  TileLayer,
  Tooltip,
} from "react-leaflet";
import L from 'leaflet'
import "leaflet/dist/leaflet.css";
import LinkSharpIcon from '@mui/icons-material/LinkSharp';
import LinkOffSharpIcon from '@mui/icons-material/LinkOffSharp';
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import NotificationsOffIcon from "@mui/icons-material/NotificationsOff";

import DownloadIcon from "@mui/icons-material/Download";
import { DataContext } from "../context/DataContext";
import alcaldia from "../assets/images/alcaldiah1.png";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import ToolBar from "../components/ToolBar";
function Home() {
  const navigate = useNavigate();
  const [selectedRows, setSelectedRows] = useState([]);
const linked=false;
  const iconMarkup = ReactDOMServer.renderToString(<EmergencyShareIcon style={{ color: 'red', fontSize: '40px',  filter: 'drop-shadow(3px 3px 1px rgba(2, 2, 2, 0.95))' }} />)

  const customIcon = new L.DivIcon({
    html: iconMarkup,
    className: '', // para que no tenga estilos por defecto
    iconSize: [32, 32],
    iconAnchor: [16,32], // ajusta si el ícono está desalineado
  })

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

  const { neighborhood, setNeighborhood } = useContext(DataContext);

/**
 * 
 */
const [unidades, setUnidades] = useState([]);
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
    var flags = wialon.item.Item.dataFlag.base | wialon.item.Resource.dataFlag.reports |wialon.item.Unit.dataFlag.lastMessage;
    


    /**
     * Buscamos los grupos creados por el usuario 
     *
     */

    sess.searchItems(
      {
        itemsType: "avl_unit_group",
        propName: "rel_user_creator_name",
        propValueMask:"XAVIER" ,//filtramos por el nombre del usuario que queremos encontrar
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





const grupo=data.items[0];
const unitsId=grupo.getUnits();
const tempUnidades = [];

unitsId.forEach((unidadId) => {
  sess.searchItems(
    {
      itemsType: "avl_unit",
      propName: "sys_id",
      propValueMask:unidadId ,//filtramos por el id de la unidad
      sortType: "sys_name",
    },
    1,
    6817569,
    0,
    0,
    (error, resultado) => {
      if (error) {
        console.log(wialon.core.Errors.getErrorText(error));
        return;
      }

      const unidad = resultado.items[0];
      
//console.log("comandos",unidad.getCommands());
      tempUnidades.push({
        name: unidad.getName(),
        id: unidad.getId(),
        lng: unidad.getPosition().x,
        lat: unidad.getPosition().y,
        phone:unidad.$$user_phoneNumber,
        commands: unidad.getCommands(),
       unit:unidad

      });

      // Solo actualizamos el estado una vez tengamos todas
      if (tempUnidades.length === unitsId.length) {
        setUnidades(tempUnidades);
      }

   
  
    }
  );
});


   }
    );
  };

/**
 * cuando selecciona una estación ubicada en el mapa
 */
useEffect(()=>{
console.log("seleccionados",selectedRows);
console.log("unidades",unidades);
},[selectedRows])
useEffect(()=>{
  console.log("neighborhood",neighborhood);
  
  },[neighborhood])

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
 
    /**
     * exportar datos de la tabla de eventos a un archivo csv
     */
    const exportToCSV = () => {
      const csvContent =
        'data:text/csv;charset=utf-8,' +
        [Object.keys(eventos[0]).join(','), ...eventos.map(row => Object.values(row).join(','))].join('\n');
  
      const encodedUri = encodeURI(csvContent);
      const link = document.createElement('a');
      link.setAttribute('href', encodedUri);
      link.setAttribute('download', `${neighborhood.name}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    };
  return (
    <Container fluid className="m-0 p-0 ">
      <Row className="m-0 p-0">
      <Col lg={3} md={12} sm={12} xs={12} className="m-0 p-0">
          <Card
            style={{ maxHeight: "79vh", padding: 10, overflowY: "auto" }}
            bg="light"
          >
            <Container fluid >
            <Table size="sm">
                <thead className="tableHead">
                  <tr>
                    <td
                      colSpan={4}
                      className="tableHeader"
                      style={{ border: "none", textAlign: "center" }}
                    >
                      Estaciones de alarma
                    </td>
                  </tr>
                </thead>
                <tbody>
    {unidades.map((unidad, index) => {
      const isSelected = selectedRows.includes(unidad.unit);

      const toggleRow = () => {
        if (isSelected) {
          setSelectedRows(selectedRows.filter(i => i !== unidad.unit));
        } else {
          setSelectedRows([...selectedRows, unidad.unit]);
        }
      };

      return (
        <tr key={index} className={isSelected ? "selectedRow" : ""}>
          <td>
            <input type="checkbox" checked={isSelected} onChange={toggleRow} />
          </td>
          <td className="tableRow">{unidad.name}</td>
          <td className="tableRow">
            {linked ? <LinkSharpIcon style={{ color: "green" }} /> : <LinkOffSharpIcon style={{ color: "red" }} />}
          </td>
          <td className="tableRow">
            <NotificationsActiveIcon style={{ color: "orange" }} />
          </td>
          <td className="tableRow">
            <NotificationsOffIcon style={{ color: "red" }} />
          </td>
        </tr>
      );
    })}
  </tbody>
              </Table>
            </Container>
            {selectedRows.length > 1?<Row>
              <Button>activar grupo</Button>
              <Button>desactivar grupo</Button>
            </Row>  :<></>
            }
          
          </Card>

      </Col>
        <Col lg={6} md={12} sm={12} xs={12} className="m-0 p-0">
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

              {unidades.map((alarma, index) => (
                <Marker
                  key={index}
                  position={[alarma.lat, alarma.lng]}
                  icon={customIcon}
                  eventHandlers={{
                    click: () => {
                      setNeighborhood({
                        name: alarma.name,
                        lat: alarma.lat,
                        lng: alarma.lng,
                        id: alarma.id,
                        phone: alarma.phone,
                        commands: alarma.commands,
                        unit: alarma.unit,
                      });
                     
                    },
                  }}
                >
                <EmergencyShareIcon/>
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
        <Col lg={3} md={12} sm={12} xs={12} className="m-0 pt-2 pb-0">
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
                <Row className="p-0">
                  {" "}
                  <Button className="btnDownload"
                 onClick={exportToCSV}
                  >
                    <DownloadIcon /> Exportar csv
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
