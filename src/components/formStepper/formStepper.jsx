
import Input from "../input/input"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Calendar from "../calendar/calendar";
import Dropdown from "../dropdown/dropdown";
import states from "../../utils/states";
import departments from "../../utils/departments";
import Employee from "../../models/employee";
import { useContext, useEffect, useState } from "react";
import Api from "../../api/api";
import Modal  from "modal-wh"
import { MyContext } from "../../context/context";
import FormEmployee from "../formEmployee/formEmployee";

function FormStepper(){
    const {dataContext,setDataContext} = useContext(MyContext)
    const [errorFirstname,setErrorFirstname] = useState("")
    const [errorLastname,setErrorLastname] = useState("")
    const [errorBirthday,setErrorBirthday] = useState("")
    const [errorStartDate,setErrorStartDate] = useState("")
    const [modale,setModale] = useState(false)
    const [infoModale,setInfoModale]        = useState("");
    const [messageModale,setMessageModale]        = useState("");
    const [titleModale,setTitleModale]        = useState("");
    const [errorStreet,setErrorStreet] = useState("")
    const [errorCity,setErrorCity] = useState("")
    const [errorState,setErrorState] = useState("")
    const [errorZipCode,setErrorZipCode] = useState("")
    const [errorDepartment,setErrorDepartment] = useState("")
    const [step,setStep] = useState(1)
    const [resetForm,setResetForm] = useState(false)

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

    const handleSubmit = async () =>{        

        let res ; 
        res = await Api.insertEmployee(formUser)
        
        if(!res){
            setInfoModale("error")
            setTitleModale("Error create employee")
            setMessageModale("The employee could not be created")
            setModale(true);
            const user =  Object.keys(formUser);
            user.forEach(name=>{
                checkForm(name,formUser[name])
            })
            return;
        }
        setFormUser({
            firstname: '',
            lastname: '',
            birthday: '',
            startdate: '',
            street: '',
            city: '',
            state: '',
            zipcode: '',
            department: ''
          })

        setInfoModale("success")
        setTitleModale("New employee")
        setMessageModale("The employee has been created")
        setModale(true);
        setDataContext([...dataContext,res])

        setResetForm(true)

        return

    }

    useEffect(()=>{
        // setStep(1);
        // renderStep();
    },[resetForm])

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
        const regexDate = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;

        switch(name){
            case "firstname":
                if(!regexText.test(value)){
                    setErrorFirstname("Le prénom n'est pas composé que de lettres")
                    return false;
                }
                else{
                    setErrorFirstname("")
                    return true;
                }
                break;

            case "lastname":
                if(!regexText.test(value)){
                    setErrorLastname("Le nom n'est pas composé que de lettres")
                    return false;
                }
                else{
                    setErrorLastname("")
                    return true;
                }
                break;
            case "birthday":
                if(!regexDate.test(value)){
                    setErrorBirthday("Le format de la date est incorrect")
                    return false;
                }
                else{
                    setErrorBirthday("")
                    return true;
                }
                break;
            case "startdate":
                if(!regexDate.test(value)){
                    setErrorStartDate("Le format de la date est incorrect")
                    return false;
                }
                else{
                    setErrorStartDate("")
                    return true;
                }
                break;
            case "street":
                if(!regexText.test(value)){
                    setErrorStreet("La rue n'est pas composé que de lettres")
                    return false;
                }
                else{
                    setErrorStreet("")
                    return true;
                }
                break;
            case "city":
                if(!regexText.test(value)){
                    setErrorCity("La ville n'est pas composé que de lettres")
                    return false;
                }
                else{
                    setErrorCity("")
                    return true;
                }
                break;
            case "state":
                if(!regexText.test(value)){
                    setErrorState("L'Etat n'est pas composé que de lettres")
                    return false;
                }
                else{
                    setErrorState("")
                    return true;
                }
                break;
            case "zipcode":
                if(!regexZipCode.test(value)){
                    setErrorZipCode("Code postal incorrect")
                    return false;
                }
                else{
                    setErrorZipCode("")
                    return true;
                }
                break;
            case "department":
                if(!regexText.test(value)){
                    setErrorDepartment("Le service n'est pas composé que de lettres")
                    return false;
                }
                else{
                    setErrorDepartment("")
                    return true;
                }
                break

        }


    }

    const closeModale = ()=>{
        setModale("");
        location.reload();
    }


    const renderStep = ()=>{

        switch(step){
            
            case 1 :
                return(
                <div>
                    <Input type="text" id="firstname" label="First Name" error={errorFirstname} val={formUser.firstname} onValChange={handleValChange}/>
                    <Input type="text" id="lastname" label="Last Name" error={errorLastname} val={formUser.lastname} onValChange={handleValChange}/>
                    <Calendar label="Date of Birth" errorForm={errorBirthday} setErrorForm={setErrorBirthday} id="birthday" val={formUser.birthday} onValChange={handleValChange}/>
                </div>
                )
            case 2 : 
                return(
                    <div>
                        <Dropdown data={departments} label="Department" id="department" error={errorDepartment} val={formUser.department} onValChange={handleValChange}/>
                        <Calendar label="Start Date" errorForm={errorStartDate} setErrorForm={setErrorStartDate} id="startdate" val={formUser.startdate} onValChange={handleValChange}/>
                    </div>
                )
            case 3 :
                return(
                    <div>
                        <Input type="text" label="Street" id="street" val={formUser.street} error={errorStreet} onValChange={handleValChange}/>
                        <Input type="text" label="City" id="city" val={formUser.city} error={errorCity} onValChange={handleValChange}/>
                        <Dropdown data={states} label="State" id="state" error={errorState} val={formUser.state} onValChange={handleValChange}/>
                        <Input type="text" label="Zip Code" id="zipcode" val={formUser.zipcode} error={errorZipCode} onValChange={handleValChange}/>
                    </div>
                )
        }
    }

    const checkStep = () =>{
        
        switch(step){
            case 1 :
                let testFirstName, testLastName,testBirthday
                testFirstName = checkForm("firstname",formUser.firstname)
                testLastName = checkForm("lastname",formUser.lastname)
                testBirthday = checkForm("birthday",formUser.birthday)
                if(!testFirstName || !testLastName || !testBirthday){
                    return false
                }
                return true
            case 2 :
                let testDepartement, testStartDate
                testDepartement = checkForm("department",formUser.department)
                testStartDate = checkForm("startdate",formUser.startdate)
                if(!testDepartement || !testStartDate){

                    return false
                }
                return true
            case 3 :
                let testStreet, testCity, testState, testZipCode
                testStreet = checkForm("street",formUser.street)
                testCity = checkForm("city",formUser.city)
                testState = checkForm("state",formUser.state)
                testZipCode = checkForm("zipcode",formUser.zipcode)
                if(!testStreet || !testCity || !testState || !testZipCode){
                    return false
                }
                return true

        }
    }

    const prevStep = (event) =>{
        event.preventDefault()
        setStep((prevStep)=>prevStep -1)
    }

    const nextStep = (event) =>{
        event.preventDefault()

        if(!checkStep()) return
        
        if(step == 3){
            // save BDD
            handleSubmit()
            return;
        }

        setStep((nextStep)=>nextStep + 1)
    }

    return(
        <>
            <form className="formEmployee">
                {renderStep()}
                <div className="btn-stepper">
                    {step > 1 && <button onClick={prevStep}>Retour</button> }
                    {<button onClick={nextStep}>{step==3?"Enregistrer":"Suivant"}</button> }
                </div>


            </form>
            <Modal message={messageModale} title={titleModale} type={infoModale} show={modale} onclose={closeModale}/>
        </>
        
    )
}

export default FormStepper