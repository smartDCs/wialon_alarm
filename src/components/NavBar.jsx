import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import PersonIcon from "@mui/icons-material/Person";
import { useContext, useEffect, useState } from "react";
import "../styles/Styles.css";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import { NavLink, useNavigate } from "react-router-dom";
import SettingsIcon from "@mui/icons-material/Settings";
import { signOut } from "firebase/auth";
import logo from "../assets/images/logo3.png";
import SummarizeSharpIcon from "@mui/icons-material/SummarizeSharp";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import WarningAmberSharpIcon from "@mui/icons-material/WarningAmberSharp";
import DoorbellSharpIcon from '@mui/icons-material/DoorbellSharp';
import { UserContext } from "../context/UserContext";

function NavBar() {
  const navigate = useNavigate();
  /**
   * Obtenemos los datos de inicio de sesion
   */

  const { userData, userChange, auth, setUserData } = useContext(UserContext);
  const [nameUser, setNameUser] = useState("");
  const [currUser, setCurrUser] = useState("");
  useEffect(() => {
    setNameUser(userData.user);
    setCurrUser(wialon.core.Session.getInstance().getCurrUser());
  }, [userData]);

  const cerrarFB = () => {
    signOut(auth)
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const cerrarSesion = () => {
    cerrarFB();

    wialon.core.Session.getInstance().logout(function (code) {
      if (code) {
        console.log(wialon.core.Errors.getErrorText(code));
      } else {
        userChange({
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

        navigate("/");
      }
    });
  };

  return (
    <Navbar
      expand="lg"
      bg="dark"
      data-bs-theme="dark"
      className="bg-body-tertiary "
      sticky="top"
    >
      <Container fluid>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <Navbar.Toggle aria-controls="basic-navbar-nav" className="p-0 m-2" />
          <Navbar.Brand
            style={{
              display: "flex",
              width: "100%",
              justifyContent: "space-between",
            }}
            onClick={(e) => {
              e.preventDefault();
              navigate("/home");
            }}
          >
            <span>
              <div
                className="divLogo"
                style={{
                  padding: 4,
                  width: "8rem",
                  clipPath:
                    "polygon(0% 0%, 100% 0%, 100% 0%, 85% 100%, 0% 100%)",
                }}
              >
                <label className="ps-2">telegrafia</label>
              </div>
            </span>
            <span>
              <img src={logo} height={32} />
            </span>
          </Navbar.Brand>
        </div>

        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          <Nav className="ms-auto">
            <Nav.Link
              onClick={(e) => {
                e.preventDefault();
                navigate("/home");
              }}
            >
              <span style={{ color: "white", display: "flex" }}>
                <DoorbellSharpIcon /> Inicio
              </span>
            </Nav.Link>

            <Nav.Link
              onClick={(e) => {
                e.preventDefault();
                navigate("/report");
              }}
            >
              <span style={{ color: "white", display: "flex" }}>
                <SummarizeSharpIcon /> Reporte
              </span>
            </Nav.Link>
            <Nav.Link
             onClick={(e) => {
                e.preventDefault();
                navigate("/historial");
              }}
            >
              <span style={{ color: "white", display: "flex" }}>
                <WarningAmberSharpIcon /> Eventos
              </span>
            </Nav.Link>
            <NavDropdown
              title={
                <span style={{ color: "white" }}>
                  <PersonIcon />
                  {nameUser}
                </span>
              }
              id="basic-nav-dropdown"
              flip="true"
              align="end"
            >
              <NavDropdown.Item
                href="/"
                disabled={nameUser != "" ? true : false}
              >
                Login <LoginIcon />
              </NavDropdown.Item>
              <NavDropdown.Item onClick={cerrarSesion}>
                Logout <LogoutIcon />
              </NavDropdown.Item>

              <NavDropdown.Divider />
              <NavDropdown.Item href="/profile">
                <AccountBoxIcon />
                Perfil
              </NavDropdown.Item>
              <NavDropdown.Item href="/settings">
                <SettingsIcon />
                Configuración
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
