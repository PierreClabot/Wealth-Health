import Header from "../../components/header/header"
import FormEmployee from "../../components/formEmployee/formEmployee"
import FormStepper from "../../components/formStepper/formStepper";
import { MyContext } from "../../context/context"
import { useContext } from "react";
import { useEffect } from "react";

function Home(){

    const { dataContext, setDataContext } = useContext(MyContext);
    
    useEffect(()=>{
        // console.log("data home : ",dataContext)
    },[])
    return(
    <>
        <Header />
        <div className="employee">
            <FormStepper />
        </div>
        
    </>
    )
}

export default Home