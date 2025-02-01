
import { Routes, Route } from "react-router-dom";
import Reportes from "../pages/Reportes";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Profile from "../pages/Profile";


function Rutes() {
    return (
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/report" element={<Reportes/>}/>
            <Route path="/home" element={<Home/>} />
            <Route path="/register" element={<Register/>} />
            <Route path="/profile" element={<Profile/>} />
        </Routes>
    )
}

export default Rutes
