import { useState, useEffect, useContext } from "react";
import { Button, Card, Col, Container, Row, Table } from "react-bootstrap";
import { Document, Page, Image } from "@react-pdf/renderer";

/**
 * importamos las librerias para el manego de la gráfica de barras
 */
import {
  ChartContainer,
  ChartsXAxis,
  ChartsYAxis,
  BarPlot,
  ChartsTooltip,
} from "@mui/x-charts";
import { useAnimate } from "@mui/x-charts/hooks";
import { interpolateObject } from "@mui/x-charts-vendor/d3-interpolate";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { onValue, orderByChild, query, ref } from "firebase/database";
import EmergencyShareIcon from "@mui/icons-material/EmergencyShare";
import ReactDOMServer from "react-dom/server";

import {
  agruparEventos,
  transformarParaBarChart,
} from "../components/Conversiones";

/**
 * librerias para manejar los mapas
 */
import {
  Circle,
  LayersControl,
  MapContainer,
  Marker,
  TileLayer,
  Tooltip,
  useMap,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { ReportContext } from "../context/ReportContext";
/**
 * Métodos necesarios para mostrar los labels sobre las barras
 */
const Text = styled("text")(({ theme }) => ({
  ...theme?.typography?.body2,
  stroke: "CaptionText",
  fill: (theme.vars || theme)?.palette?.text?.primary,
  transition: "opacity 0.2s ease-in, fill 0.2s ease-in",
  textAnchor: "middle",
  dominantBaseline: "central",
  pointerEvents: "none",
}));

function BarLabel(props) {
  const {
    seriesId,
    dataIndex,
    color,
    isFaded,
    isHighlighted,
    classes,
    xOrigin,
    yOrigin,
    x,
    y,
    width,
    height,
    layout,
    skipAnimation,
    ...otherProps
  } = props;

  const animatedProps = useAnimate(
    { x: x + width / 2, y: y - 8 },
    {
      initialProps: { x: x + width / 2, y: yOrigin },
      createInterpolator: interpolateObject,
      transformProps: (p) => p,
      applyProps: (element, p) => {
        element.setAttribute("x", p.x.toString());
        element.setAttribute("y", p.y.toString());
      },
      skip: skipAnimation,
    }
  );

  return (
    <Text {...otherProps} fill={color} textAnchor="middle" {...animatedProps} />
  );
}

function Trends() {
  const { changeGraph } = useContext(ReportContext);
  const { db1 } = useContext(UserContext);
  const [eventos, setEventos] = useState([]);
  const [dataBar, setDataBar] = useState([]);
  const [estacionesBarchart, setEstacionesBarChart] = useState([]);
  const navigate = useNavigate();
  const [estacionSeleccionada, setEstacionSeleccionada] = useState(null);
  const [position, setPosition] = useState([-0.933712, -78.614649]);
  const [totalEventosEstacion, setTotalEventosEstacion] = useState(0);
  /**
   * Custom icon para el mapa
   * @returns
   */

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

  const MyPDFDocument = ({ chartImage }) => (
    <Document>
      <Page size="A4">
        <Image src={chartImage} style={{ width: "500px", height: "auto" }} />
      </Page>
    </Document>
  );
  const handleExportPDF = async () => {
    const chartImage = await exportGraphAsImage();
    changeGraph(chartImage);

    navigate("/report");
  };

  /**
   * Método para cambiar la posicion del centro del mapa
   *
   */
  function ChangeMapView({ coords }) {
    const map = useMap();
    useEffect(() => {
      map.setView(coords, map.getZoom());
    }, [coords]);
    return null;
  }

  /**
   * Método para convertir el gráfico de barras en imagen
   */
  const exportGraphAsImage = async () => {
    const html2canvas = (await import("html2canvas")).default;
    const chartElement = document.getElementById("chart-container");
    const canvas = await html2canvas(chartElement);
    const dataUrl = canvas.toDataURL("image/png");
    console.log("data url", dataUrl);
    return dataUrl;
  };

  /**
   * leemos la base de datos de firebase y obtenemos los datos de la tabla de incidentes
   * y los convertimos a un formato compatible con el PieChart
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
        //console.log("eventos", eventosArray);
      } else {
        console.log("no se encontraron los eventos");
      }
    });
  }, [db1]);

  useEffect(() => {
    const eventosagrupados = agruparEventos(eventos);
    setDataBar(transformarParaBarChart(eventosagrupados));
    setEstacionesBarChart(Object.keys(eventosagrupados));
  }, [eventos]);

  /**
   * Calculamos el total de eventos por mes
   */
  const calcularTotalPorMes = (dataBar) => {
    return dataBar.map((d) => {
      const total = Object.keys(d)
        .filter((key) => key !== "mes")
        .reduce((sum, key) => sum + d[key], 0);
      return { mes: d.mes, total };
    });
  };

  /**
   * filtramos la data
   */
  const dataFiltrada = estacionSeleccionada
    ? dataBar
        .filter((d) => d[estacionSeleccionada] !== undefined)
        .map((d) => ({
          mes: d.mes,
          [estacionSeleccionada]: d[estacionSeleccionada],
        }))
    : calcularTotalPorMes(dataBar);

  useEffect(() => {
    if (estacionSeleccionada != null) {
      const eventosFiltrados = eventos.filter(
        (evento) => evento.estacion === estacionSeleccionada
      );

      setPosition([eventosFiltrados[0].lat, eventosFiltrados[0].lng]);
    }
  }, [estacionSeleccionada]);

  useEffect(() => {
    if (!estacionSeleccionada) return;

    let totalEventos = 0;

    dataFiltrada.forEach((dato) => {
      // Accede dinámicamente al valor por nombre de estación
      if (dato[estacionSeleccionada]) {
        totalEventos += dato[estacionSeleccionada];
      }
    });

    setTotalEventosEstacion(totalEventos);
  }, [dataFiltrada, estacionSeleccionada]);

  return (
   <Container
  fluid
  style={{
    height: "100%", // asegúrate que el padre permita este alto
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
    padding: 10,
  }}
>
  <Row style={{ flex: 1, overflow: "hidden" }}>
    {/* Columna de estaciones */}
    <Col lg={3} md={3} xs={12} sm={12} xl={3} style={{ height: "100%" }}>
      <Card style={{ height: "100%", display: "flex", flexDirection: "column" }}>
        <div
          style={{
            flex: 1,
            overflowY: "auto",
            padding: 10,
            borderRadius: 4,
          }}
        >
          <Table size="sm" responsive>
            <thead className="tableHead">
              <tr>
                <th colSpan={5} className="tableHeader">
                  Estación
                </th>
              </tr>
            </thead>
            <tbody>
              {estacionesBarchart.map((estacion, index) => (
                <tr
                  key={index}
                  onClick={() =>
                    setEstacionSeleccionada((prev) =>
                      prev === estacion ? null : estacion
                    )
                  }
                >
                  <td
                    colSpan={5}
                    className="tableRow"
                    style={{
                      cursor: "pointer",
                      backgroundColor:
                        estacion === estacionSeleccionada
                          ? "rgba(100,200,10,0.6)"
                          : "#fff",
                      color:
                        estacion === estacionSeleccionada ? "#fff" : "#000",
                    }}
                  >
                    {estacion}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </Card>
    </Col>

    {/* Columna de gráfico y mapa */}
    <Col lg={9} md={9} xs={12} sm={12} xl={9} style={{ height: "100%" }}>
      <Card style={{ height: "100%", display: "flex", flexDirection: "column" }}>
        <Card.Body style={{ flex: 1, display: "flex", flexDirection: "column" }}>
          <Row style={{ flex: 1 }}>
            {/* Gráfico */}
            <Col lg={6} md={6} xs={12} sm={12} style={{ display: "flex", flexDirection: "column" }}>
              <div
                style={{
                  backgroundColor: "rgba(205,205,205,0.3)",
                  flex: 1,
                  borderRadius: 8,
                  padding: 10,
                  alignContent:"center"
                }}
                id="chart-container"
              >
                <h5 style={{ textAlign: "center" }}>
                  {estacionSeleccionada ?? "Total de eventos por mes"}
                </h5>
                <ChartContainer
                  dataset={dataFiltrada}
                  xAxis={[{ scaleType: "band", dataKey: "mes" }]}
                  series={[
                    {
                      type: "bar",
                      dataKey: estacionSeleccionada ?? "total",
                      label: estacionSeleccionada ?? "Total",
                    },
                  ]}
                  sx={{
                    height:"60%"
                  }}
                >
                  <BarPlot barLabel="value" slots={{ barLabel: BarLabel }} />
                  <ChartsXAxis />
                  <ChartsYAxis />
                  <ChartsTooltip />
                </ChartContainer>
              </div>
            </Col>

            {/* Mapa */}
            <Col lg={6} md={6} xs={12} sm={12}>
              <div
                style={{
                  height: "100%",
                  borderRadius: 8,
                  overflow: "hidden",
                  backgroundColor: "rgba(255,255,255,0.9)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
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
                        url=" http://www.google.cn/maps/vt?lyrs=s@189&gl=cn&x={x}&y={y}&z={z}"
                      
                      />
                    </LayersControl.BaseLayer>
                    <LayersControl.BaseLayer checked name="Relieve">
                      <TileLayer
                        
                        url="https://mt1.google.com/vt/lyrs=r&x={x}&y={y}&z={z}"
                      />
                    </LayersControl.BaseLayer>
                  </LayersControl>

                  {eventos.map((alarma, index) => (
                    <Marker
                      key={index}
                      position={[alarma.lat, alarma.lng]}
                      icon={customIcon}
                    >
                      <Tooltip>
                        <label>{alarma.name}</label>
                      </Tooltip>
                    </Marker>
                  ))}

                  {estacionSeleccionada && (
                    <Circle
                      center={position}
                      radius={500}
                      pathOptions={{
                        fillColor: "rgba(255,0,45,0.1)",
                        color: "rgba(255,23,45,0.2)",
                      }}
                    >
                      <Tooltip
                        permanent
                        direction="right"
                        offset={[0, 20]}
                        opacity={1}
                      >
                        Eventos suscitados {totalEventosEstacion}
                      </Tooltip>
                    </Circle>
                  )}
                </MapContainer>
              </div>
            </Col>
          </Row>

          {/* Botones */}
          <Row className="mt-3">
            <div
              style={{
                padding: 10,
                display: "flex",
                justifyContent: "center",
                gap: 10,
              }}
            >
              <Button onClick={handleExportPDF}
               variant="outline-primary"
              >Generar reporte</Button>
              <Button
               variant="outline-success"
              >Exportar CSV</Button>
            </div>
          </Row>
        </Card.Body>
      </Card>
    </Col>
  </Row>
</Container>

  );
}

export default Trends;
