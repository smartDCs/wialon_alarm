import { useContext, useEffect, useState, useRef } from "react";
import { Accordion, Col, Container, Row, Table } from "react-bootstrap";
import "../styles/Styles.css";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import EmergencyShareIcon from "@mui/icons-material/EmergencyShare";
import ReactDOMServer from "react-dom/server";

import { toast } from "react-toastify";

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
import LinkSharpIcon from "@mui/icons-material/LinkSharp";
import LinkOffSharpIcon from "@mui/icons-material/LinkOffSharp";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import NotificationsOffIcon from "@mui/icons-material/NotificationsOff";

import {
  onValue,
  orderByChild,
  query,
  ref,
  push,
  limitToLast,
  off,
} from "firebase/database";

import { DataContext } from "../context/DataContext";
import alcaldia from "../assets/images/alcaldiah1.png";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import ToolBar from "../components/ToolBar";
import notification from "../assets/audio/notificacion.mp3";
import swal from "sweetalert";
import Swal from "sweetalert2";
function Home() {
  const navigate = useNavigate();
  const { db1, userData } = useContext(UserContext);
  const [selectedRows, setSelectedRows] = useState([]);
  const [position, setPosition] = useState([-0.933712, -78.614649]);
  const [gruposAlarmas, setGruposAlarmas] = useState([]);
  const eventosRef = ref(db1, "eventos");
  const linked = true;
  const lastEventKeyRef = useRef(null);
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

  /**
   * obtenemos los datos del inicio de sesion
   */

  const [sess, setSess] = useState("");
  /**
   * variables para usar con la api de wialon
   *  */

  const { setNeighborhood, eventos, eventCoords } = useContext(DataContext);

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

    // Configuramos las banderas para la API
    const flags =
      wialon.item.Item.dataFlag.base |
      wialon.item.Resource.dataFlag.reports |
      wialon.item.Unit.dataFlag.lastMessage;

    // Buscamos los grupos creados por el usuario "XAVIER"
    sess.searchItems(
      {
        itemsType: "avl_unit_group",
        propName: "rel_user_creator_name",
        propValueMask: "ALARMAS GAD LATACUNGA",
        sortType: "sys_name",
      },
      1,
      flags,
      0,
      0,
      async (error, data) => {
        if (error) {
          console.log(wialon.core.Errors.getErrorText(error));
          return;
        }

        const datos = data.items;
        const grupos = datos.map((grupo) => ({
          grupoName: grupo.getName(),
          units: grupo.getUnits(),
        }));
        setGruposAlarmas(grupos);
        /*
       
        // Creamos promesas por todas las unidades de todos los grupos
        const allPromises = grupos.flatMap((group) =>
          group.units.map((unidadId) => {
            return new Promise((resolve) => {
              sess.searchItems(
                {
                  itemsType: "avl_unit",
                  propName: "sys_id",
                  propValueMask: unidadId,
                  sortType: "sys_name",
                },
                1,
                6817569, // flags
                0,
                0,
                (error, resultado) => {
                  if (error || !resultado.items.length) {
                    console.log(wialon.core.Errors.getErrorText(error));
                    resolve(null);
                  } else {
                    const unidad = resultado.items[0];
                    resolve({
                      name: unidad.getName(),
                      id: unidad.getId(),
                      lng: unidad.getPosition().x,
                      lat: unidad.getPosition().y,
                      phone: unidad.$$user_phoneNumber,
                      commands: unidad.getCommands(),
                      unit: unidad,
                    });
                  }
                }
              );
            });
          })
        );

        // Esperamos a que terminen todas las promesas
        const resultados = await Promise.all(allPromises);

        // Filtramos los nulls y actualizamos el estado
        setUnidades(resultados.filter(Boolean));
        */
      }
    );
  };

  const searchUnits = async (grupo) => {
    // Creamos promesas por todas las unidades de todos los grupos
    const allPromises = grupo.units.map((unidadId) => {
      return new Promise((resolve) => {
        sess.searchItems(
          {
            itemsType: "avl_unit",
            propName: "sys_id",
            propValueMask: unidadId,
            sortType: "sys_name",
          },
          1,
          6817569, // flags
          0,
          0,
          (error, resultado) => {
            if (error || !resultado.items.length) {
              console.log(wialon.core.Errors.getErrorText(error));
              resolve(null);
            } else {
              const unidad = resultado.items[0];
              resolve({
                name: unidad.getName(),
                id: unidad.getId(),
                lng: unidad.getPosition().x,
                lat: unidad.getPosition().y,
                phone: unidad.$$user_phoneNumber,
                commands: unidad.getCommands(),
                unit: unidad,
              });
            }
          }
        );
      });
    });

    // Esperamos a que terminen todas las promesas
    const resultados = await Promise.all(allPromises);

    // Filtramos los nulls y actualizamos el estado
    setUnidades(resultados.filter(Boolean));
  };
  //const position = [-0.933712, -78.614649];

  function ChangeMapView({ coords }) {
    const map = useMap();
    useEffect(() => {
      map.setView(coords, map.getZoom());
    }, [coords]);
    return null;
  }

  const showToast = (type, message) => {
    const audio = new Audio(notification);
    audio.play();
    toast[type](message, { autoClose: false }); // type puede ser 'success', 'error', etc.
  };

  /**
   *
   * @param {*} comando
   * @param {*} unidad
   *
   * ejecuta los comandos de activar y desactivar alarma
   */

  const CmdExec = (comando, unidad, motivo) => {
    switch (comando) {
      case "activar":
        unidad.unit.remoteCommand(
          unidad.commands[0].n,
          "",
          unidad.commands[0].p,
          0,

          function (result) {
            if (result === 0) {
              showToast(
                "success",
                `Alarma ${unidad.name} activada correctamente`
              );
              saveAlarm(
                "Alarma activada",
                unidad.name,
                userData.user,
                userData.phone || " ",
                userData.email,
                motivo
              );
            } else {
              console.error(
                "alarma",
                unidad.name,
                "Error al enviar el comando:",
                wialon.core.Errors.getErrorText(result)
              );
              showToast("error", `No se pudo activar la alarma ${unidad.name}`);
            }
          }
        );
        break;
      case "desactivar":
        unidad.unit.remoteCommand(
          unidad.commands[1].n,
          "",
          unidad.commands[1].p,
          0,
          function (result) {
            if (result === 0) {
              showToast(
                "success",
                `Alarma ${unidad.name} desactivada correctamente`
              );

              saveAlarm(
                "Alarma desactivada",
                unidad.name,
                userData.user,
                userData.phone || " ",
                userData.email,
                motivo
              );
            } else {
              console.error(
                "alarma",
                unidad.name,
                "Error al enviar el comando:",
                wialon.core.Errors.getErrorText(result)
              );
              showToast(
                "error",
                `No se pudo desactivar la alarma ${unidad.name}`
              );
            }
          }
        );
        break;
      default:
        console.error("Comando no reconocido:", comando);
        break;
    }
  };

  /**
   * Guardamos el evento de alarma en la base de datos
   */
  const saveAlarm = (
    evento,
    alarmStation,
    user,
    phoneNumber,
    email,
    motivo
  ) => {
    // Crea un nuevo evento con ID automático
    push(eventosRef, {
      evento: evento,
      estacion: alarmStation,
      atendido: false,
      fecha: new Date().toLocaleString(),
      usuario: user,
      telefono: phoneNumber,
      email: email,
      motivo: motivo,
    });
  };

  /**
   * leemos la base de datos en tiempo real
   */

  useEffect(() => {
    const starCountRef = ref(db1, "eventos");
    const queryEvent = query(
      starCountRef,
      orderByChild("fecha"),
      limitToLast(1)
    );

    const callback = (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        const keys = Object.keys(data);
        const lastKey = keys[0];
        const lastEvent = data[lastKey];

        if (lastKey !== lastEventKeyRef.current) {
          lastEventKeyRef.current = lastKey;

          if (lastEvent.atendido === false) {
            showToast(
              "warning",
              `${lastEvent.estacion} ${lastEvent.evento} ${lastEvent.fecha} ${lastEvent.motivo}`
            );
          }
        }
      } else {
        console.log("no se encontraron eventos");
      }
    };

    onValue(queryEvent, callback);

    return () => {
      // ❗ Esto es lo correcto: debes pasar el MISMO query y el callback
      off(queryEvent, "value", callback);
    };
  }, [db1]);

  return (
    <Container fluid className="m-0 p-0 ">
      <Row className="m-0 p-0">
        <Col lg={4} md={12} sm={12} xs={12} className="m-0 p-2 ">
          <Card
            style={{ height: "92vh", padding: 10, overflowY: "auto", overflowX: "hidden" }}
            bg="dark"
          >
            <div style={{ color: "white", padding:10 }}>Grupos de alarmas</div>
            <Card style={{ maxHeight: "75vh", padding: 10, overflowY: "auto", overflowX: "hidden" }}>
              <Row>
                <Accordion defaultActiveKey="0">
                  {gruposAlarmas.map((grupo, index) => {
                    return (
                      <Accordion.Item eventKey={index} key={index}>
                        <Accordion.Header
                          onClick={() => {
                            {
                              /**
en este punto mando a buscar las unidades pertenecientes al grupo seleccionado
 */
                            }
                            searchUnits(grupo);

                         //   console.log("grupo", grupo);
                          }}
                        >
                          {grupo.grupoName}
                        </Accordion.Header>
                        <Accordion.Body>
                          <Table size="sm">
                            <tbody style={{ width: "100%" }}>
                              {unidades.map((unidad, index) => {
                                const isSelected = selectedRows.includes(
                                  unidad.unit
                                );

                                const toggleRow = () => {
                                  if (isSelected) {
                                    setSelectedRows(
                                      selectedRows.filter(
                                        (i) => i !== unidad.unit
                                      )
                                    );
                                  } else {
                                    setSelectedRows([
                                      ...selectedRows,
                                      unidad.unit,
                                    ]);
                                  }
                                };

                                return (
                                  <tr
                                    key={index}
                                    className={isSelected ? "selectedRow" : ""}
                                  >
                                    <td>
                                      <input
                                        type="checkbox"
                                        checked={isSelected}
                                        onChange={toggleRow}
                                      />
                                    </td>
                                    <td
                                      className="tableRow"
                                      onClick={() => {
                                        // console.log("posición", unidad.lat, unidad.lng);
                                        setPosition([unidad.lat, unidad.lng]);
                                      }}
                                    >
                                      {unidad.name}
                                    </td>
                                    <td className="tableRow">
                                      {linked ? (
                                        <LinkSharpIcon
                                          style={{ color: "green" }}
                                        />
                                      ) : (
                                        <LinkOffSharpIcon
                                          style={{ color: "red" }}
                                        />
                                      )}
                                    </td>
                                    <td className="tableRow">
                                      <NotificationsActiveIcon
                                        style={{ color: "orange" }}
                                        onClick={() => {
                                          Swal.fire({
                                            title:
                                              "Ingrese el motivo de la alarma",
                                            input: "text",
                                            customClass: {
                                              confirmButton: "btnConfirm",

                                              cancelButton: "btnCancel",
                                            },
                                            inputAttributes: {
                                              autocapitalize: "off",
                                            },
                                            showCancelButton: true,
                                            confirmButtonText: "Aceptar",
                                            showLoaderOnConfirm: true,
                                            cancelButtonText: "Cancelar",
                                            preConfirm: () => {
                                              const motivo =
                                                Swal.getInput().value;
                                              if (!motivo) {
                                                Swal.showValidationMessage(
                                                  "Por favor ingrese un motivo"
                                                );
                                              } else {
                                                CmdExec(
                                                  "activar",
                                                  unidad,
                                                  motivo
                                                );
                                              }
                                            },
                                            allowOutsideClick: () =>
                                              !Swal.isLoading(),
                                          }).then((result) => {
                                            if (result.isConfirmed) {
                                              return;
                                            }
                                          });
                                        }}
                                      />
                                    </td>
                                    <td className="tableRow">
                                      <NotificationsOffIcon
                                        style={{ color: "red" }}
                                        onClick={() => {
                                          Swal.fire({
                                            title:
                                              "Ingrese el motivo de la alarma",
                                            input: "text",
                                            customClass: {
                                              confirmButton: "btnConfirm",

                                              cancelButton: "btnCancel",
                                            },
                                            inputAttributes: {
                                              autocapitalize: "off",
                                            },
                                            showCancelButton: true,
                                            confirmButtonText: "Aceptar",
                                            cancelButtonText: "Cancelar",
                                            showLoaderOnConfirm: true,
                                            preConfirm: () => {
                                              const motivo =
                                                Swal.getInput().value;
                                              if (!motivo) {
                                                Swal.showValidationMessage(
                                                  "Por favor ingrese un motivo"
                                                );
                                              } else {
                                                CmdExec(
                                                  "desactivar",
                                                  unidad,
                                                  motivo
                                                );
                                              }
                                            },
                                            allowOutsideClick: () =>
                                              !Swal.isLoading(),
                                          }).then((result) => {
                                            if (result.isConfirmed) {
                                              return;
                                            }
                                          });
                                        }}
                                      />
                                    </td>
                                  </tr>
                                );
                              })}
                            </tbody>
                          </Table>
                        </Accordion.Body>
                      </Accordion.Item>
                    );
                  })}
                </Accordion>
              </Row>
            </Card>

            {/** 
            <Row>
              <Table size="sm">
                <thead className="tableHead">
                  <tr>
                    <td
                      colSpan={5}
                      className="tableHeader"
                      style={{
                        border: "none",
                        textAlign: "center",
                        width: "100%",
                      }}
                    >
                      Estaciones de alarma
                    </td>
                  </tr>
                </thead>
                <tbody style={{ width: "100%" }}>
                  {unidades.map((unidad, index) => {
                    const isSelected = selectedRows.includes(unidad.unit);

                    const toggleRow = () => {
                      if (isSelected) {
                        setSelectedRows(
                          selectedRows.filter((i) => i !== unidad.unit)
                        );
                      } else {
                        setSelectedRows([...selectedRows, unidad.unit]);
                      }
                    };

                    return (
                      <tr
                        key={index}
                        className={isSelected ? "selectedRow" : ""}
                      >
                        <td>
                          <input
                            type="checkbox"
                            checked={isSelected}
                            onChange={toggleRow}
                          />
                        </td>
                        <td
                          className="tableRow"
                          onClick={() => {
                            // console.log("posición", unidad.lat, unidad.lng);
                            setPosition([unidad.lat, unidad.lng]);
                          }}
                        >
                          {unidad.name}
                        </td>
                        <td className="tableRow">
                          {linked ? (
                            <LinkSharpIcon style={{ color: "green" }} />
                          ) : (
                            <LinkOffSharpIcon style={{ color: "red" }} />
                          )}
                        </td>
                        <td className="tableRow">
                          <NotificationsActiveIcon
                            style={{ color: "orange" }}
                            onClick={() => {
                              Swal.fire({
                                title: "Ingrese el motivo de la alarma",
                                input: "text",
                                customClass: {
                                  confirmButton: "btnConfirm",

                                  cancelButton: "btnCancel",
                                },
                                inputAttributes: {
                                  autocapitalize: "off",
                                },
                                showCancelButton: true,
                                confirmButtonText: "Aceptar",
                                showLoaderOnConfirm: true,
                                cancelButtonText: "Cancelar",
                                preConfirm: () => {
                                  const motivo = Swal.getInput().value;
                                  if (!motivo) {
                                    Swal.showValidationMessage(
                                      "Por favor ingrese un motivo"
                                    );
                                  } else {
                                    CmdExec("activar", unidad, motivo);
                                  }
                                },
                                allowOutsideClick: () => !Swal.isLoading(),
                              }).then((result) => {
                                if (result.isConfirmed) {
                                  return;
                                }
                              });
                            }}
                          />
                        </td>
                        <td className="tableRow">
                          <NotificationsOffIcon
                            style={{ color: "red" }}
                            onClick={() => {
                              Swal.fire({
                                title: "Ingrese el motivo de la alarma",
                                input: "text",
                                customClass: {
                                  confirmButton: "btnConfirm",

                                  cancelButton: "btnCancel",
                                },
                                inputAttributes: {
                                  autocapitalize: "off",
                                },
                                showCancelButton: true,
                                confirmButtonText: "Aceptar",
                                cancelButtonText: "Cancelar",
                                showLoaderOnConfirm: true,
                                preConfirm: () => {
                                  const motivo = Swal.getInput().value;
                                  if (!motivo) {
                                    Swal.showValidationMessage(
                                      "Por favor ingrese un motivo"
                                    );
                                  } else {
                                    CmdExec("desactivar", unidad, motivo);
                                  }
                                },
                                allowOutsideClick: () => !Swal.isLoading(),
                              }).then((result) => {
                                if (result.isConfirmed) {
                                  return;
                                }
                              });
                            }}
                          />
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            </Row>
*/}
            {/**
            Muestra los botones para activar los grupos de alarmas
             */}
            {selectedRows.length > 1 ? (
              <Row
                className="mt-2"
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <Col lg={6} md={6} sm={6} xs={6} className="gap-4"
                style={{display:"flex", justifyContent:"flex-end"}}>
                
                  <Button
                    variant="success"
                    onClick={() => {
                      swal({
                        title: "¿Está seguro de activar el grupo de alarmas?",
                        text: "Esta acción activará todas las alarmas seleccionadas.",
                        icon: "warning",
                        buttons: true,
                        dangerMode: true,
                      }).then((willDelete) => {
                        if (willDelete) {
                          unidades.forEach((unidad) => {
                            CmdExec(
                              "activar",
                              unidad,
                              "Activado por el administrador"
                            );
                          });
                        }
                      });
                    }}
                  >
                    Activar grupo
                  </Button>
                </Col>
                <Col lg={6} md={6} sm={6} xs={6} className="gap-4 ">
                  <Button
                    variant="danger"
                    onClick={() => {
                      swal({
                        title:
                          "¿Está seguro de desactivar el grupo de alarmas?",
                        text: "Esta acción desactivará todas las alarmas seleccionadas.",
                        icon: "warning",
                        buttons: true,
                        dangerMode: true,
                      }).then((willDelete) => {
                        if (willDelete) {
                          unidades.forEach((unidad) => {
                            CmdExec(
                              "desactivar",
                              unidad,
                              "Desactivado por el administrador"
                            );
                          });
                        }
                      });
                    }}
                  >
                    Desactivar grupo
                  </Button>
                </Col>
              </Row>
            ) : (
              <></>
            )}

            <Row>
              <Container
                fluid
                className="d-flex justify-content-lg-end align-items-center align-content-center"
              >
                <img src={alcaldia} width="50%" />
              </Container>
            </Row>
          </Card>
        </Col>
        <Col lg={8} md={12} sm={12} xs={12} className="m-0 p-0">
          <Row style={{ width: "100%", height: "92vh" }} className="ps-4 pt-2">
            <MapContainer
              center={position}
              zoom={13}
              scrollWheelZoom={true}
              style={{ width: "100%", height: "100%" }}
            >
              <ChangeMapView coords={position} />
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
                  <Tooltip>
                    <label>{alarma.name}</label>
                  </Tooltip>
                </Marker>
              ))}
            </MapContainer>
          </Row>
          {/**
          <Row
            style={{ width: "100%", padding: 10 }}
            className="ps-4 pt-2 pe-0"
          >
          
            <ToolBar />
           
           
          </Row>
           */}
        </Col>
      </Row>
    </Container>
  );
}

export default Home;
