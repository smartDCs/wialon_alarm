import { useState } from "react";
import { UserContext } from "./UserContext";

const UserState=({children, ...props})=>{
    const {auth, app, db, db1,storage}=props;
    const [userData, setUserData]=useState({
        user:"",
        userUid:"",
        rol:"",
        email:"",
        idcw:"",
        eid:"",
        uid:"",
        entidad:"",
        sesion:"",
        wialonUser:""

    });
    function userChange(userLogged){
        setUserData(userLogged);
    }
    return(
        <UserContext.Provider  value={{userData, userChange, auth,db,app,storage,db1}}>
            {children}
        </UserContext.Provider>
    )

}
export default UserState