import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import PersonIcon from '@mui/icons-material/Person';
import { useState } from 'react';
import '../styles/Styles.css';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import { NavLink } from 'react-router-dom';
import SettingsIcon from '@mui/icons-material/Settings';
import logo_sos from "../assets/images/sos.png";
import logo from "../assets/images/logo3.png"

function NavBar() {
  const [userName,setUserName]= useState("Usuario adm")
  return (
    <Navbar expand="lg"  bg='dark' data-bs-theme="dark" 
    className="bg-body-tertiary "
   sticky="top"
    >
     
    <Container fluid>
    <Navbar.Brand href="/home" style={{display:"flex",width:"100%", justifyContent:"space-between"}}>
    <span>
    <div  className="divLogo" style={{padding:4,width:"8rem" ,clipPath:"polygon(0% 0%, 100% 0%, 100% 0%, 85% 100%, 0% 100%)"}}>
    <label className='ps-2'>telegrafia</label>
    </div>
   
    </span>
    <span>
    <img src={logo}  height={36}/>
    </span>
    
   </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
   
        <Nav className="ms-auto">
      
          <NavDropdown title={
          <span style={{color:"white"}}>
            <PersonIcon />
            {userName}
          </span>
        } 
         id="basic-nav-dropdown">
            <NavDropdown.Item href="/">Login <LoginIcon/></NavDropdown.Item>
            <NavDropdown.Item onClick={()=>{
              alert("Cerrar sesión")
            }}>
              Logout <LogoutIcon/>
            </NavDropdown.Item>
            
            <NavDropdown.Divider />
            <NavDropdown.Item href="/settings">
            <SettingsIcon/>
              Configuración
            </NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
  )
}

export default NavBar