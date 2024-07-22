import { useState } from "react"
function Input({onValChange,label,type,id,error}){

    const [data,setData] = useState("")
    const handleChange = (event) =>{
        const { value } = event.target
        setData(value)
        onValChange(id,value)
    }

    const handleFocus = (event)=>{
        const parent = event.target.parentNode
        parent.querySelector(".label").style.display = "block"
    
        const label = parent.querySelector(".label").style.animation = "focusIn 0.2s forwards"
    }

    const handleBlur = (event)=>{

        const parent = event.target.parentNode

        if(data != ""){
            return;
        }

        parent.querySelector(".label").style.animation = "focusOut 0.2s forwards"
    }

    return(
        <div className="form-row">
            <div className="form-input">
                <input type={type} className="input" id={id} onChange={handleChange} onBlur={handleBlur} onFocus={handleFocus} placeholder="" value={data}/>
                <label className="label" htmlFor={id}>{label}</label>
            </div>
            {error?<div className="error">{error}</div>:""}
        </div>

    )
}

export default Input