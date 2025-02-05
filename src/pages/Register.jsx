import { useContext, useState } from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import SaveIcon from '@mui/icons-material/Save';
import { UserContext } from "../context/UserContext";
import { createUserWithEmailAndPassword } from "firebase/auth";
function Register() {

/**
 * Declaramos las variables que usaremos con los input text
 */
const [nombre,setNombre]=useState("");
const [email,setEmail]=useState("");
const [password,setPassword]=useState("");

  const [userRol, setUserRol] = useState('');

  /**
   * 
   * Obtenemos los datos del usuario y sesión, con usercontext
   */
const {userData, auth,db}=useContext(UserContext);
const rol=userData.rol;
const [entidad,setEntidad]=useState(userData.entidad);
const [idcw,setIdcw]=useState(userData.idcw);
const addUser=async(e)=>{
  e.preventDefault();
  if(userRol!==""){
    const infoUser=await createUserWithEmailAndPassword(auth,email,password).then((userCredential)=>{
      return userCredential;
    }).catch((error)=>{
      switch (error.code) {
        case "auth/weak-password":
          swal("La contraseña debe contener al menos 6 caracteres", {
            icon: "error",
          });
        
          break;
        case "auth/email-already-in-use":
          swal("El usuario " + email + " ya existe", {
            icon: "error",
          });
        
          break;
  
        default:
          swal("No se puede crear  el usuario con estos datos. Por favor contactese con el  administrador del sistema.", {
            icon: "error",
          });
         
          console.log(error.message);
      }
      limpiarDatos();
    });
    /**
     * Guardamos los datos del usuario en otra colección
     */
    const docuRef=doc(db,`usuarios/${infoUser.user.uid}`);
    setDoc(docuRef,{
      userName:nombre,
      email:email,
      rol:userRol,
      idcw:idcw,
      entidad:entidad
    })
    swal("Usuario "+nombre+", creado exitosamente",{
      icon:"success",
    });
  }else{
    swal("Debe seleccionar un rol para el usuario",{
      icon:"warning"
    });
  }
  limpiarDatos();
}
const limpiarDatos=()=>{
setNombre("");
setEmail("");
setPassword("");
setUserRol('');
setIdcw("");
}
 
  const handleSelectChange = (e) => {
    setUserRol(e.target.value);
  };
  return (
    <Container
      fluid
      className="d-flex justify-content-center align-items-center"
      style={{ height: "80vh" }}
    >
      <Card className="bg-dark text-white-50 ">
        <Card.Title>
          <div style={{ padding: 10 }}>Agregar nuevo usuario</div>
        </Card.Title>
        <Form onSubmit={addUser}>
          <Form.Group>
            <div style={{ padding: 10 }}>
              <Row>
                <Col lg={5} md={5} sm={12} xs={12}>
                  <Form.Label>Nombres</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Ingrese su nombre completo"
                    required
                  />
                </Col>
                <Col lg={4} md={5} sm={12} xs={12}>
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="ejemplo@ejemplo.com"
                    required
                  />
                </Col>
                <Col lg={3} md={2} sm={12} xs={12}>
                  <Form.Label>Teléfono</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="0987654321"
                    required
                  />
                </Col>
              </Row>
            </div>
            <div style={{ padding: 10 }}>
              <Row>
                <Col lg={5} md={5} sm={12} xs={12}>
                  <Form.Label>Contraseña</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Ingrese su contraseña"
                    required
                  />
                </Col>
                <Col lg={4} md={4} sm={4} xs={6}>
                <Form.Label>Rol</Form.Label>
                  <Form.Select
                   value={userRol} 
            onChange={handleSelectChange}
            required
                  >
                     <option value="">Selecciona...</option>
            <option value="opcion1">Super administrador</option>
            <option value="opcion2">Administrador</option>
            <option value="opcion3">Operador</option>
          
                  </Form.Select>
                </Col>
              </Row>
            </div>
          </Form.Group>
        
          <Row>
            <Button className="btnLogin" type="submit">
              {" "}
              <SaveIcon/> Guardar  
            </Button>
          </Row>
        </Form>
      </Card>
    </Container>
  );
}

export default Register;
