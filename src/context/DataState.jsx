import { useState } from "react";
import { DataContext } from "./DataContext";
import { useContext, useEffect } from "react";
import { UserContext } from "./UserContext";
import { equalTo, onValue, orderByChild, query, ref } from "firebase/database";
const DataState = ({ children, ...props }) => {
   const { db1} = useContext(UserContext);
  const [neighborhood, setNeighborhood] = useState({
    name: "",
    lat: "",
    lng: "",
    id: "",
    phone: "",
  });
  const [eventCoords, setEventCoords] = useState([]);

  const [eventos, setEventos] = useState([
    {
      direccion: "",
      email: "",
      fecha: "",
      evento: "",
      telefono: "",
      urlImagen: "",
      usuario: "",
      latitud: "",
      longitud: "",
    },
  ]);
 useEffect(() => {
  const starCountRef = ref(db1, "eventos");
  const queryEvent = query(
    starCountRef,
    orderByChild("atendido"),
    equalTo(false)
  );
  onValue(queryEvent, (snapshot) => {
    if (snapshot.exists()) {
      const data = snapshot.val();
      const eventosArray = Object.keys(data).map((key, index) => ({
        ...data[key],
        index: index + 1,
      }));

      setEventos(eventosArray);
      const coordArray = eventosArray.map((evento) => [
        evento.latitud,
        evento.longitud,
      ]);
      setEventCoords(coordArray);
    } else {
      console.log("no se encontraron los eventos");
    }
  });
}, [db1]);

  return (
    <DataContext.Provider value={{ neighborhood, setNeighborhood,eventos,eventCoords }}>
      {children}
    </DataContext.Provider>
  );
};
export default DataState;
