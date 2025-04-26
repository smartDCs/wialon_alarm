import { Routes, Route, Navigate } from "react-router-dom";
import Reportes from "../pages/Reportes";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Profile from "../pages/Profile";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import Historial from "../pages/Historial";

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
        element={isAuth ? <Reportes /> : <Navigate to="/" />}
      />
      <Route
        path="/profile"
        element={isAuth ? <Profile /> : <Navigate to="/" />}
      />
      <Route
        path="/report"
        element={isAuth ? <Reportes /> : <Navigate to="/" />}
      />
       <Route
        path="/historial"
        element={isAuth ? <Historial /> : <Navigate to="/" />}
      />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default Rutes;
