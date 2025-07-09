import { BrowserRouter } from "react-router-dom";
import "./App.css";
import NavBar from "./components/NavBar";
import Rutes from "./routes/Rutes";
import dayjs from "dayjs";
import DataState from "./context/DataState";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "./firebase/FirebaseConfig";
import UserState from "./context/UserState";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { ToastContainer } from "react-toastify";
import { getDatabase } from "firebase/database";
import "react-toastify/dist/ReactToastify.css";
import OTData from "./context/OTData";
import ReportData from "./context/ReportData";
import "./assets/fuentes/fonts.css";
function App() {
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const db = getFirestore(app);
  const db1 = getDatabase();
  return (
    <UserState app={app} auth={auth} db={db} db1={db1}>
      <OTData>
        <DataState>
        <ReportData>
          <BrowserRouter>
            <NavBar />
            <div className="workArea">
            <Rutes />
            </div>
              <div
               style={{
            color: "black",
            display: "flex",
            position: "absolute",
            bottom: 5,
            right: 5,
            fontStyle: "italic",
            fontSize: "0.8rem",
          }}
              >
        <label
         
        >
          NexusEmbed © {dayjs().year()}
        </label>
      </div>
          </BrowserRouter>
          <ToastContainer position="top-right" autoClose={3000} />
          </ReportData>
        </DataState>
      </OTData>
    </UserState>
  );
}

export default App;
