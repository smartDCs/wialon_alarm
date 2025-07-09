import { useContext, useState } from "react";
import { Button, Card, Container, Form } from "react-bootstrap";
import { UserContext } from "../context/UserContext";
import { sendPasswordResetEmail } from "firebase/auth";

function RestorePassword() {
    const {auth}=useContext(UserContext);
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const handleResetPassword = (e) => {
        e.preventDefault();
       
          sendPasswordResetEmail(auth,email).then(()=>{
            setMessage(`Se ha enviado un enlace de restablecimiento de contraseña a ${email}, si no aparece en tu bandeja de entrada, revisa la carpeta de spam o contactate con el administrador del sistema.`);
            setEmail('');
          }).catch((error)=>{
            setMessage('Error al enviar el correo electrónico de restablecimiento de contraseña');
            console.log(error);
          })
          
     
      };
  return (
    <Container fluid className="containerImage">
      <Card className="cardLogin">
        <Card.Body style={{ color: "white" }}>
          <h2 className="text-center">Restaurar Contraseña</h2>
          <p
            style={{
              fontSize: "0.9rem",
              fontStyle: "italic",
              textAlign: "justify",
            }}
          >
            Para restaurar tu contraseña, por favor ingresa tu correo
            electrónico y te enviaremos las instrucciones
          </p>
          <Form onSubmit={handleResetPassword} >
          <Form.Group>
            <Form.Control
              type="text"
              placeholder="Ingrese su correo electrónico"
              required
              className="mb-3"
              value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
           <Button variant="outline-primary" type="submit" className="w-100" >Enviar</Button>
</Form>
         
          {message&&<p style={{fontSize:"0.9rem", paddingTop:10,fontStyle:"italic", textAlign:"justify"}}>{message}</p>}
        </Card.Body>
      </Card>
    </Container>
  );
}

export default RestorePassword;
