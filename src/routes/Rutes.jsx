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
import ProtectedRoute from "../components/ProtectedRoute";
import RestorePassword from "../pages/RestorePassword";

function Rutes() {
  const { loading } = useContext(UserContext);

  if (loading) return <p style={{ textAlign: 'center' }}>Cargando sesión...</p>;



  return (
    <Routes>
      <Route path="/" element={ <Login />} />
       <Route path="/restore_password" element={ <RestorePassword />} />
      <Route path="/register" element={ <ProtectedRoute><Register /></ProtectedRoute>} />
      <Route
        path="/home"
        element={<ProtectedRoute> <Home /> </ProtectedRoute>}
      />
      <Route
        path="/report"
        element={<ProtectedRoute> <Report /> </ProtectedRoute>}
      />
      <Route
        path="/profile"
        element={<ProtectedRoute> <Profile /> </ProtectedRoute>}
      />
   
       <Route
        path="/historial"
        element={<ProtectedRoute> <Historial /> </ProtectedRoute>}
      />
      <Route path="*" element={<Navigate to="/" />} />
      <Route path="/reporte_trabajo" element={<ProtectedRoute><OrdenTrabajo/></ProtectedRoute>}/>
      <Route path="/trends" element={<ProtectedRoute><Trends/> </ProtectedRoute>}/>
      <Route path="/setup" element={<ProtectedRoute><Setup/> </ProtectedRoute>}/>
       <Route path="/users" element={<ProtectedRoute><Users/> </ProtectedRoute>}/>
        <Route path="/createUser" element={<ProtectedRoute><CreateUser/></ProtectedRoute>}/>
    </Routes>
  );
}

export default Rutes;
