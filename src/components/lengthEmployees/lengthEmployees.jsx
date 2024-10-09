import { useEffect, useState } from "react";

function LengthEmployees({onValChange}){

    const [size,setSize] = useState(50)
    const handleChange = (event)=>{
        setSize(event.target.value)
    }

    useEffect(()=>{
        onValChange(parseInt(size))
    },[size])

    return(
        <div className="filter-length">
            show
            <select name="length" id="length" value={size} onChange={handleChange}>
                <option value="10">10</option>
                <option value="25">25</option>
                <option value="50">50</option>
                <option value="100">100</option>
            </select>
            entries
        </div>
    )
}

export default LengthEmployees