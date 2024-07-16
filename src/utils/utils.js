function stringDateToDate(strDate){ // JJ/MM/AAAA
    if(strDate == "") return null
    const arrDate = strDate.split("/")
    const date = new Date(arrDate[2],arrDate[1]-1,arrDate[0])
    return date
}

export default stringDateToDate