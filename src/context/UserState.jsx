import { useEffect, useState } from "react";
import { UserContext } from "./UserContext";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

const UserState = ({ children, ...props }) => {
  const { auth, app, db, db1, storage } = props;
  const [userData, setUserData] = useState({
    user: "",
    userUid: "",
    rol: "",
    email: "",
    idcw: "",
    eid: "",
    uid: "",
    entidad: "",
    sesion: "",
    wialonUser: "",
    
  });

  const [loading, setLoading] = useState(true);

  function userChange(userLogged) {
    setUserData(userLogged);
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        try {
          const docRef = doc(db, `usuarios/${firebaseUser.uid}`);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            const data = docSnap.data();
            setUserData({
              user: data.userName,
              userUid: firebaseUser.uid,
              rol: data.rol,
              email: data.email,
              idcw: data.idcw,
              eid: data.eid || "",
              uid: data.uid || "",
              entidad: data.entidad,
              sesion: "", // aún no se establece la sesión Wialon
              wialonUser: "",
            });
          }
        } catch (error) {
          console.error("Error al obtener datos del usuario:", error);
        }
      } else {
        setUserData({
          user: "",
          userUid: "",
          rol: "",
          email: "",
          idcw: "",
          eid: "",
          uid: "",
          entidad: "",
          sesion: "",
          wialonUser: "",
        });
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <UserContext.Provider
      value={{ userData, userChange, auth, db, app, storage, db1, loading }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserState;
