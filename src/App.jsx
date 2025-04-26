
import { BrowserRouter } from 'react-router-dom'
import './App.css'
import NavBar from './components/NavBar'
import Rutes from './routes/Rutes'

import DataState from './context/DataState'
import { initializeApp } from 'firebase/app'
import { firebaseConfig } from './firebase/FirebaseConfig'
import UserState from './context/UserState'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const app = initializeApp(firebaseConfig);
  const auth=getAuth(app);
const db=getFirestore(app)
  return (
    <UserState app={app} auth={auth} db={db}>
    <DataState>
 <BrowserRouter>
    <NavBar/>
 
    <Rutes/>


 </BrowserRouter>
 <ToastContainer position="top-right" autoClose={3000} />
 </DataState>
 </UserState>
  )
}

export default App
