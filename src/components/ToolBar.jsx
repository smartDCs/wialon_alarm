import { Button, Card, Col, Row } from "react-bootstrap";

import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import NotificationsOffIcon from "@mui/icons-material/NotificationsOff";
import MarkChatUnreadIcon from "@mui/icons-material/MarkChatUnread";
import { Tooltip } from "@mui/material";
import ListAltIcon from "@mui/icons-material/ListAlt";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import PortableWifiOffIcon from "@mui/icons-material/PortableWifiOff";
import SimCardDownloadIcon from "@mui/icons-material/SimCardDownload";
import VolumeOffIcon from "@mui/icons-material/VolumeOff";
import { useContext } from "react";
import { DataContext } from "../context/DataContext";
import grupo from "../assets/images/grupo.png";
import grupo_off from "../assets/images/grupo1.png";
function ToolBar() {
  const { neighborhood } = useContext(DataContext);

  return (
    <Card className="bg-dark ">
      <div
       style={{
        display: "flex",
        justifyContent: "space-between",
      
        width: "100%",
        padding:0,
        margin:0
      }}
      >
      <label style={{ fontSize: "0.8rem", color:"white" }}>{neighborhood.name}</label>
       
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
        
          width: "100%",
          padding:0,
          margin:0
        }}
      >
       <Tooltip title={`Activar Alarma ${neighborhood.name}`}>
          <Button
            variant="light"
            className="buttonAlarm"
            hidden={neighborhood.name === ""}
          >
            <NotificationsActiveIcon />
            
          </Button>
        </Tooltip>
        <Tooltip title={`Desactivar Alarma ${neighborhood.name}`}>
          <Button
            variant="light"
            className="buttonAlarm"
            hidden={neighborhood.name === ""}
          >
            <NotificationsOffIcon />
          
          </Button>
        </Tooltip>
        <Tooltip title="Activar por grupo">
          <Button variant="light" className="buttonAlarm">
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
             <img src={grupo} width={32} className="imagen"/>
            
            </div>
          </Button>
        </Tooltip>
        <Tooltip title="Desactivar por grupo">
          <Button variant="light" className="buttonAlarm">
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <img src={grupo_off} width={32} className="imagen"/>
             
            </div>
          </Button>
        </Tooltip>
        <Tooltip title="Nuevas alarmas">
          <div style={{ width: "50px", height: "32px", position: "relative" }}>
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
          <div style={{ width: "50px", height: "32px", position: "relative" }}>
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
      </div>
    </Card>
  );
}

export default ToolBar;
