import { Button, Card, Col, Container, Form, Modal, Row, Spinner } from "react-bootstrap";
import LoginIcon from "@mui/icons-material/Login";
import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";
import { signInWithEmailAndPassword } from "firebase/auth";
import swal from "sweetalert";
import {doc,getDoc} from "firebase/firestore"
import {W} from "wialonjs-api"
function Login() {
/**
 * Declaramos las entradas de texto para el login
 */
const [email,setEmail]=useState("");
const [password,setPassword]=useState("");
const [isLoading, setIsLoading]=useState({loading:false,msg:""});

/**
 * obtenemos los datos de sesion mediante useContext
 */

const {auth,userChange,db}=useContext(UserContext);
  const navigate = useNavigate();

  /**
   * 
   * metodo para iniciar sesion
   */
  const iniciarSesion = (e) => {
    e.preventDefault();
setIsLoading({
  loading:true,
  msg:"Iniciando sesión, por favor espere"
});
signInWithEmailAndPassword(auth,email,password)
.then((userCredential)=>{
  const user=userCredential.user;
  const docuRef=doc(db,`usuarios/${user.uid}`);
  getDoc(docuRef)
  .then((docuData)=>{
    var sess=wialon.core.Session.getInstance();
    sess.initSession("https://hst-api.wialon.com");
   
    sess.loginToken(docuData.data().idcw,"",(data)=>{
      if(data){
        console.log("login data",wialon.core.Errors.getErrorText(data));
        swal("No se pudo iniciar sesión, intentelo nuevamente o consultelo con el administrador",{
          icon:"error",
        }

        );
        setIsLoading(false);
        navigate("/");
      }
      else{
        console.log("login success");
        setIsLoading({loading:false,msg:""});
        var user=wialon.core.Session.getInstance().getCurrUser();
        userChange({
user:docuData.data().userName,
idcw:docuData.data().idcw,
rol:docuData.data().rol,
email:docuData.data().email,
entidad:docuData.data().entidad,
sesion:wialon.core.Session.getInstance(),
wilonUser:user.getName(),
        });
        navigate("/home");
      }
    });
  }).catch((error)=>{
    console.log(error);
  });
}).catch((
  error
)=>{
  const errorCode=error.code;
  switch (errorCode){
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
})

   
  };
  return (
    <Container
      fluid
      className="d-flex justify-content-center align-items-center"
      style={{ height: "80vh" }}
    >
      <Row style={{width:"100%", height:"100%", display:"flex", justifyContent:"center",alignContent:"center"}}>
        <Col lg={5} md={5} sm={10} xs={12}>
          <Card
            className="bg-dark text-white-50"
            
          >
            <Form className="p-4" onSubmit={iniciarSesion}>
              <Form.Group>
                <Form.Label>Usuario</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="ejemplo@ejemplo.com"
                  required
                  value={email}
                  onChange={(e)=>setEmail(e.target.value)}
                />
                <Form.Label>Contraseña</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Ingrese su contraseña"
                  required
                  value={password}
                  onChange={(e)=>setPassword(e.target.value)}
                />
              </Form.Group>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <Button
                  className="btnLogin text-white-50"
                  onClick={() => {
                    navigate("/register");
                  }}
                >
                  Registrar
                </Button>
                <Button className="btnLogin text-white-50">
                  Olvidé mi contraseña
                </Button>
              </div>
              <Row>
                <Button className="btnLogin" type="submit">
                  <LoginIcon /> Iniciar sesión
                </Button>
              </Row>
            </Form>
          </Card>
        </Col>
      </Row>
      <Modal show={isLoading.loading}>
        <Modal.Title style={{display:"flex", justifyContent:"center",margin:20}}>
<Spinner animation="grow" variant="info" size="sm"/>
<Spinner animation="grow" variant="info" size="sm"/>
<Spinner animation="grow" variant="primary" size="sm"/>
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
