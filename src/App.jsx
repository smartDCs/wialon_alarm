
import { BrowserRouter } from 'react-router-dom'
import './App.css'
import NavBar from './components/NavBar'
import Rutes from './routes/Rutes'
import { Container } from 'react-bootstrap'
import DataState from './context/DataState'

function App() {
  

  return (
    <DataState>
 <BrowserRouter>
    <NavBar/>
 
    <Rutes/>


 </BrowserRouter>

 </DataState>
 
  )
}

export default App
