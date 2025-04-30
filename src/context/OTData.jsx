import { useState } from "react";
import { OTContext } from "./OTContext";

// eslint-disable-next-line react/prop-types
const OTData = ({ children }) => {
  const [fechaEmision, setFechaEmision] = useState("");
  const [horaEmision, setHoraEmision] = useState("");
  const [emisor, setEmisor] = useState({
    nombre: "",
    email: "",
  });

  const [dataEvento, setDataEvento] = useState({
    detalles: "",
    usuario: "",
    cel: "",
    email: "",
    estacion: "",
    motivo: "",
    fecha: "",
    numeroOt: "",
  });

  return (
    <OTContext.Provider
      value={{
        fechaEmision,
        horaEmision,
        setFechaEmision,
        setHoraEmision,
        emisor,
        setEmisor,

        dataEvento,
        setDataEvento,
      }}
    >
      {" "}
      {children}
    </OTContext.Provider>
  );
};

export default OTData;
