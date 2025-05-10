import {
  Document,
  Image,
  Page,
  PDFViewer,
  Text,
  View,
} from "@react-pdf/renderer";
import { useContext } from "react";
import { ReportContext } from "../context/ReportContext";
import { styles } from "../styles/OrdenTrabajo";
import logo from "../assets/images/alcaldiah.png";

function Report() {
  const { graphBar } = useContext(ReportContext);
  return (
    <PDFViewer className="reportViewer">
      <Document>
        <Page size="A4" style={styles.page}>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              backgroundColor: "rgba(120,120,120,0.1)",
            }}
          >
            <Image src={logo} style={{ width: "180px", height: "60px" }} />
            <Text
              style={{
                justifyContent: "center",
                textAlign: "center",
                paddingTop: 15,
                width: "100%",
                fontSize: 14,
              }}
            >
              Empresa Pública {"\n"}EMSEGURIDAD
            </Text>
          </View>
          <View style={{ paddingTop: 20 }}>
          
            <Text style={{paddingBottom:10, fontSize:14, fontWeight:"bold"}}>Title</Text>
           
         
            <Text style={{ fontSize: 12, textAlign: "justify" }}>
              Incididunt et consequat laborum voluptate sint occaecat laboris
              cillum amet ea quis exercitation. Excepteur incididunt excepteur
              proident nostrud culpa minim enim enim consequat ea deserunt
              adipisicing consectetur ullamco. Excepteur adipisicing veniam
              proident cillum sunt aliquip proident officia cupidatat eu qui non
              culpa et. Ipsum dolore ut minim aute mollit commodo adipisicing
              veniam et exercitation aliqua.
            </Text>
          </View>
          <View>
            <Image src={graphBar} style={{ height: "250px" }} />
            <View >
            <Text style={{width:"100%", fontSize: 10, fontStyle: "italic", textAlign:"justify" }}>
            <Text
                style={{
                 
                 
                  fontWeight: "bold",
                }}
              >
                Figura 1:{" "}
              </Text>
              <Text style={{ marginLeft:15 }}>
                Nostrud eu ea in consectetur culpa adipisicing ad fugiat
                voluptate in anim magna veniam.
              </Text>
            </Text>
             
            </View>
            <View>
            <Text style={{ fontSize: 12, textAlign: "justify", paddingTop:15 }}>
              Incididunt et consequat laborum voluptate sint occaecat laboris
              cillum amet ea quis exercitation. Excepteur incididunt excepteur
              proident nostrud culpa minim enim enim consequat ea deserunt
              adipisicing consectetur ullamco. Excepteur adipisicing veniam
              proident cillum sunt aliquip proident officia cupidatat eu qui non
              culpa et. Ipsum dolore ut minim aute mollit commodo adipisicing
              veniam et exercitation aliqua.
            </Text>
            </View>
            {/**
            Insertamos la tabla con los eventos
             */}
             <View style={styles.tableReport}>
        {/* Encabezado */}
        <View style={styles.tableRowReport}>
          <View style={[styles.tableColReport,{backgroundColor:"rgba(10,25,70,0.8)"}]}>
            <Text style={[styles.tableCellReport,{color:"white"}]}>Nombre</Text>
          </View>
          <View style={[styles.tableColReport,{backgroundColor:"rgba(10,25,70,0.8)"}]}>
            <Text style={[styles.tableCellReport,{color:"white"}]}>Email</Text>
          </View>
          <View style={[styles.tableColReport,{backgroundColor:"rgba(10,25,70,0.8)"}]}>
            <Text style={[styles.tableCellReport,{color:"white"}]}>Fecha</Text>
          </View>
        </View>

        {/* Filas de datos */}
        {[...Array(3).keys()].map(i => (
          <View key={i} style={styles.tableRowReport}>
            <View style={styles.tableColReport}>
              <Text style={styles.tableCellReport}>David {i}</Text>
            </View>
            <View style={styles.tableColReport}>
              <Text style={styles.tableCellReport}>david{i}@correo.com</Text>
            </View>
            <View style={styles.tableColReport}>
              <Text style={styles.tableCellReport}>2025-05-06</Text>
            </View>
          </View>
        ))}
      </View>
          </View>
        </Page>
      </Document>
    </PDFViewer>
  );
}

export default Report;
