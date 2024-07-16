import supabase from "../bdd/supabase"
import stringDateToDate from "../utils/utils"

class Api{
    constructor(){

    }

    static async insertEmployee(employee){
        console.log(employee)
        const { data, error } = await supabase
        .from('employees')
        .insert([{
            firstname   : employee.firstname,
            lastname    : employee.lastname,
            birthday    : stringDateToDate(employee.birthday),
            startdate   : stringDateToDate(employee.startdate),
            street      : employee.street,
            city        : employee.city,
            state       : employee.state,
            zipcode     : employee.zipcode,
            department  : employee.department
            }])
  
        if (error) {
            console.error('Error inserting data:', error)
            return false;
        } else {
            return true
        }
    }
}

export default Api