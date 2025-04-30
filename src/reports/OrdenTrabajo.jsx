import { useContext } from "react";
import { PDFViewer } from "@react-pdf/renderer";

import { Document, Page, Text, View, Image } from "@react-pdf/renderer";
import { styles } from "../styles/OrdenTrabajo";

import logo from "../assets/images/logo4.png";
import dayjs from "dayjs";

import { OTContext } from "../context/OTContext";

function OrdenTrabajo() {
  /**
   * Llamamos el context que se encarga de pasar los datos al reporte
   *
   */
  const {
    emisor,

    dataEvento,
  } = useContext(OTContext);

  dayjs.locale("es");

  const fecha = dayjs().format("YYYY/MM/DD");
  const hora = dayjs().format("HH:mm:ss");
  const year = dayjs().format("YYYY");

  return (
    <PDFViewer className="reportViewer">
      <Document>
        <Page size="A4" style={styles.page}>
          {/** Header */}
          <View
            style={{
              border: "1px solid black",
              flexDirection: "row",
              fontSize: "11pt",
            }}
          >
            <View style={{ width: "20%", padding:2 }}>
              <Image src={logo} style={styles.logo} />
             
            </View>
            <View style={{ width: "40%", justifyContent: "center" }}>
              <Text style={{ justifyContent: "center", textAlign: "center" }}>
                Empresa Pública {"\n"}EMSEGURIDAD
              </Text>
            </View>
            <View
              style={{
                width: "20%",
                border: "1px solid black",
                justifyContent: "center",
                textAlign: "center",
                fontSize: "20",
                backgroundColor: "rgba(200,0,0,0.4)",
                color: "white",
              }}
            >
              <Text style={{ paddingLeft: 5, paddingTop: 5 }}>Nº</Text>
            </View>
            <View
              style={{
                width: "20%",
                border: "1px solid black",
                justifyContent: "center",
                textAlign: "center",
                fontSize: "20",
              }}
            >
              <Text style={{ paddingLeft: 5, paddingTop: 5 }}>{dataEvento.numeroOt}</Text>
            </View>
          </View>
          {/**Segunda fila del header */}
          <View
            style={{
              borderBottom: "1px solid black",
              flexDirection: "row",
              borderRight: "1px solid black",
              borderLeft: "1px solid black",
            }}
          >
            <View
              style={{
                width: "60%",
                justifyContent: "center",
                backgroundColor: "rgba(120,120,120,0.2)",
              }}
            >
              <Text
                style={{
                  justifyContent: "center",
                  textAlign: "center",
                  fontSize: "16pt",
                }}
              >
                Parte de intervención de alarma
              </Text>
            </View>
            <View
              style={{
                width: "20%",
                borderLeft: "1px solid black",
                flexDirection: "column",
                justifyContent: "space-between",
                fontSize: "11pt",
              }}
            >
              <Text
                style={{
                  borderBottom: "1px solid black",
                  paddingLeft: 5,
                  paddingTop: 5,
                }}
              >
                Fecha de emisión:
              </Text>
              <Text
                style={{
                  borderBottom: "1px solid black",
                  paddingLeft: 5,
                  paddingTop: 5,
                }}
              >
                Hora de emisión:
              </Text>
              <Text
                style={{
                  borderBottom: "1px solid black",
                  paddingLeft: 5,
                  paddingTop: 5,
                }}
              >
                Emisor:
              </Text>
            </View>
            <View
              style={{
                width: "20%",
                borderLeft: "1px solid black",
                flexDirection: "column",
                justifyContent: "space-between",
                fontSize: "11pt",
              }}
            >
              <Text
                style={{
                  borderBottom: "1px solid black",
                  paddingLeft: 5,
                  paddingTop: 5,
                }}
              >
                {fecha}
              </Text>
              <Text
                style={{
                  borderBottom: "1px solid black",
                  paddingLeft: 5,
                  paddingTop: 5,
                }}
              >
                {hora}
              </Text>
              <Text
                style={{
                  borderBottom: "1px solid black",
                  paddingLeft: 5,
                  paddingTop: 5,
                }}
              >
                <Text>{emisor.nombre}</Text>
                
              </Text>
            </View>
          </View>
          {/**Datos del Vehículo asignado */}
          <View
            style={{
              marginTop: 10,
              border: "1px solid black",
              flexDirection: "column",
              fontSize: "12pt",
            }}
          >
            <Text style={{ padding: 5, fontWeight:"bold" }}>Personal asignado</Text>
            <View style={{ flexDirection: "row", padding: 5 }}>
              <Text>Nombre:</Text>
              <Text style={{ width: "50%", borderBottom: "1px solid black" }}>
                
              </Text>
              <Text>Vehículo:</Text>
              <Text
                style={{
                  width: "30%",
                  borderBottom: "1px solid black",
                  fontSize: "11pt",
                }}
              >
               
              </Text>
            </View>
            <View
              style={{ flexDirection: "row", padding: 5, paddingBottom: 15 }}
            >
              <Text>C.I.:</Text>
              <Text style={{ width: "20%", borderBottom: "1px solid black" }}>
                {" "}
              </Text>
              <Text>Teléfono:</Text>
              <Text style={{ width: "20%", borderBottom: "1px solid black" }}>
               
              </Text>
              {/** 
              <Text>Tipo de vehículo:</Text>
              <Text style={{ width: "26%", borderBottom: "1px solid black" }}>
                vehiculo
              </Text>
              */}
            </View>
          </View>
          {/**Datos del evento */}
          <View
            style={{
              border: "1px solid black",
              marginTop: 10,
              flexDirection: "column",
              fontSize: 12,
              padding: 5,
            }}
          >
            <View style={{ flexDirection: "row", fontSize: 12, padding: 2 }}>
             
              <Text ><Text style={styles.negrilla12}>Detalles: </Text>{dataEvento.detalles}</Text>
              
            </View>
            <View style={{ flexDirection: "row", fontSize: 12, padding: 2 }}>
              <Text ><Text style={styles.negrilla12}>Motivo de la alarma: </Text>{dataEvento.motivo} </Text>
              
              
            </View>
            <View
              style={{
                flexDirection: "column",
                fontSize: 12,
                padding: 2,
                justifyContent: "center",
              }}
            >
              <View style={{ flexDirection: "row"}}>
                <Text><Text style={styles.negrilla12}>Estación de la alarma: </Text> {dataEvento.estacion}</Text>
              </View>

              <View>
                <Text><Text style={styles.negrilla12}>Persona de contacto: </Text> {dataEvento.usuario}</Text>
                <Text><Text style={styles.negrilla12}>Teléfono: </Text>{dataEvento.cel}</Text>
                <Text><Text style={styles.negrilla12}>Email: </Text>{dataEvento.email}</Text>
              </View>
            </View>
          </View>
          {/**Equipo mínimo requerido */}
          <View
            style={{
              border: "1px solid black",
              marginTop: 10,
              display: "flex",
              flexDirection: "row",
              fontSize: 12,
              padding: 10,
            }}
          >
            <View style={{ height: 110 }}>
              <Text>Equipo mínimo requerido:</Text>
            </View>
          </View>
          {/**observaciones */}
          <View
            style={{
              border: "1px solid black",
              marginTop: 10,
              flexDirection: "column",
              fontSize: 12,
              padding: 10,
            }}
          >
            <Text>Reporte de observaciones:</Text>
            <Text
              style={{
                width: "100%",
                borderBottom: "1px solid black",
                padding: 10,
              }}
            ></Text>
            <Text
              style={{
                width: "100%",
                borderBottom: "1px solid black",
                padding: 10,
              }}
            ></Text>
            <Text
              style={{
                width: "100%",
                borderBottom: "1px solid black",
                padding: 10,
              }}
            ></Text>
            <Text
              style={{
                width: "100%",
                borderBottom: "1px solid black",
                padding: 10,
              }}
            ></Text>
            <Text
              style={{
                width: "100%",
                borderBottom: "1px solid black",
                padding: 10,
              }}
            ></Text>
            <Text
              style={{
                width: "100%",
                borderBottom: "1px solid black",
                padding: 10,
              }}
            ></Text>
            <Text
              style={{
                width: "100%",
                borderBottom: "1px solid black",
                padding: 10,
              }}
            ></Text>
            <Text
              style={{
                width: "100%",
                borderBottom: "1px solid black",
                padding: 10,
              }}
            ></Text>
            <Text
              style={{
                width: "100%",
                borderBottom: "1px solid black",
                padding: 10,
              }}
            ></Text>
            <Text
              style={{
                width: "100%",
                borderBottom: "1px solid black",
                padding: 10,
              }}
            ></Text>
            <Text
              style={{
                width: "100%",
                borderBottom: "1px solid black",
                padding: 10,
              }}
            ></Text>
            <Text
              style={{
                width: "100%",
                borderBottom: "1px solid black",
                padding: 10,
              }}
            ></Text>
            <Text
              style={{
                width: "100%",
                borderBottom: "1px solid black",
                padding: 10,
              }}
            ></Text>
            <Text
              style={{
                width: "100%",
                borderBottom: "1px solid black",
                padding: 10,
              }}
            ></Text>
            <Text
              style={{
                width: "100%",
                borderBottom: "1px solid black",
                padding: 10,
              }}
            ></Text>
            <Text
              style={{
                width: "100%",
                borderBottom: "1px solid black",
                padding: 10,
              }}
            ></Text>
            <Text
              style={{
                width: "100%",
                borderBottom: "1px solid black",
                padding: 10,
              }}
            ></Text>
            <Text
              style={{
                width: "100%",
                borderBottom: "1px solid black",
                padding: 10,
              }}
            ></Text>
            <Text
              style={{
                width: "100%",
                borderBottom: "1px solid black",
                padding: 10,
              }}
            ></Text>
            <Text
              style={{
                width: "100%",
                borderBottom: "1px solid black",
                padding: 10,
              }}
            ></Text>
            <Text
              style={{
                width: "100%",
                borderBottom: "1px solid black",
                padding: 10,
              }}
            ></Text>
            <Text
              style={{
                width: "100%",
                borderBottom: "1px solid black",
                padding: 10,
              }}
            ></Text>
            <Text
              style={{
                width: "100%",
                borderBottom: "1px solid black",
                padding: 10,
              }}
            ></Text>
            <Text
              style={{
                width: "100%",
                borderBottom: "1px solid black",
                padding: 10,
              }}
            ></Text>
          </View>

          {/**Seccion para las firmas */}

          <View
            style={{
              border: "1px solid black",
              marginTop: 40,
              flexDirection: "row",
              fontSize: 12,
              height: "80px",
            }}
          >
            <View style={{ width: "33.33%", flexDirection: "column" }}>
              <Text
                style={{
                  padding: 5,
                  backgroundColor: "rgba(20,20,20,0.1)",
                  borderBottom: "1px solid black",
                }}
              >
                Emisor:{" "}
              </Text>
              <Text
                style={{
                  width: "100%",
                  paddingRight: 5,
                  position: "absolute",
                  bottom: 0,
                  textAlign: "right",
                }}
              >
                {emisor.nombre}
              </Text>
            </View>
            <View
              style={{
                width: "33.33%",
                flexDirection: "column",
                borderLeft: "1px solid black",
              }}
            >
              <Text
                style={{
                  padding: 5,
                  backgroundColor: "rgba(20,20,20,0.1)",
                  borderBottom: "1px solid black",
                }}
              >
                Responsable:{" "}
              </Text>

              <Text
                style={{
                  width: "100%",
                  paddingRight: 5,
                  position: "absolute",
                  bottom: 0,
                  textAlign: "right",
                }}
              >
                Revisado por:
              </Text>
            </View>
            <View
              style={{
                width: "33.33%",
                flexDirection: "column",
                borderLeft: "1px solid black",
              }}
            >
              <Text
                style={{
                  padding: 5,
                  backgroundColor: "rgba(20,20,20,0.1)",
                  borderBottom: "1px solid black",
                }}
              >
                Supervisor:{" "}
              </Text>
              <Text
                style={{
                  width: "100%",
                  paddingRight: 5,
                  position: "absolute",
                  bottom: 0,
                  textAlign: "right",
                }}
              >
                Supervisor:
              </Text>
            </View>
          </View>

          {/**
           * Pie de página
           */}
          <View style={styles.footer} fixed>
            <Text>
              <Text>
                El documento no tiene validéz sin las firmas de responsabilidad
              </Text>
            </Text>
          </View>
          <Text
            fixed
            style={{
              position: "absolute",
              fontSize: "8",
              color: "grey",
              bottom: "10mm",
              right: "15mm",
            }}
          >
            {" "}
            NexusEmbed {year}
          </Text>
        </Page>
      </Document>
    </PDFViewer>
  );
}

export default OrdenTrabajo;
