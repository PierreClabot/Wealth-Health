import Header from "../../components/header/header"
import FormEmployee from "../../components/formEmployee/formEmployee"


function Home(){
    return(
    <>
        <Header />
        <div className="employee">
            <FormEmployee />
        </div>
        
    </>
    )
}

export default Home