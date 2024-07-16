
import Input from "../input/input"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Calendar from "../calendar/calendar";
import Dropdown from "../dropdown/dropdown";
import states from "../../utils/states";
import departments from "../../utils/departments";
import Employee from "../../models/employee";
import { useState } from "react";
import Api from "../../api/api";
import { faL } from "@fortawesome/free-solid-svg-icons";

function FormEmployee(){

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
        console.log(formUser)
        let res ; 
        res = Api.insertEmployee(formUser)
        if(!res){
            setModale("");
            return;
        }

    }

    const handleValChange = (name,value) =>{
        let objEmployee = {
            ...formUser,
            [name]: value,
          }

        const employee = new Employee(objEmployee)

        setFormUser(employee);
        
        
    }

    return(
        <form className="formEmployee">
            <Input type="text" id="firstname" label="First Name" onValChange={handleValChange}/>
            <Input type="text" id="lastname" label="Last Name" onValChange={handleValChange}/>
            <Calendar label="Date of Birth" id="birthday" onValChange={handleValChange}/>
            <Calendar label="Start Date" id="startdate" onValChange={handleValChange}/>

            <Input type="text" label="Street" id="street" onValChange={handleValChange}/>
            <Input type="text" label="City" id="city" onValChange={handleValChange}/>

            <Dropdown data={states} label="State" id="state" onValChange={handleValChange}/>


            <Input type="text" label="Zip Code" id="zipcode" onValChange={handleValChange}/>

            <Dropdown data={departments} label="Department" id="department" onValChange={handleValChange}/>

            <button onClick={handleSubmit}>Save</button>
        </form>
    )
}

export default FormEmployee