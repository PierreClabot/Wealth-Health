import { faL } from "@fortawesome/free-solid-svg-icons"
import { useEffect, useState } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function Dropdown({data,label,id,onValChange,error}){

    const [visible,setVisible] = useState(false)
    const [arrData,setArrData] = useState(data)
    const [value,setValue] = useState("")
    const [isUpdate,setIsUpdate] = useState(false)

    useEffect(()=>{
        if(isUpdate){
            onValChange(id,value)
        }

        if(value === ""){
            setArrData(data)
            return
        }
        let arrDataFilter = arrData.filter((elem)=>{
            return elem.name.toLowerCase().includes(value.toLowerCase())
        })
        
        if(arrDataFilter.length > 0){
            // setVisible(true)
        }
        else{
            setVisible(false)
        }
        setArrData(arrDataFilter);

    },[value])


    const handleClickOption = (event) =>{
        setValue(event.target.getAttribute("data-value"))
        setIsUpdate(true)
        let target = event.target;
        let i = 0;
        while(!target.classList.contains("dropdown") && i<10){
            i++;
            target = target.parentNode;
        }

        target.querySelector(".label").style.display = "block"
        target.querySelector(".label").style.animation = "focusIn 0.2s forwards"

        setVisible(false)

    }

    const handleFocus = (event) =>{
        setVisible(true)
        const parent = event.target.parentNode
        parent.querySelector(".label").style.display = "block"
        parent.querySelector(".label").style.animation = "focusIn 0.2s forwards"
    }


    const handleBlur = (event)=>{

        const parent = event.target.parentNode

        if(value != ""){
            return;
        }

        parent.querySelector(".label").style.animation = "focusOut 0.2s forwards"
    }

    const handleChange = (event) =>{
        setValue(event.target.value);
        setVisible(true);
        setIsUpdate(true)
    }


    const handleClick = (event)=>{
        setVisible(!visible)
    }

    return(
        <div className="dropdown">
            <div className="input">
                <input type="text" id={id} onFocus={handleFocus} onBlur={handleBlur} onChange={handleChange} value={value}/>
                <label className="label" htmlFor={id}>{label}</label>
                <FontAwesomeIcon className={`icone ${visible?"open":""}`} onClick={handleClick} icon="fa-solid fa-chevron-down" />
            </div>
            <div className={`menu ${ visible? "open" : "" }`}>
                <ul>
                    {arrData.map((elem,index)=>{
                        return(<li key={index} data-value={elem.name} onClick={handleClickOption}>{elem.name}</li>)
                    })}
                </ul>
            </div>
            {error?<div className="error">{error}</div>:""}
        </div>
    )
}

export default Dropdown