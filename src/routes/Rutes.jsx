import { Routes, Route, Navigate } from "react-router-dom";

import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Profile from "../pages/Profile";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import Historial from "../pages/Historial";
import OrdenTrabajo from "../reports/OrdenTrabajo";
import { Setup } from "../pages/Setup";
import Trends from "../pages/Trends";
import Report from "../reports/Report";
import Users from "../pages/Users";
import CreateUser from "../pages/CreateUser";

function Rutes() {
  const { userData, loading } = useContext(UserContext);

  if (loading) return <p style={{ textAlign: 'center' }}>Cargando sesión...</p>;

  const isAuth = !!userData.email;

  return (
    <Routes>
      <Route path="/" element={isAuth ? <Navigate to="/home" /> : <Login />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/home"
        element={isAuth ? <Home /> : <Navigate to="/" />}
      />
      <Route
        path="/report"
        element={isAuth ? <Report /> : <Navigate to="/" />}
      />
      <Route
        path="/profile"
        element={isAuth ? <Profile /> : <Navigate to="/" />}
      />
   
       <Route
        path="/historial"
        element={isAuth ? <Historial /> : <Navigate to="/" />}
      />
      <Route path="*" element={<Navigate to="/" />} />
      <Route path="/reporte_trabajo" element={isAuth ?<OrdenTrabajo/> : <Navigate to="/" />}/>
      <Route path="/trends" element={isAuth ?<Trends/> : <Navigate to="/" />}/>
      <Route path="/setup" element={isAuth ?<Setup/> : <Navigate to="/" />}/>
       <Route path="/users" element={isAuth ?<Users/> : <Navigate to="/" />}/>
        <Route path="/createUser" element={isAuth ?<CreateUser/> : <Navigate to="/" />}/>
    </Routes>
  );
}

export default Rutes;
