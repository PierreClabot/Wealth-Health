import { faL } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import { useEffect } from 'react';
function Calendar({id,label,onValChange}){

    const [dates,setDates] = useState([])
    const [date,setDate] = useState("")
    const [calendar,setCalendar] = useState(false)
    const [datCal,setDateCal] = useState(new Date())
    const [arrDays,setArrDays] = useState(["Mon","Tue","Wed","Thu","Fri","Sat","Sun"])
    const [arrMonths,setArrMonths] = useState(["January","February","March","April","May","June","July","August","September","October","November","December"])
    const [error,setError] = useState("")
    const [domCal,setDomCal] = useState("")

    useEffect(()=>{
        const getDaysInMonth = (year,month)=>{
            return new Date(year,month+1,0).getDate();
        }
    
        const dateStartCalendar = (dateToday)=>{
            let dateStart = new Date(dateToday.getFullYear(),dateToday.getMonth(),1);
    
            if(dateStart.getDay() === 1) return dateStart 
    
            const days = getDaysInMonth(dateStart.getFullYear(),dateStart.getMonth()-1)
            dateStart = new Date(dateStart.getFullYear(),dateStart.getMonth()-1,days)
            let i = 0;
    
            while(dateStart.getDay() != 1 && i<10){
                i++;
                dateStart = new Date(dateStart.getFullYear(),dateStart.getMonth(),days-i)
            }
    
            return dateStart
        }
    
        const dateEndCalendar = (dateToday)=>{
            const days = getDaysInMonth(dateToday.getFullYear(),dateToday.getMonth())
            let dateEnd = new Date(dateToday.getFullYear(),dateToday.getMonth(),days);
            if(dateEnd.getDay() === 0) return dateEnd 
    
      
            dateEnd = new Date(dateEnd.getFullYear(),dateEnd.getMonth()+1,1)
            let i = 0;
            while(dateEnd.getDay() != 0 && i<10){
                i++;
                dateEnd = new Date(dateEnd.getFullYear(),dateEnd.getMonth(),dateEnd.getDate()+1)
            }
    
            return dateEnd
        }
    
        const dateDif = (dateStart,dateEnd) =>{
            const msDay = 24 * 60 * 60 * 1000;
            return Math.round(Math.abs(dateStart-dateEnd)/msDay)
        }
    
    
        const generateDates = (dateToday)=>{
            let dateStart = dateStartCalendar(dateToday)
            let dateEnd = dateEndCalendar(dateToday)
            let daysDif = dateDif(dateStart,dateEnd)
            let arrDates = []
            for(let i = 0;i<=daysDif;i++){
                arrDates.push(new Date(dateStart.getFullYear(),dateStart.getMonth(),dateStart.getDate()+i))
            }
            setDates(arrDates)
        }
        
        generateDates(datCal)
    },[datCal])

    useEffect(()=>{
        if(!domCal) return
        calendar ? domCal.querySelector(".calendar-selector").style.display = "block" : domCal.querySelector(".calendar-selector").style.display = "none"
    },[calendar])

    useEffect(()=>{
        onValChange(id,date)
    },[date])

    const handleClickMonth = (event)=>{
        let target = event.target
        let i = 0;
        while(!target.classList.contains("icone") && i<10){
            i++;
            target = target.parentNode;
        }

        
        if(target.classList.contains("next")){
            setDateCal(new Date(datCal.getFullYear(),datCal.getMonth()+1,1))
            return
        }
        else if(target.classList.contains("last")){
            setDateCal(new Date(datCal.getFullYear(),datCal.getMonth()-1,1))
        }
    }

    const handleClick = (event)=>{
        if(event){
            let target = event.target
            let i = 0;
            while(!target.classList.contains("calendar") && i<10){
                i++;
                target = target.parentNode
            }
    
            setDomCal(target)
        }


        setCalendar(!calendar)
    }

    const handleClickDay = (event) =>{
        let datYear = event.target.getAttribute("date-year")
        let datMonth = (parseInt(event.target.getAttribute("date-month"))+1).toString().padStart(2,0);
        let datDay = event.target.getAttribute("date-day").toString().padStart(2,0);

        setDate(`${datDay}/${datMonth}/${datYear}`)

        const regexDate = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;

        if(!regexDate.test(`${datDay}/${datMonth}/${datYear}`)){
            setError("Le format de la date est incorrect")
        }
        else{
            setError("")
        }

        domCal.querySelector(".calendar .label").style.display = "block"
    
        const label = domCal.querySelector(".calendar .label").style.animation = "focusIn 0.2s forwards"

        handleClick();
    }

    const handleChange = (event) =>{
        setDate(event.target.value)

        const regexDate = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;
        if(!regexDate.test(event.target.value)){
            setError("Le format de la date est incorrect")
        }
        else{ // date au bon format, on affiche le calendrier de la date saisie
            setError("")
            let arrDate = event.target.value.split("/")

            setDateCal(new Date(arrDate[2],parseInt(arrDate[1])-1,arrDate[0]))
        }
    }

    const handleFocus = (event)=>{
        const parent = event.target.parentNode
        parent.querySelector(".label").style.display = "block"
    
        const label = parent.querySelector(".label").style.animation = "focusIn 0.2s forwards"
    }

    const handleBlur = (event)=>{

        const parent = event.target.parentNode

        if(date != ""){
            return;
        }

        parent.querySelector(".label").style.animation = "focusOut 0.2s forwards"
    }

    const closeAllCalendars = () => {
        document.querySelectorAll(".calendar-selector").forEach(dom=>{ // @AREVOIR
            dom.style.display = "none";
        })
    }

    return(
        <div className="calendar">
            <div className="calendar-input">
                <input type="text" value={date} id={id} onChange={handleChange} onBlur={handleBlur} onFocus={handleFocus} />
                <label className="label" htmlFor={id}>{label}</label>
                <FontAwesomeIcon icon="fa-solid fa-calendar-days" className='icon' onClick={handleClick}/>
            </div>
            {error ? <div className='error'>{error}</div> : ""}
            <div className="calendar-selector" >
                <div className="header-calendar">
                    <div className="icone last">
                        <FontAwesomeIcon icon="fa-solid fa-arrow-left" onClick={handleClickMonth}/>
                    </div>
                    <div className="current-date">{arrMonths[datCal.getMonth()]} {datCal.getFullYear()}</div>
                    <div className="icone next">
                        <FontAwesomeIcon icon="fa-solid fa-arrow-right" onClick={handleClickMonth}/>
                    </div>
                </div>
                <div className="table-calendar">

                    {arrDays.map((day,index)=>{
                        return(<div key={index} className='case'>{day}</div>)
                    })}
                    {dates.map((date,index)=>{
                        return(<div key={index} className='case' date-year={date.getFullYear()} date-month={date.getMonth()} date-day={date.getDate()} onClick={handleClickDay}>{date.getDate()}</div>)
                    })}
                </div>
            </div>
        </div>
    )
}

export default Calendar