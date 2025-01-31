
import { Routes, Route } from "react-router-dom";
import Reportes from "../pages/Reportes";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";



function Rutes() {
    return (
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/report" element={<Reportes/>}/>
            <Route path="/home" element={<Home/>} />
            <Route path="/register" element={<Register/>} />
        </Routes>
    )
}

export default Rutes
