import { useEffect, useState } from "react"
function Input({onValChange,label,type,id,error,val}){

    const [data,setData] = useState("")
    const [focus,setFocus] = useState(false)
    useEffect(()=>{
        
        if(val){
            setFocus(true)
            setData(val)
        } 
    },[])

    const handleChange = (event) =>{
        const { value } = event.target
        setData(value)
        onValChange(id,value)
    }

    const handleFocus = (event)=>{
        setFocus(true)
    }

    const handleBlur = (event)=>{

        if(data != ""){
            return;
        }

        setFocus(false)

    }

    return(
        <div className="form-row">
            <div className="form-input">
                <input type={type} className={`input ${focus?'complete':''}`} id={id} onChange={handleChange} onBlur={handleBlur} onFocus={handleFocus} placeholder="" value={data}/>
                <label className="label" htmlFor={id}>{label}</label>
            </div>
            {error?<div className="error">{error}</div>:""}
        </div>

    )
}

export default Input