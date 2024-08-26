import Header from "../../components/header/header"

import { MyContext } from "../../context/context";
import Table from "../../components/table/table"
import { useContext } from "react";
import { useEffect } from "react";
import Api from "../../api/api";

function Employees(){

    const { dataContext, setDataContext } = useContext(MyContext);
    useEffect(()=>{
        async function fetchData(){
            const countEmployees = await Api.countEmployees()
            if(countEmployees == dataContext.length){
                console.log("data non synchro, aucun changement")
                return;
            }
            console.log("data synchro")
            Api.getEmployees()
            .then(employees=>{
                setDataContext(employees)
            })
        }

        fetchData()
    },[])

    useEffect(()=>{
        console.log(dataContext)
    },[dataContext])
    return(
        <>
             <Header /> 
             <Table />           
        </>
    )
}
export default Employees