import { useEffect, useState } from "react"

function Search({onValChange}){
    const [val,setVal] = useState("")

    const handleChange = (event) =>{
        
        setVal(event.target.value)

    }
    
    useEffect(()=>{
        onValChange(val)
    },[val])

    return(
        <div className="search">
            Search : 
            <input type="text" onChange={handleChange} value={val}/>
        </div>
    )
}

export default Search