import {
  Button,
  Card,
  Col,
  Container,
  Form,
  InputGroup,
  Modal,
  Row,
  Spinner,
} from "react-bootstrap";
import LoginIcon from "@mui/icons-material/Login";
import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";
import { signInWithEmailAndPassword } from "firebase/auth";
import swal from "sweetalert";
import { doc, getDoc } from "firebase/firestore";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

function Login() {
 
  /**
   * Declaramos las entradas de texto para el login
   */
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState({ loading: false, msg: "" });
const [verPassword, setVerPassword] = useState(false);
  /**
   * obtenemos los datos de sesion mediante useContext
   */

  const { auth, userChange, db } = useContext(UserContext);
  const navigate = useNavigate();

  /**
   *
   * metodo para iniciar sesion
   */
  const iniciarSesion = (e) => {
    e.preventDefault();
    setIsLoading({
      loading: true,
      msg: "Iniciando sesión, por favor espere",
    });
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        const docuRef = doc(db, `usuarios/${user.uid}`);
        getDoc(docuRef)
          .then((docuData) => {
            var sess = wialon.core.Session.getInstance();
            sess.initSession("https://hst-api.wialon.com");

            sess.loginToken(docuData.data().idcw, "", (data) => {
              if (data) {
                console.log(
                  "login data",
                  wialon.core.Errors.getErrorText(data)
                );
                swal(
                  "No se pudo iniciar sesión, intentelo nuevamente o consultelo con el administrador",
                  {
                    icon: "error",
                  }
                );
                setIsLoading(false);
                navigate("/");
              } else {
                console.log("login success");
                setIsLoading({ loading: false, msg: "" });
                var user = wialon.core.Session.getInstance().getCurrUser();
                userChange({
                  user: docuData.data().userName,
                  idcw: docuData.data().idcw,
                  rol: docuData.data().rol,
                  email: docuData.data().email,
                  entidad: docuData.data().entidad,
                  sesion: wialon.core.Session.getInstance(),
                  wialonUser: user.getName(),
                });
                navigate("/home");
              }
            });
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        const errorCode = error.code;
        switch (errorCode) {
          case "auth/too-many-requests":
            alert(
              "Se ha excedido la cantidad de intentos de inicio de sesión permitidos. Por favor, inténtelo nuevamente más tarde"
            );
            break;
          case "auth/invalid-credential":
            alert("Email o contraseña inválido, por favor intente nuevamente");
            break;
          case "auth/wrong-password":
            alert("Contraseña incorrecta");
            break;
          case "auth/user-not-found":
            alert("Usuario no encontrado.");
            break;
          default:
            alert(
              "No se puede iniciar sesión, por favor contactese con el administrador del sistema"
            );
        }
        setIsLoading(false);
        console.log(error.message);
      });
  };
 
  return (
    <Container
      fluid
      className="containerImage"
    >
        <Card className="cardLogin">
            <Form className="p-4 text-white" onSubmit={iniciarSesion}>
              <Form.Group>
                <Form.Label>Usuario</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="ejemplo@ejemplo.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                </Form.Group>
                <Form.Group>
 <Form.Label>Contraseña</Form.Label>
 <InputGroup>
   <Form.Control
                 type={verPassword ? "text" : "password"}
                  placeholder="Ingrese su contraseña"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
               <Button
          variant="outline-secondary"
          onClick={() => setVerPassword((prev) => !prev)}
        >
          {verPassword ? <VisibilityOffIcon/> : <VisibilityIcon/>}
        </Button>   
 </InputGroup>
             
                </Form.Group>
              <Row>
              <Col lg={6} md={6} sm={12} xs={12}>
                <Button className="btnLogin" type="submit">
                  <LoginIcon /> Iniciar sesión
                </Button>
                </Col>
                <Col lg={6} md={6} sm={12} xs={12}>
                   <Button className="btnLogin "
                   onClick={() => navigate("/restore_password")}
                   >
                  Olvidé mi contraseña
                </Button>
                </Col>
              </Row>
            </Form>
          </Card>

   
      <Modal show={isLoading.loading}>
        <Modal.Title
          style={{ display: "flex", justifyContent: "center", margin: 20 }}
        >
          <Spinner animation="grow" variant="info" size="sm" />
          <Spinner animation="grow" variant="info" size="sm" />
          <Spinner animation="grow" variant="primary" size="sm" />
          Iniciando sesión
        </Modal.Title>
        <Modal.Body>
          <label>{isLoading.msg}</label>
        </Modal.Body>
      </Modal>
    </Container>
  );
}

export default Login;
