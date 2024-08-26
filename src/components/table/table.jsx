import { useEffect, useState } from "react"
import Api from "../../api/api"
import LengthEmployees from "../lengthEmployees/lengthEmployees"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Search from "../search/search"
import { useContext } from "react"
import { MyContext } from "../../context/context"

function Table(){

    const [data,setData] = useState()
    const [dataFilter,setDataFilter] = useState()
    const [dataFilterDisplay,setDataFilterDisplay] = useState()
    const [orderFilterAsc,setOrderFilterAsc] = useState("")
    const [filterCategory,setFilterCategory] = useState("")
    const [search,setSearch] = useState("")
    const [disabled,setDisabled] = useState(true)
    const [firstName,setFirstName] = useState("First Name")
    const { dataContext, setDataContext } = useContext(MyContext);
    const [page,setPage] = useState(1)
    const [pageSize,setPageSize] = useState(50)
    const [totalPages,setTotalPages] = useState([])


    useEffect(()=>{
 
        async function fetchData(){
            const countEmployees = await Api.countEmployees()
            if(countEmployees == dataContext.length){
                setData(dataContext)
                setDataFilter(dataContext)
                
                return;
            }

            Api.getEmployees()
            .then(data=>{
                setData(data)
                setDataFilter(data)
                setDataFilterDisplay(data)
            })
        }

        fetchData()
        getEmployeesInRange(1,pageSize)
        let objSearch = {
            firstname : "",
            lastname    : "",
            startdate   : "",
            department  : "",
            birthday    : "",
            street      : "",
            city        : "",
            state       : "",
            zipcode     : ""
        }
        setSearch(objSearch)
        
    },[])

    useEffect(()=>{
        getEmployeesInRange(1,pageSize)    
    },[dataFilter])

    const getEmployeesInRange = (start,end) =>{
        if(!dataFilter) return

        setDataFilterDisplay(dataFilter.slice(start-1, end))
        return true;
    }

    const filterData = (search) =>{
        if(!data) return
        // const dataFilter = data.filter((employee)=>employee.firstname.toLowerCase().includes(search.toLowerCase()))

        let arrPages = []


        if(orderFilterAsc === true){
            console.log("A");
            const dataFilter = data.filter((employee)=>employee[filterCategory].toLowerCase().includes(search.toLowerCase())).sort((a,b) => a[filterCategory].localeCompare(b[filterCategory]));
            setTotalPages(Math.ceil(dataFilter.length/pageSize))
            for(let i = 1;i<=Math.ceil(dataFilter.length/pageSize);i++){
                arrPages.push(i)
            }
            setTotalPages(arrPages)
            
            setDataFilter(dataFilter)

            setPage(1);
            return;
        }

        else if(orderFilterAsc === false){
            console.log("B");
            const dataFilter = data.filter((employee)=>employee[filterCategory].toLowerCase().includes(search.toLowerCase())).sort((a,b) => b[filterCategory].localeCompare(a[filterCategory]));
            console.log("dataFilter ", dataFilter)
            setTotalPages(Math.ceil(dataFilter.length/pageSize))
            for(let i = 1;i<=Math.ceil(dataFilter.length/pageSize);i++){
                arrPages.push(i)
            }
            setTotalPages(arrPages)

            setDataFilter(dataFilter)
            return;
        }
        // no order 
        console.log("C");
        const dataFilter = data.filter((employee)=>employee[filterCategory].toLowerCase().includes(search[filterCategory].toLowerCase()))
        console.log("dataFilter ",dataFilter)
        setTotalPages(Math.ceil(dataFilter.length/pageSize))
        console.log("ICI ",)
        for(let i = 1;i<=Math.ceil(dataFilter.length/pageSize);i++){
            arrPages.push(i)
        }
        console.log("arrPages ",arrPages)
        setTotalPages(arrPages)

        setDataFilter(dataFilter)
        return;
    }

    const handleClickOrder = (event) =>{

        console.log(event);
        
        const order = event.target.getAttribute("order");
        const category = event.target.getAttribute("category");
        console.log("category ",category)

        setFilterCategory(category);

        if(order === "asc"){
            setOrderFilterAsc(true)
            return;
        }

        // desc
        setOrderFilterAsc(false);
    } 

    useEffect(()=>{
        console.log("search ",search)
        console.log("filterCategory ",filterCategory)
        if(!filterCategory) return
        filterData(search)
    },[orderFilterAsc,filterCategory,search])

    useEffect(()=>{
       console.log("dataFilter ",dataFilter)
    },[dataFilter])

    const handleClickSearch = (event) =>{
        console.log(event)
        if(!event.target.querySelector("input")) return

        event.target.querySelector("input").disabled = false;
    }

    const handleRangeChange = (size)=>{
        if(!dataFilter) return
        setPageSize(size)

        const totalPages = Math.ceil(dataFilter.length/size)
        setTotalPages(Math.ceil(dataFilter.length/size))
        let arrPages = []
        for(let i = 1;i<=totalPages;i++){
            arrPages.push(i)
        }
        getEmployeesInRange(1,size)
        setTotalPages(arrPages)
    }

    const handleClickPage = (page) =>{
        setPage(page)
    }

    useEffect(()=>{
        if(!dataFilter) return
        let start = 1+(pageSize*(page-1))
        let end = pageSize+parseInt((pageSize*(page-1)))

        getEmployeesInRange(start,end)
    },[page])

    const handleChange = (event) =>{

        let category = event.target.dataset.category
        console.log(category)

        setSearch({
            ...search,
            [category]:event.target.value
        })
        setFilterCategory(category)
    }

    return(
        <div className="table-container">
            <div className="table">
                <div className="filter">
                    <LengthEmployees onValChange={handleRangeChange}/>
                </div>
                <div className="header row">
                    <div className="cell">
                        <div onClick={handleClickSearch}><input type="text" onChange={handleChange} value={search.firstname} placeholder={firstName} disabled={true} data-category="firstname" id="firstname"/> <label htmlFor="firstname"><FontAwesomeIcon icon="fa-solid fa-magnifying-glass" /></label></div>
                        <div className="filter">
                            <div className="order">
                                <FontAwesomeIcon icon="fa-solid fa-caret-up" onClick={handleClickOrder} category="firstname" order="desc"/>
                                <FontAwesomeIcon icon="fa-solid fa-caret-down" onClick={handleClickOrder} category="firstname" order="asc" />
                            </div>
                        </div>
                    </div>
                    <div className="cell">
                    <div onClick={handleClickSearch}><input type="text" onChange={handleChange} value={search.lastname} placeholder="Last Name" disabled={true} data-category="lastname" id="lastname"/> <label htmlFor="lastname"><FontAwesomeIcon icon="fa-solid fa-magnifying-glass" /></label></div>
                        <div className="filter">
                            <div className="order">
                                <FontAwesomeIcon icon="fa-solid fa-caret-up" onClick={handleClickOrder} category="lastname" order="desc"/>
                                <FontAwesomeIcon icon="fa-solid fa-caret-down" onClick={handleClickOrder} category="lastname" order="asc" />
                            </div>
                        </div>
                    </div>
                    <div className="cell">
                        <div onClick={handleClickSearch}><input type="text" onChange={handleChange} value={search.datestart} placeholder="Start Date" disabled={true} data-category="startdate" id="startdate"/> <label htmlFor="startdate"><FontAwesomeIcon icon="fa-solid fa-magnifying-glass" /></label></div>
                        <div className="filter">
                            <div className="order">
                                <FontAwesomeIcon icon="fa-solid fa-caret-up" onClick={handleClickOrder} category="startdate" order="desc"/>
                                <FontAwesomeIcon icon="fa-solid fa-caret-down" onClick={handleClickOrder} category="startdate" order="asc" />
                            </div>
                        </div>
                    </div>
                    <div className="cell">
                    <div onClick={handleClickSearch}><input type="text" onChange={handleChange} value={search.department} placeholder="Department" disabled={true} data-category="department" id="department"/> <label htmlFor="department"><FontAwesomeIcon icon="fa-solid fa-magnifying-glass" /></label></div>
                        <div className="filter">
                            <div className="order">
                                <FontAwesomeIcon icon="fa-solid fa-caret-up" onClick={handleClickOrder} category="department" order="desc"/>
                                <FontAwesomeIcon icon="fa-solid fa-caret-down" onClick={handleClickOrder} category="department" order="asc" />
                            </div>
                        </div>
                    </div>
                    <div className="cell">
                        <div onClick={handleClickSearch}><input type="text" onChange={handleChange} value={search.birthday} placeholder="Date of Birth" disabled={true} data-category="birthday" id="birthday"/> <label htmlFor="birthday"><FontAwesomeIcon icon="fa-solid fa-magnifying-glass" /></label></div>
                        <div className="filter">
                            <div className="order">
                                <FontAwesomeIcon icon="fa-solid fa-caret-up" onClick={handleClickOrder} category="birthday" order="desc"/>
                                <FontAwesomeIcon icon="fa-solid fa-caret-down" onClick={handleClickOrder} category="birthday" order="asc" />
                            </div>
                        </div>
                    </div>
                    <div className="cell">
                        <div onClick={handleClickSearch}><input type="text" onChange={handleChange} value={search.street} placeholder="Street" disabled={true} data-category="street" id="street"/> <label htmlFor="street"><FontAwesomeIcon icon="fa-solid fa-magnifying-glass" /></label></div>
                        <div className="filter">
                            <div className="order">
                                <FontAwesomeIcon icon="fa-solid fa-caret-up" onClick={handleClickOrder} category="street" order="desc"/>
                                <FontAwesomeIcon icon="fa-solid fa-caret-down" onClick={handleClickOrder} category="street" order="asc" />
                            </div>
                        </div>
                    </div>
                    <div className="cell">
                        <div onClick={handleClickSearch}><input type="text" onChange={handleChange} value={search.city} placeholder="City" disabled={true} data-category="city" id="city"/> <label htmlFor="city"><FontAwesomeIcon icon="fa-solid fa-magnifying-glass" /></label></div>
                        <div className="filter">
                            <div className="order">
                                <FontAwesomeIcon icon="fa-solid fa-caret-up" onClick={handleClickOrder} category="city" order="desc"/>
                                <FontAwesomeIcon icon="fa-solid fa-caret-down" onClick={handleClickOrder} category="city" order="asc" />
                            </div>
                        </div>
                    </div>
                    <div className="cell">
                    
                        <div onClick={handleClickSearch}><input type="text" onChange={handleChange} value={search.state} placeholder="State" disabled={true} data-category="state" id="state"/> <label htmlFor="state"><FontAwesomeIcon icon="fa-solid fa-magnifying-glass" /></label></div>
                        <div className="filter">
                            <div className="order">
                                <FontAwesomeIcon icon="fa-solid fa-caret-up" onClick={handleClickOrder} category="state" order="desc"/>
                                <FontAwesomeIcon icon="fa-solid fa-caret-down" onClick={handleClickOrder} category="state" order="asc" />
                            </div>
                        </div>
                    </div>
                    <div className="cell">
                        <div onClick={handleClickSearch}><input type="text" onChange={handleChange} value={search.zipcode} placeholder="Zip Code" disabled={true} data-category="zipcode" id="zipcode"/> <label htmlFor="zipcode"><FontAwesomeIcon icon="fa-solid fa-magnifying-glass" /></label></div>
                        <div className="filter">
                            <div className="order">
                                <FontAwesomeIcon icon="fa-solid fa-caret-up" onClick={handleClickOrder} category="zipcode" order="desc"/>
                                <FontAwesomeIcon icon="fa-solid fa-caret-down" onClick={handleClickOrder} category="zipcode" order="asc" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="list">
                {dataFilter && dataFilter.length>0 ? (
                dataFilterDisplay.map((item) => (
                    <div key={item.id} className="row">
                    <div className="cell">{item.firstname}</div>
                    <div className="cell">{item.lastname}</div>
                    <div className="cell">{item.startdate}</div>
                    <div className="cell">{item.department}</div>
                    <div className="cell">{item.birthday}</div>
                    <div className="cell">{item.street}</div>
                    <div className="cell">{item.city}</div>
                    <div className="cell">{item.state}</div>
                    <div className="cell">{item.zipcode}</div>
                    </div>
                ))
                ) : (
                <div className="no-data">No data available</div>
                )}
                </div>
                <div className="pagination">
                    {totalPages.map((elem)=>(
                        <div key={elem} onClick={()=>{handleClickPage(elem)}}>{elem}</div>
                    ))}
                </div>
            </div>
        </div>
    
    )
}

export default Table