import { StyleSheet } from "@react-pdf/renderer";
export const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#ffffff",
    padding: "15mm",
    marginLeft:"5mm",
    paddingRight:"20mm"
    // paddingBottom:"15mm"
  },
  ContenedorDatos: {
    flexDirection: "row",
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
    display: "flex",
    flexDirection: "column",
  },
  datosPagare: {
   textAlign:"justify",
   fontSize:12,
   marginTop:"10mm",
   marginBottom:"15mm"
  },
  datosCotizacion: {
    width: "100%",
    fontFamily: "Helvetica",
    flexDirection: "row",
alignItems:'center',
    fontSize: 14,
 fontWeight:'bold'
  },
  negrilla: {
    fontWeight: "extrabold",
    fontSize: 13,
    
  },
  negrilla12: {
    fontWeight: "extrabold",
    fontSize: 12,
    
  },
  signatureArea: {
    flexDirection: "row",
    paddingTop: 60,
    fontSize: 12,

    gap:30
  },
  firma: {
    paddingLeft: 30,
    paddingRight: 30,
    borderTop: "1 solid black",
    
  },
  logo: {
    width: "80%",
    height: "64px",
  
    
  },
  mapa:{
    width:"100%",
    height:"260px",
    paddingTop:10
  },
  datos: {
    //display: "flex",
    flexDirection: "row",
    //  justifyContent:"space-between",

    width: "50%",
  },
  labeldatos: {
    fontSize: 11,
    fontWeight: "bold",
    textAlign: "left",
    marginTop: 5,
    width: "20mm",
  },
  textdatos: {
    fontSize: 11,
    textAlign: "left",
    marginTop: 5,
    width: "60mm",
  },

  labelPago: {
    fontWeight: "bold",
    textAlign: "center",
  },
  table: {
    display: "table",

    marginTop: "5mm",
    border: "1px solid grey",
   
  },
  tableRow: {
    marginBottom: "2mm",
    flexDirection: "row",
  
    textAlign: "center",
  
  },
  PaymentRow: {
    flexDirection: "row",
    fontSize: 11,
    textAlign: "center",
    //marginTop: "5mm",
    border: "1 solid grey",
    backgroundColor: "#464566",
    color: "white",
  },

  observaciones: {
    
    marginTop: "10mm",
    padding: 10,
    textAlign: "justify",
  },
  totales: {
    width: "20%",
    backgroundColor: "#464566",
    color: "white",
    verticalAlign: "center",
  },
  tableTotales: {

    flexDirection: "row",
    textAlign: "center",
    justifyContent: "flex-end",
    fontSize: 14,
   
  },
  totales1: {
    width: "25%",
    border:"1px solid grey",
    verticalAlign: "center",
    fontWeight:"bold"
  },
  footer:{
    flexDirection:"row",
    display: "flex",
  color:"grey",
    position: 'absolute',
    paddingLeft:"15mm",
fontSize:8,
bottom:"10mm",

fontStyle:'italic'
  },

  tableReport: {
    display: "table",
    width: "auto",
    borderStyle: "solid",
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0,
    marginTop:15
  },
  tableRowReport: {
    flexDirection: "row",
  },
  tableColReport: {
    width: "33.33%",
    borderStyle: "solid",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    padding: 5,
  },
  tableCellReport: {
    fontSize: 10,
  },

});
