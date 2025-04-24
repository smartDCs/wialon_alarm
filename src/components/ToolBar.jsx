import { Button, Card } from "react-bootstrap";

import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import NotificationsOffIcon from "@mui/icons-material/NotificationsOff";
import MarkChatUnreadIcon from "@mui/icons-material/MarkChatUnread";
import { Tooltip } from "@mui/material";
import ListAltIcon from "@mui/icons-material/ListAlt";
import VolumeOffSharpIcon from "@mui/icons-material/VolumeOffSharp";
import PortableWifiOffIcon from "@mui/icons-material/PortableWifiOff";
import SimCardDownloadIcon from "@mui/icons-material/SimCardDownload";
import VolumeUpSharpIcon from "@mui/icons-material/VolumeUpSharp";

import { useContext, useState, useEffect } from "react";
import { DataContext } from "../context/DataContext";
import grupo from "../assets/images/grupo.png";
import grupo_off from "../assets/images/grupo1.png";
import { UserContext } from "../context/UserContext";
function ToolBar() {
  const { neighborhood } = useContext(DataContext);
  const { userData } = useContext(UserContext);
  const [sess, setSess] = useState("");

  useEffect(() => {
    setSess(userData.sesion);
  }, [userData]);

  return (
    <Card className="bg-dark ">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",

          width: "100%",
          padding: 0,
          margin: 0,
        }}
      >
        <label style={{ fontSize: "0.8rem", color: "white" }}>
          {neighborhood.name}
        </label>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",

          width: "100%",
          padding: 0,
          margin: 0,
        }}
      >
        <Tooltip title={`Activar Alarma ${neighborhood.name}`}>
          <Button
            variant="light"
            className="buttonAlarm"
            hidden={neighborhood.name === ""}
            onClick={() => {
              // Enviar SMS

              // Ejecutar el comando en la unidad seleccionada, usando el ID del comando
              const unit = neighborhood.unit;
              unit.remoteCommand(
                "1 ACTIVAR ALARMA",
                "",
                "AT+GTOUT=gv300,1,,,0,0,0,0,0,0,0,,0,0,,,,FFFF$",
                0,
                function (result) {
                  console.log(
                    "resultado",
                    wialon.core.Errors.getErrorText(result)
                  );
                  if (result.success) {
                    console.log("Comando enviado con éxito:", result);
                  } else {
                    console.error(
                      "Error al enviar el comando:",
                      wialon.core.Errors.getErrorText(result)
                    );
                  }
                }
              );

              console.log("activar alarma de ", neighborhood);
            }}
          >
            <NotificationsActiveIcon />
          </Button>
        </Tooltip>
        <Tooltip title={`Desactivar Alarma ${neighborhood.name}`}>
          <Button
            variant="light"
            className="buttonAlarm"
            hidden={neighborhood.name === ""}
            onClick={() => {
              // Enviar SMS

              // Ejecutar el comando en la unidad seleccionada, usando el ID del comando
              const unit = neighborhood.unit;
              unit.remoteCommand(
                "2 DESACTIVAR ALARMA",
                "",
                "AT+GTOUT=gv300,0,,,0,0,0,0,0,0,0,,0,0,,,,FFFF$",
                0,
                function (result) {
                  console.log(
                    "resultado",
                    wialon.core.Errors.getErrorText(result)
                  );
                  if (result.success) {
                    console.log("Comando enviado con éxito:", result);
                  } else {
                    console.error(
                      "Error al enviar el comando:",
                      wialon.core.Errors.getErrorText(result)
                    );
                  }
                }
              );

              console.log("activar alarma de ", neighborhood);
            }}
          >
            <NotificationsOffIcon />
          </Button>
        </Tooltip>

        {/**
activar perifoneo
 */}
        <Tooltip title={`Activar Perifoneo ${neighborhood.name}`}>
          <Button
            variant="light"
            className="buttonAlarm"
            hidden={neighborhood.name === ""}
            onClick={() => {
              // Enviar SMS

              // Ejecutar el comando en la unidad seleccionada, usando el ID del comando
              const unit = neighborhood.unit;
              unit.remoteCommand(
                "3 ACTIVAR PERIFONEO",
                "",
                "AT+GTOUT=gv300,0,,,1,0,0,0,0,0,0,,0,0,,,,FFFF$",
                0,
                function (result) {
                  console.log(
                    "resultado",
                    wialon.core.Errors.getErrorText(result)
                  );
                  if (result.success) {
                    console.log("Comando enviado con éxito:", result);
                  } else {
                    console.error(
                      "Error al enviar el comando:",
                      wialon.core.Errors.getErrorText(result)
                    );
                  }
                }
              );

              console.log("activar alarma de ", neighborhood);
            }}
          >
            <VolumeUpSharpIcon />
          </Button>
        </Tooltip>
        {/**
desactivar perifoneo
 */}
        <Tooltip title={`Desactivar Perifoneo ${neighborhood.name}`}>
          <Button
            variant="light"
            className="buttonAlarm"
            hidden={neighborhood.name === ""}
            onClick={() => {
              // Enviar SMS

              // Ejecutar el comando en la unidad seleccionada, usando el ID del comando
              const unit = neighborhood.unit;
              unit.remoteCommand(
                "4 DESACTIVAR PERIFONEO",
                "",
                "AT+GTOUT=gv300,0,,,0,0,0,0,0,0,0,,0,0,,,,FFFF$",
                0,
                function (result) {
                  console.log(
                    "resultado",
                    wialon.core.Errors.getErrorText(result)
                  );
                  if (result.success) {
                    console.log("Comando enviado con éxito:", result);
                  } else {
                    console.error(
                      "Error al enviar el comando:",
                      wialon.core.Errors.getErrorText(result)
                    );
                  }
                }
              );

              console.log("activar alarma de ", neighborhood);
            }}
          >
            <VolumeOffSharpIcon />
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
              <img src={grupo} width={32} className="imagen" />
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
              <img src={grupo_off} width={32} className="imagen" />
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
