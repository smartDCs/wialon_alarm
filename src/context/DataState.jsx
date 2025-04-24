import { useState } from "react"
import { DataContext } from "./DataContext"

const DataState=({children, ...props})=>{
    const [neighborhood,setNeighborhood]=useState({
        name:"",
        lat:"",
        lng:"",
        id:"",
        phone:""
    })
    return(
        <DataContext.Provider value={{neighborhood,setNeighborhood}}>
{children}
        </DataContext.Provider>
    )
}
export default DataState