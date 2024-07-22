
import Input from "../input/input"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Calendar from "../calendar/calendar";
import Dropdown from "../dropdown/dropdown";
import states from "../../utils/states";
import departments from "../../utils/departments";
import Employee from "../../models/employee";
import { useEffect, useState } from "react";
import Api from "../../api/api";
import Modale from "../modale/modale";

function FormEmployee(){

    const [errorFirstname,setErrorFirstname] = useState("")
    const [errorLastname,setErrorLastname] = useState("")
    const [modale,setModale] = useState(false)
    const [infoModale,setInfoModale]        = useState("");
    const [messageModale,setMessageModale]        = useState("");
    const [titleModale,setTitleModale]        = useState("");
    const [imageModale,setImageModale]        = useState("");
    const [errorStreet,setErrorStreet] = useState("")
    const [errorCity,setErrorCity] = useState("")
    const [errorState,setErrorState] = useState("")
    const [errorZipCode,setErrorZipCode] = useState("")
    const [errorDepartment,setErrorDepartment] = useState("")


    const [formUser, setFormUser] = useState({
        firstname: '',
        lastname: '',
        birthday: '',
        startdate: '',
        street: '',
        city: '',
        state: '',
        zipcode: '',
        department: ''
      });

    const handleSubmit = async (event) =>{
        event.preventDefault();
        

        let res ; 
        res = await Api.insertEmployee(formUser)

        if(!res){
            setInfoModale("error")
            setTitleModale("Error create employee")
            setMessageModale("The employee could not be created")
            setModale(true);
            console.log(formUser)
            const user =  Object.keys(formUser);
            user.forEach(name=>{
                console.log(name+" "+formUser[name])
                checkForm(name,formUser[name])
            })
            return;
        }

        setInfoModale("success")
        setTitleModale("New employee")
        setMessageModale("The employee has been created")
        setModale(true);
        return

    }

    const handleValChange = (name,value) =>{

        let objEmployee = {
            ...formUser,
            [name]: value,
          }

        const employee = new Employee(objEmployee)
        checkForm(name,value)
        setFormUser(employee);
        
        
    }

    const checkForm = (name,value)=>{
        const regexText = /^[a-zA-Z\s]+$/;
        const regexZipCode = /^[0-9]{5}$/;
        switch(name){
            case "firstname":
                if(!regexText.test(value)){
                    setErrorFirstname("Le prénom n'est pas composé que de lettres")
                }
                else{
                    setErrorFirstname("")
                }
                break;

            case "lastname":
                if(!regexText.test(value)){
                    setErrorLastname("Le nom n'est pas composé que de lettres")
                }
                else{
                    setErrorLastname("")
                }
                break;
            case "street":
                if(!regexText.test(value)){
                    setErrorStreet("La rue n'est pas composé que de lettres")
                }
                else{
                    setErrorStreet("")
                }
                break;
            case "city":
                if(!regexText.test(value)){
                    setErrorCity("La ville n'est pas composé que de lettres")
                }
                else{
                    setErrorCity("")
                }
                break;
            case "state":
                if(!regexText.test(value)){
                    setErrorState("L'Etat n'est pas composé que de lettres")
                }
                else{
                    setErrorState("")
                }
                break;
            case "zipcode":
                if(!regexZipCode.test(value)){
                    setErrorZipCode("Code postal incorrect")
                }
                else{
                    setErrorZipCode("")
                }
                break;
            case "department":
                if(!regexText.test(value)){
                    setErrorDepartment("Le service n'est pas composé que de lettres")
                }
                else{
                    setErrorDepartment("")
                }
                break

        }


    }

    const closeModale = ()=>{
        setModale("");
    }


    return(
        <>
            <form className="formEmployee">
                <Input type="text" id="firstname" label="First Name" error={errorFirstname} onValChange={handleValChange}/>
                <Input type="text" id="lastname" label="Last Name" error={errorLastname} onValChange={handleValChange}/>
                <Calendar label="Date of Birth" id="birthday" onValChange={handleValChange}/>
                <Calendar label="Start Date" id="startdate" onValChange={handleValChange}/>

                <Input type="text" label="Street" id="street" error={errorStreet} onValChange={handleValChange}/>
                <Input type="text" label="City" id="city" error={errorCity} onValChange={handleValChange}/>

                <Dropdown data={states} label="State" id="state" error={errorState} onValChange={handleValChange}/>


                <Input type="text" label="Zip Code" id="zipcode" error={errorZipCode} onValChange={handleValChange}/>

                <Dropdown data={departments} label="Department" id="department" error={errorDepartment} onValChange={handleValChange}/>

                <button onClick={handleSubmit}>Save</button>

                
            </form>
            <Modale message={messageModale} title={titleModale} type={infoModale} show={modale} onclose={closeModale}/>
        </>
        
    )
}

export default FormEmployee