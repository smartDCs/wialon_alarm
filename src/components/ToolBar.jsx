import { Button, Card, Col, Row } from "react-bootstrap";

import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import NotificationsOffIcon from "@mui/icons-material/NotificationsOff";
import MarkChatUnreadIcon from "@mui/icons-material/MarkChatUnread";
import { Tooltip } from "@mui/material";
import ListAltIcon from "@mui/icons-material/ListAlt";
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import PortableWifiOffIcon from "@mui/icons-material/PortableWifiOff";
import SimCardDownloadIcon from '@mui/icons-material/SimCardDownload';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import { useContext } from "react";
import { DataContext } from "../context/DataContext";
function ToolBar() {
const {neighborhood}=useContext(DataContext);

  return (
    <Card className="bg-dark ">
      <Row >
      {/**
      Columna con el nombre de la alarma
       */}
        <Col lg={2} md={2} sm={2} xs={2} style={{ color: "white" }}>
          <label style={{fontSize:"0.6rem"}}>{neighborhood.name}</label>
        </Col>
 {/**
      Columna con los botones de las alarmas
       */}
        <Col lg={5} md={5} sm={5} xs={5} style={{ display: "flex", justifyContent:"space-between" }}>


          <Tooltip title={`Activar Alarma ${neighborhood.name}`}>
            <Button variant="light" className="buttonAlarm"
           hidden={neighborhood.name === ""} 

            >
              <NotificationsActiveIcon />
            </Button>
          </Tooltip>
          <Tooltip title={`Desactivar Alarma ${neighborhood.name}`}>
            <Button variant="light" className="buttonAlarm"
             hidden={neighborhood.name === ""} 
            >
              <NotificationsOffIcon />
            </Button>
          </Tooltip>
          {/**
          Control por grupo de alarmas
           */}
          <div className = "lblAlarmas" >
          <div style={{display:"flex", alignItems:"center", paddingLeft:2}}>
            <label style={{fontSize:"0.7rem", color:"white"}}>Grupos</label>
          </div>
          <Tooltip title="Activar por grupo">
            <Button variant="light" className="buttonAlarm"
            
            >
              <div style={{display:"flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
              <VolumeUpIcon/>
              <label style={{fontSize:"0.6rem"}}>Activar </label>
              </div>
            </Button>
          </Tooltip>
          <Tooltip title="Desactivar por grupo">
       
          <Button variant="light" className="buttonAlarm"
            
            >
            <div style={{display:"flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
              <VolumeOffIcon/>
              <label style={{fontSize:"0.6rem"}}>Desactivar </label>
              </div>
            </Button>
         
            
          </Tooltip>
</div>
           
          <Tooltip title="Nuevas alarmas">
            <div
              style={{ width: "50px", height: "32px", position: "relative" }}
            >
              <div
                style={{
                  display: "flex",
                  position: "absolute",
                  backgroundColor: "orange",
                  borderRadius: "50%",
                  width: "25px",
                  height: "25px",
                  top: 0,
                  right: 0,
                  justifyContent: "center",
                  fontWeight: "bolder",
                }}
              >
                32
              </div>
              <Button variant="light" className="buttonAlarm">
                <MarkChatUnreadIcon />
              </Button>
            </div>
          </Tooltip>
        </Col>
         {/**
      Columna con los botones para la lista de las alarmas
       */}
        <Col lg={5} md={5} sm={5} xs={5} className="text-white lblAlarmas">
          <Tooltip title="Ver todas las estaciones">
            <Button variant="light" className="buttonAlarm">
              {" "}
              <ListAltIcon />
            </Button>
          </Tooltip>
          <Tooltip title="Descargar reporte de todas las estaciones">
            <Button variant="light" className="buttonAlarm">
              {" "}
              <SimCardDownloadIcon />
            </Button>
          </Tooltip>
          <Tooltip title="Estaciones sin conexión">

          <div
              style={{ width: "50px", height: "32px", position: "relative" }}
            >
              <div
                style={{
                  display: "flex",
                  position: "absolute",
                  backgroundColor: "red",
                  borderRadius: "50%",
                  width: "25px",
                  height: "25px",
                  top: 0,
                  right: 0,
                  justifyContent: "center",
                  fontWeight: "bolder",
                }}
              >
                32
              </div>
              <Button variant="light" className="buttonAlarm">
              {" "}
              <PortableWifiOffIcon />
            </Button>
            </div>


          
          </Tooltip>
        </Col>
      </Row>
    </Card>
  );
}

export default ToolBar;
