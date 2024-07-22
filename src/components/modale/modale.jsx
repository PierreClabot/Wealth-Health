import { faL } from "@fortawesome/free-solid-svg-icons"
import { useEffect, useState } from "react"

import success from "../../assets/success.png"
import warning from "../../assets/warning.png"
import error from "../../assets/wrong.png"

function Modale({type,image,title,message,onclose,show}){

    const [icone,setIcone]  = useState()

    const getIcone = (type)=>{
        switch(type){
            case "success" :
                return success
            case "warning" :
                return warning
            case "error" :
                return error
        }
    }

    useEffect(()=>{
        setIcone(getIcone(type))
    },[type])
    
    


    return(
        show?(<div className="container-modale">
            <div className="modale">
                <img src={icone}/>
                <h2>{title}</h2>
                <p>{message}</p>
                <button onClick={onclose}>OK</button>
            </div>
        </div>):""   
    )
}

export default Modale