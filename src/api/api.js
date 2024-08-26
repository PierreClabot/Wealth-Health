import supabase from "../bdd/supabase"
import stringDateToDate from "../utils/utils"

class Api{
    constructor(){

    }

    static async insertEmployee(employee){
        console.log(!!employee.firstname)
        if(!employee.firstname || !employee.lastname || !employee.birthday || !employee.startdate || !employee.street || !employee.city || !employee.state || !employee.zipcode ||  !employee.department ) return false

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
        .select()

        if (error) {
            console.error('Error inserting data:', error)
            return false;
        } else {
            // console.log("data inserting ",data)
            return data[0]
        }
    }

    static async getEmployees(){
        const {data,error} = await supabase
        .from("employees")
        .select("*")
        .order('firstname', { ascending: true });

        if (error) {
            console.error('Error get data:', error)
            return false;
        } else {
            return data
        }
    }

    static async countEmployees(){
        const { count, error } = await supabase
        .from('employees')
        .select('*', { count: 'exact' })

        console.log("count ",count)
        return count
    }
}

export default Api